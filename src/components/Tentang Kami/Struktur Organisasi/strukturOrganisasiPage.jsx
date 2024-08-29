import { Container, Card } from "react-bootstrap";
import { Images } from "../../../helpers/images";
import './styles.css'; // Import CSS file for custom styles

const StrukturOrganisasiPage = () => {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <Card className="text-center stylish-card" style={{ maxWidth: '80%'}}>
                <Card.Body>
                    <Card.Img variant="top" src={Images.strukturOrganisasi} alt="Struktur Organisasi" style={{ height: 'auto' }} />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default StrukturOrganisasiPage;
