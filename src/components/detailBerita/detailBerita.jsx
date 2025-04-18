import { useLocation, useParams } from "react-router-dom";
import { Image, Stack } from "react-bootstrap";
import './styles.css';
import { useMediaQuery } from "react-responsive";
import WhatsAppButton from "../../partials/Whatsapp/whatsapp";

const DetailBerita = () => {
    const location = useLocation();
    const { id } = useParams();
    const { itemDetail } = location.state;
    const beritaItem = itemDetail.dataBerita.find(item => item.id == id);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthNames = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    return (
      <Stack>
        <Stack className="">
          {beritaItem && beritaItem.image_url && (
            <>
              <Stack className="responsive-title-berita justify-content-center align-items-center px-4">
                <p
                  className="fw-semibold"
                  style={{
                    color: "#121481",
                    fontSize: isMobile ? "30px" : "40px",
                  }}
                >
                  {beritaItem.title}
                </p>
              </Stack>
              <Stack className="py-3 responsive-title-berita px-4">
                <Stack
                  style={{
                    paddingBottom: "10px",
                    opacity: 0.5,
                    fontSize: isMobile ? "12px" : "15px",
                  }}
                >
                  {formatDate(beritaItem.date)}
                </Stack>
                <Image
                  src={beritaItem.image_url}
                  alt={beritaItem.title}
                  fluid
                  style={{
                    width: "100%",
                    height: isMobile ? "auto" : "450px",
                    maxWidth: "100%",
                    margin: "0 auto",
                  }}
                />
                <Stack className="py-4">
                  {beritaItem.deskripsi.split("\n").map((paragraph, index) => (
                    <p
                      key={index}
                      style={{ fontSize: isMobile ? "16px" : "20px" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
        <WhatsAppButton />
      </Stack>
    );
}

export default DetailBerita;