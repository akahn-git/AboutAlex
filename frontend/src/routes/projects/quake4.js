import quake4gif from '../../gifs/Quake4.gif'

const Quake4 = () => {
    return(
        <div classname ="quake4-header">
            <div>
                quake4 project
            </div>

            <div>
                <img src={quake4gif} alt ="quake4 gif" />
            </div>
        </div>
    );
}

export default Quake4;