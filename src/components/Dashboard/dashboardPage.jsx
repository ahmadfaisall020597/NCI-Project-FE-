import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Carousel, Card, Image, Button } from "react-bootstrap";
import "./styles.css";
import { useMediaQuery } from "react-responsive";
import { objectRouter } from "../../utils/router/objectRouter";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosDashboard } from "../Video/videoSlice";
import { fetchNewsDashboard } from "../Berita/beritaSlice";
import { fetchSlideShowDashboard } from "../SlideShow/slideShowSlice";
import { fetchPengumuman } from "../Pengumuman/pengumumanSlice";
import Footer from "../../partials/Footer/footer";
import WhatsAppButton from "../../partials/Whatsapp/whatsapp";
import { Images } from "../../helpers/images";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { videos } = useSelector((state) => state.video);
  const { news } = useSelector((state) => state.news);
  const { pengumuman } = useSelector((state) => state.pengumuman);
  const { slideshow } = useSelector((state) => state.slideshow);
  const [state, setState] = useState({
    selectedPengumuman: null,
    selectedNews: null,
    selectedVideo: null,
    playing: false,
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1024px)"});
  const isLaptopLg = useMediaQuery({ query: "(max-width: 1440px)"});
  const scrollRef = useRef(null);

  const { selectedVideo } = state;

  useEffect(() => {
    dispatch(fetchVideosDashboard());
    if (videos) {
      setState((prevState) => ({
        ...prevState,
        selectedVideo: videos.url,
        playing: false,
      }));
    }
    dispatch(fetchNewsDashboard());
    dispatch(fetchPengumuman());
    dispatch(fetchSlideShowDashboard());
  }, []);

  const setSelectedVideo = (videoUrl) => {
    setState((prevState) => ({
      ...prevState,
      selectedVideo: videoUrl,
      playing: false,
    }));
  };

  const handleVideoClick = (videoUrl) => {
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

  const renderSpanduk = () => (
    <Stack>
      <Carousel indicators>
        {slideshow.map((item) => (
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
        setIsExiting(true);
        setTimeout(() => {
          setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % Math.min(pengumuman.length, 10)
          );
          setIsExiting(false);
        }, 500);
      }, 3000);

      return () => clearInterval(interval);
    }, [pengumuman.length]);

    const sortedPengumuman = pengumuman
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const limitedPengumuman = sortedPengumuman.slice(0, 10);

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
    const scrollRef = useRef(null);

    const scroll = (direction) => {
      if (scrollRef.current) {
        const maxScrollLeft =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        const currentScroll = scrollRef.current.scrollLeft;
        const scrollAmount =
          direction === "left"
            ? -scrollRef.current.offsetWidth
            : scrollRef.current.offsetWidth;

        if (direction === "left" && currentScroll <= 0) {
          scrollRef.current.scrollTo({
            left: maxScrollLeft,
            behavior: "smooth",
          });
        } else if (direction === "right" && currentScroll >= maxScrollLeft) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    };

    const sortedData = news
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const limitedData = sortedData.slice(0, 10);

    return (
      <Stack className="px-2 py-2">
        <p className="fs-2 fw-semibold text-center">KEGIATAN</p>
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
    const scrollRef = useRef(null);

    const scroll = (direction) => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;

        // Check if we're at the start or end of the scrollable area
        if (direction === "right" && scrollLeft >= maxScrollLeft) {
          // Reset to the start when reaching the end
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else if (direction === "left" && scrollLeft <= 0) {
          // Reset to the end when reaching the start
          scrollRef.current.scrollTo({
            left: maxScrollLeft,
            behavior: "smooth",
          });
        } else {
          // Otherwise, scroll normally
          const scrollAmount =
            direction === "left"
              ? -scrollRef.current.offsetWidth
              : scrollRef.current.offsetWidth;
          scrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    };

    return (
      <Stack className="px-2 py-2">
        <p className="fs-2 fw-semibold text-center">VIDEO KEGIATAN</p>
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
              overflowY: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            gap={2}
            ref={scrollRef}
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
                    border: "none",
                    padding: 0,
                    margin: 0,
                    backgroundColor: "whuite",
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
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: "none",
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
                        position: "absolute",
                        top: "-23px",
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
                      zIndex: 1,
                    }}
                  >
                    <h6
                      style={{
                        margin: 0,
                        whiteSpace: "normal",
                        overflow: "visible",
                        textOverflow: "unset",
                        fontSize: isMobile ? "12px" : "14px",
                      }}
                    >
                      {video.title}
                    </h6>
                  </div>
                </Card>
              );
            })}
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
  
  const renderMitra = () => {
    const mitraImages = [
      Images.mitra1,
      Images.mitra3,
      Images.mitra4,
      Images.mitra5,
      Images.mitra6,
      Images.mitra7,
      Images.mitra8,
    ];
  
    // Group images in sets of three
    const groupedImages = [];
    for (let i = 0; i < mitraImages.length; i += 3) {
      groupedImages.push(mitraImages.slice(i, i + 3));
    }
  
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null); // Use ref to potentially handle scrolling
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex < groupedImages.length - 1 ? prevIndex + 1 : 0
      );
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : groupedImages.length - 1
      );
    };
  
    return (
      <Stack className="px-2 py-2 position-relative">
        <p className="fs-2 fw-semibold text-center">KERJASAMA & MITRA KERJA</p>
        <div className="d-flex justify-content-center align-items-center position-relative">
          {/* Previous Button */}
          <Button
            variant="light"
            className="position-absolute"
            style={{
              left: isMobile ? "0px" : isLaptop ? "90px" : isLaptopLg ? "275px" : "550px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              fontSize: isMobile ? "2rem" : "4rem",
            }}
            onClick={handlePrev}
          >
            &#8249;
          </Button>
  
          {/* Display images in groups of 3 */}
          <Stack
            direction="horizontal"
            className="overflow-auto align-items-center"
            style={{
              whiteSpace: "nowrap",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            gap={2}
            ref={scrollRef}
          >
            {groupedImages[currentIndex].map((src, idx) => (
              <div
                key={idx}
                className="mitra-image-container"
                style={{
                  width: "250px",
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={src}
                  alt={`Mitra ${currentIndex * 3 + idx + 1}`}
                  className="img-fluid rounded"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </Stack>
  
          {/* Next Button */}
          <Button
            variant="light"
            className="position-absolute"
            style={{
              right: isMobile ? "0px" : isLaptop ? "90px" : isLaptopLg ? "275px" : "550px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              fontSize: isMobile ? "2rem" : "4rem",
            }}
            onClick={handleNext}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
            }
          >
            &#8250;
          </Button>
        </div>
      </Stack>
    );
  };
  

  return (
    <div className="dashboard-page">
      {renderSpanduk()}
      {renderPengumuman()}
      {renderBeritaKegiatan()}
      {renderVideoKegiatan()}
      {renderMitra()}
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default DashboardPage;
