# configures terraform to use the AWS provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

# configures the AWS provider
provider "aws" {
  region = "us-east-1"
}

# define an ECS cluster for aboutalex
resource "aws_ecs_cluster" "aboutalex_cluster" {
  name = "aboutalex_cluster"
}

# adopt the default role created by AWS to run the task under
data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
}

# define a task for the frontend webserver
resource "aws_ecs_task_definition" "aboutalex_frontend_webserver" {
  family                   = "aboutalex_frontend_webserver"
  task_role_arn            = "${data.aws_iam_role.ecs_task_execution_role.arn}"
  execution_role_arn       = "${data.aws_iam_role.ecs_task_execution_role.arn}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([
    {
      name      = "frontend_webserver"
      image     = "164669916339.dkr.ecr.us-east-1.amazonaws.com/frontend_webserver"
      essential = true
      command   = ["nginx", "-g", "daemon off;"]
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

# create a security group
#
# this is used to allow network traffic to reach our containers
resource "aws_security_group" "aboutalex_security_group" {
  name = "aboutalex_security_group"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

# adopt the default AWS VPC as a resource in terraform. see:
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_vpc
resource "aws_default_vpc" "default_vpc" {
  tags = {
    Name = "default VPC"
  }
}

# create subnets in two availability zones
variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b"]
}

resource "aws_subnet" "aboutalex_subnet" {
  count                   = "${length(var.availability_zones)}"
  vpc_id                  = aws_default_vpc.default_vpc.id
  cidr_block              = cidrsubnet(aws_default_vpc.default_vpc.cidr_block, 4, count.index + 1)
  availability_zone       = "${var.availability_zones[count.index]}"
  map_public_ip_on_launch = false
}

# create a load balancer to distribute traffic to the tasks described below
resource "aws_lb" "aboutalex_load_balancer" {
  name               = "aboutalex-load-balancer"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.aboutalex_security_group.id]
  subnets            = aws_subnet.aboutalex_subnet.*.id
}

# create a target group for the load balancer described above
resource "aws_lb_target_group" "aboutalex_target_group" {
  name        = "aboutalex-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_default_vpc.default_vpc.id
  target_type = "ip"
  depends_on  = [
    aws_lb.aboutalex_load_balancer
  ]
}

# load balancer endpoint
resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.aboutalex_load_balancer.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = "arn:aws:acm:us-east-1:164669916339:certificate/3bb2ce8e-5e30-4a2e-bc6b-7421e17ac7fd"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.aboutalex_target_group.arn
  }
}

# define a service, running 5 instances of the frontend webserver
resource "aws_ecs_service" "aboutalex_frontend_webserver_service" {
  name                   = "aboutalex_frontend_webserver_service"
  enable_execute_command = true
  launch_type            = "FARGATE"
  cluster                = aws_ecs_cluster.aboutalex_cluster.id
  task_definition        = aws_ecs_task_definition.aboutalex_frontend_webserver.id
  desired_count          = 5
  network_configuration {
    subnets          = aws_subnet.aboutalex_subnet.*.id
    security_groups  = [aws_security_group.aboutalex_security_group.id]
    assign_public_ip = true
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.aboutalex_target_group.arn
    container_name   = "frontend_webserver"
    container_port   = 80
  }
}