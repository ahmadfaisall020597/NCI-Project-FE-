import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Container, Carousel, Card, Image } from 'react-bootstrap';
import './styles.css';
import videoData from '../../data/videos.json'
import { dataSpanduk } from "../../data/dataSpanduk";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        selectedVideo: null,
        playing: false,
    });

    const { selectedVideo } = state;

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            selectedVideo: videoData.videos[0].url,
            playing: true,
        }));
    }, []);

    const setSelectedVideo = (videoUrl) => {
        setState(prevState => ({
            ...prevState,
            selectedVideo: videoUrl,
            playing: false,
        }));
    }

    const handleVideoClick = (videoUrl) => {
        console.log('video url : ', videoUrl);
        setSelectedVideo(videoUrl);
    }

    const extractVideoId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
        return match ? match[1] : null;
    };

    const getThumbnailUrl = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <Stack>
            <Stack>
                <Carousel>
                    {dataSpanduk.map((item) => (
                        <Carousel.Item key={item.id} className="carousel-item">
                            <img
                                className="d-block carousel-image"
                                src={item.image_url}
                                alt={`slide${item.id}`}
                            />
                            <Carousel.Caption>
                                <h3>{item.title}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Stack>
            <Stack className="px-4 py-4">
                <h1>Kegiatan</h1>
                <Stack
                    direction="horizontal"
                    className="overflow-auto py-4"
                    style={{ whiteSpace: 'nowrap' }}
                    gap={4}
                >
                    {dataSpanduk.map((item, index) => (
                        <Card
                            key={index}
                            style={{
                                minWidth: '400px',
                                width: '400px',
                                height: '400px',
                                marginRight: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div style={{ flex: '1' }}>
                                <Image src={item.image_url} fluid style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '0 0 150px 0',
                                    borderBottom: '5px solid #3ABEF9',
                                }}
                                />
                            </div>
                            <div style={{ padding: '10px' }}>
                                <h6>{item.title}</h6>
                                <p>{item.deskripsi}</p>
                            </div>
                        </Card>
                    ))}
                </Stack>
            </Stack>
            <Stack className="px-4 py-2">
                <h1>Video Kegiatan</h1>
                <Stack
                    direction="horizontal"
                    className="overflow-auto py-4"
                    style={{ whiteSpace: 'nowrap' }}
                    gap={4}
                >
                    {videoData.videos.map((video) => {
                        const videoId = extractVideoId(video.url);
                        const thumbnailUrl = getThumbnailUrl(videoId);
                        return (
                            <Card
                                key={video.id}
                                style={{
                                    minWidth: '400px',
                                    width: '400px',
                                    height: '270px',
                                    marginRight: '10px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onClick={() => handleVideoClick(video.url)}
                            >
                                {selectedVideo === video.url && videoId ? (
                                    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=${state.playing ? 1 : 0}`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <Image
                                        src={thumbnailUrl}
                                        fluid
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                        }}
                                    />
                                )}
                                <div style={{ padding: '10px', textAlign: 'center', position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', color: 'black' }}>
                                    <h6>{video.title}</h6>
                                </div>
                            </Card>
                        );
                    })}
                </Stack>
            </Stack>
        </Stack>
    )
}

export default DashboardPage;
