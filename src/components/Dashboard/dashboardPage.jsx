import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Container } from 'react-bootstrap';
import './styles.css';
import YoutubePlayer from "../../partials/YoutubePlayer/youtubePlayer";
import videoData from '../../data/videos.json'

const DashboardPage = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        selectedVideo: null,
        playing: false,
    });

    const { selectedVideo } = state

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            selectedVideo: videoData.videos[0].url,
            playing: false,
        }));
    }, []);

    const setSelectedVideo = (videoUrl) => {
        setState(prevState => ({
            ...prevState,
            selectedVideo: videoUrl,
            playing: false,
        }));
    }

    return (
        <Container>
            <Stack gap={3} className="my-4">
                <div className="text-center">
                    <h1>My Playlist Songs</h1>
                </div>
                <div className="mb-4">
                    {selectedVideo ? (
                        <YoutubePlayer videoId={selectedVideo} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="video-list">
                    <h2>Video List</h2>
                    {videoData.videos.map((video) => (
                        <button
                            key={video.id}
                            onClick={() => setSelectedVideo(video.url)}
                            className={`btn btn-custom ${selectedVideo === video.url ? 'active' : ''}`}
                        >
                            {video.title}
                        </button>
                    ))}
                </div>
            </Stack>
        </Container>
    )
}

export default DashboardPage;
