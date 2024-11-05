import { useLocation } from "react-router-dom";
import { Stack, Image, Card, ListGroup } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import WhatsAppButton from "../../../partials/Whatsapp/whatsapp";

const DetailPelatihanPage = () => {
  const { state } = useLocation();
  const { itemDetail } = state || {}; // Get item detail from state
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  if (!itemDetail) {
    return <p>Detail pelatihan tidak ditemukan.</p>;
  }

  const {
    detailPelatihan: {
      title,
      image_kemendikbud_ristek,
      image_logo_nci,
      image_logo_mitra,
      deskripsi,
      persyaratan,
      image_spanduk_pelatihan,
      duration,
      location,
      biaya,
      url_daftar,
      output,
      date,
      tanggal_mulai,
    },
  } = itemDetail;

  // Ensure persyaratan is an array if it's a string
  const parsedPersyaratan =
    typeof persyaratan === "string" ? JSON.parse(persyaratan) : persyaratan;

  return (
    <Stack className="py-2 px-4">
      <h2 className="text-center">{title}</h2>

      {/* Logos Section */}
      <div className="text-center mb-2">
        <Image
          src={image_kemendikbud_ristek}
          alt="Kemendikbud Logo"
          className="me-3"
          style={{ 
            width: isMobile ? 200 : 200,
            height: "auto",
            margin: isMobile ? 18 : 0
          }}
        />
        <Image
          src={image_logo_nci}
          alt="NCI Logo"
          className="me-3"
          style={{ 
            width: isMobile ? 200 : 200, 
            height: "auto", 
            margin: isMobile ? 17 : 0, 
            marginTop: isMobile ? 1 : 0 
          }}
        />
        <Image
          src={image_logo_mitra}
          alt="Mitra Logo"
          style={{ width: 200, height: "auto" }}
        />
      </div>

      {/* Spanduk Pelatihan Section */}
      <div
        style={{
          width: isMobile ? "80vw" : "60vw",
          margin: "20px auto", // Add margin for spacing
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={image_spanduk_pelatihan}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Card Section */}
      <Card className="mt-4">
        {/* <Card.Body> */}
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Deskripsi :</strong> {deskripsi}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Durasi:</strong> {duration} hari
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Tanggal Mulai:</strong>{" "}
            {new Date(tanggal_mulai).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Lokasi:</strong> {location}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Biaya:</strong> {biaya === "0.00" ? "Gratis" : biaya}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Output:</strong> {output}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Persyaratan:</strong>
            <ul>
              {parsedPersyaratan.map((syarat, index) => (
                <li key={index}>{syarat}</li>
              ))}
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Pendaftaran:</strong>{" "}
            <a href={url_daftar} target="_blank" rel="noopener noreferrer">
              Link Daftar
            </a>
          </ListGroup.Item>
        </ListGroup>
        {/* </Card.Body> */}
      </Card>
      <WhatsAppButton />
    </Stack>
  );
};

export default DetailPelatihanPage;
