import { Container, Card } from "react-bootstrap";
import { Images } from "../../../helpers/images";
import WhatsAppButton from "../../../partials/Whatsapp/whatsapp";
import "./styles.css"; // Import CSS file for custom styles

const StrukturOrganisasiPage = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center w-100"> {/* Full width for the Card */}
        <Card className="stylish-card mx-auto" style={{ maxWidth: "80%" }}>
          <Card.Img
            variant="top"
            src={Images.strukturOrganisasi}
            alt="Struktur Organisasi"
            style={{ height: "auto" }}
          />
        </Card>
        <WhatsAppButton />
      </div>
    </Container>
  );
};

export default StrukturOrganisasiPage;
