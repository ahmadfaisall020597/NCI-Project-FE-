import { Stack, Button } from "react-bootstrap";
import './styles.css';

const DaftarOnlinePage = () => {
    const handleRegisterClick = () => {
        window.open('https://forms.gle/cXZTb9PqYngucBRo7', '_blank');
    };

    return (
        <Stack className="register-page h-100">
            <h1>Pendaftaran Online Silahkan klik disini!</h1>
            <div className="animation-container">
                <i className="fas fa-hand-point-down hand-animation"></i>
            </div>
            <Button className="register-button" onClick={handleRegisterClick}>
                Klik di sini
            </Button>
        </Stack>
    );
};

export default DaftarOnlinePage;
