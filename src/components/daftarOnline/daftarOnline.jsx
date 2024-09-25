import { Stack } from "react-bootstrap";

const DaftarOnlinePage = () => {
    return (
        <Stack className="d-flex justify-content-center align-items-center h-100 overflow-auto" style={{ maxHeight: '100vh' }}>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfDSb2M-96nElvgrVY146fM844XIlyaF8jNJfFxFrCuYtOrBA/viewform?embedded=true"
                width="100%"
                height="1000"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
            >
                Loading…
            </iframe>
        </Stack>
    );
};

export default DaftarOnlinePage;
