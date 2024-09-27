import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Container,
  Carousel,
  Card,
  Image,
  Button,
} from "react-bootstrap";
import "./styles.css";
import videoData from "../../data/videos.json";
import { dataSpanduk } from "../../data/dataSpanduk";
import { useMediaQuery } from "react-responsive";
import { History, objectRouter } from "../../utils/router/objectRouter";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosDashboard } from "../Video/videoSlice";
import { fetchNewsDashboard } from "../Berita/beritaSlice";
import { fetchPengumuman } from "../Pengumuman/pengumumanSlice";

const DashboardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { videos, loading, error } = useSelector((state) => state.video);
    const news = useSelector((state) => state.news);
    console.log('news : ', news);
    console.log('videos : ', videos);
    const [state, setState] = useState({
        selectedVideo: null,
        playing: false,
        selectedNews: null
    });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const scrollRef = useRef(null);

  const { selectedVideo } = state;

  const scroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      scrollRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

    useEffect(() => {
        dispatch(fetchVideosDashboard());
        if (videos) {
            setState(prevState => ({
                ...prevState,
                selectedVideo: videos.url,
                playing: false,
            }));
        }
        dispatch(fetchNewsDashboard());
        if (news) {
            setState(prevState => ({
                ...prevState,
                selectedNews: news.data
            }))
        }
    }, []);

  const setSelectedVideo = (videoUrl) => {
    setState((prevState) => ({
      ...prevState,
      selectedVideo: videoUrl,
      playing: false,
    }));
  };

  const handleVideoClick = (videoUrl) => {
    console.log("video url : ", videoUrl);
    setSelectedVideo(videoUrl);
  };

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
    );
    return match ? match[1] : null;
  };

  const getThumbnailUrl = (videoId) =>
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const renderSpanduk = () => {
    return (
      <Stack>
        <Carousel indicators>
          {dataSpanduk.map((item) => (
            <Carousel.Item key={item.id} className="carousel-item">
              <img
                className="d-block carousel-image"
                src={item.image_url}
                alt={`slide${item.id}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Stack>
    );
  };

  const handleBeritaDetail = (id) => {
    const item = {
      beritaId: id,
      dataBerita: news,
    };
    const newPath = `${objectRouter.detailBerita.path.replace(
      "/:id",
      "/" + id
    )}`;
    navigate(newPath, { state: { itemDetail: item } });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const renderPengumuman = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setIsExiting(true); // Set exit state to true before changing index
        setTimeout(() => {
          setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % Math.min(pengumuman.length, 10)
          );
          setIsExiting(false); // Reset exit state after changing index
        }, 500); // Durasi yang sama dengan durasi animasi
      }, 3000); // Ubah setiap 3 detik

      return () => clearInterval(interval);
    }, [pengumuman.length]);
    // Sort pengumuman by date
    const sortedPengumuman = pengumuman
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Limit to 10 items
    const limitedPengumuman = sortedPengumuman.slice(0, 10);

    // Return the JSX
    return (
      <div className="marquee-container">
        <div className="marquee">
        <span className="label">Pengumuman : </span>
          {limitedPengumuman.length > 0 && (
            <div className={`marquee-item ${isExiting ? "hide" : "show"}`}>
              <span className="marquee-deskripsi">
                {limitedPengumuman[currentIndex].deskripsi}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBeritaKegiatan = () => {
    const sortedData = news
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log("Sorted data news", sortedData);

    const limitedData = sortedData.slice(0, 10);
    {
      /* Scrolling Text Section */
    }

    return (
      <Stack className="px-2 py-2">
        <p className="fs-2 fw-semibold">Kegiatan</p>
        <Stack direction="horizontal" className="position-relative">
          <Button
            variant="light"
            className="position-absolute"
            style={{
              left: isMobile ? "0px" : "10px",
              top: "45%",
              transform: "translateY(-50%)",
              zIndex: 1,
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              fontSize: isMobile ? "2rem" : "4rem",
              width: "auto",
              height: "auto",
              transition: "transform 0.3s ease",
            }}
            onClick={() => scroll("left")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
            }
          >
            &#8249;
          </Button>
          <Stack
            direction="horizontal"
            className="overflow-auto"
            style={{
              whiteSpace: "nowrap",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            gap={2}
            ref={scrollRef}
          >
            {limitedData.map((item, index) => (
              <Card
                key={index}
                className="card-responsive"
                style={{
                  minWidth: isMobile ? "330px" : "400px",
                  width: isMobile ? "300px" : "400px",
                  height: isMobile ? "250px" : "400px",
                  marginRight: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() => handleBeritaDetail(item.id)}
              >
                <div
                  style={{
                    position: "relative",
                    flex: "1",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={item.image_url}
                    fluid
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: isMobile ? "0 0 70px 0" : "0 0 150px 0",
                      borderBottom: "5px solid #3ABEF9",
                    }}
                  />
                </div>
                <div className="text-container" style={{ padding: "10px" }}>
                  <p
                    className="fw-semibold"
                    style={{ fontSize: isMobile ? "12px" : "16px" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="py-2"
                    style={{ fontSize: isMobile ? "10px" : "12px" }}
                  >
                    {formatDate(item.date)}
                  </p>
                </div>
              </Card>
            ))}
          </Stack>
          <Button
            variant="light"
            className="position-absolute"
            style={{
              right: isMobile ? "0px" : "10px",
              top: "45%",
              transform: "translateY(-50%)",
              zIndex: 1,
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              fontSize: isMobile ? "2rem" : "4rem",
              width: "auto",
              height: "auto",
              transition: "transform 0.3s ease",
            }}
            onClick={() => scroll("right")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
            }
          >
            &#8250;
          </Button>
        </Stack>
      </Stack>
    );
  };

  const renderVideoKegiatan = () => {
    return (
      <Stack className="px-2 py-2">
        <p className="fs-2 fw-semibold">Video Kegiatan</p>
        <Stack
          direction="horizontal"
          className="overflow-auto"
          style={{ whiteSpace: "nowrap" }}
          gap={2}
        >
          {videos.map((video) => {
            const videoId = extractVideoId(video.url);
            const thumbnailUrl = getThumbnailUrl(videoId);
            return (
              <Card
                key={video.id}
                style={{
                  minWidth: isMobile ? "340px" : "400px",
                  width: isMobile ? "340px" : "400px",
                  height: isMobile ? "240px" : "270px",
                  marginRight: "10px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onClick={() => handleVideoClick(video.url)}
              >
                {selectedVideo === video.url && videoId ? (
                  <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=${
                        state.playing ? 1 : 0
                      }`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                ) : (
                  <Image
                    src={thumbnailUrl}
                    fluid
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                )}
                <div
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  <h6>{video.title}</h6>
                </div>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    );
  };
  return (
    <Stack>
      {/* <div style={{ margin: '34px' }} /> */}
      {renderSpanduk()}
      {renderPengumuman()}
      {renderBeritaKegiatan()}
      {renderVideoKegiatan()}
    </Stack>
  );
};

export default DashboardPage;
