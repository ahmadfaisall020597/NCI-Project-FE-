import { Container } from "react-bootstrap";
import logo from "./../../../../public/images/struktur organisasi.png";

const StrukturOrganisasiPage = () => {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <h1 className="mb-4 text-center">Struktur Organisasi</h1>
            <img src={logo} alt="Struktur Organisasi" className="img-fluid" style={{ maxWidth: '80%', height: 'auto' }} />
        </Container>
    );
};

export default StrukturOrganisasiPage;
