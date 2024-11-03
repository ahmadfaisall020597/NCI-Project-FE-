import ReactPlayer from "react-player";

const YoutubePlayer = ({ videoId }) => {
    const playerWrapperStyle = {
        height: '500px',
        width: '100%',
        position: 'relative'
    };

    const reactPlayerStyle = {
        position: 'absolute',
        top: 0,
        left: 0
    };

    const url = `https://www.youtube.com/watch?v=${videoId}`;

    return (
        <div style={playerWrapperStyle}>
            <ReactPlayer
                className='react-player'
                url={url}
                width='100%'
                height='100%'
                controls={true}
                playing={false}
                style={reactPlayerStyle}
            />
        </div>
    )
}

export default YoutubePlayer;