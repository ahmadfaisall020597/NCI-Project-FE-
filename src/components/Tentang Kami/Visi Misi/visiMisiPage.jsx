import { Container, Row, Col, Card, Stack } from "react-bootstrap";
import { VisiMisiData } from "../../../data/visiMisi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoading, setVisiMisi } from "./visiMisiSlice";
import "./styles.css";
import { useMediaQuery } from "react-responsive";
import WhatsAppButton from "../../../partials/Whatsapp/whatsapp";

const VisiMisiPage = () => {
    const dispatch = useDispatch();
    const { visi, misi, moto } = useSelector((state) => state.visiMisi);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        dispatch(getLoading());
        dispatch(setVisiMisi(VisiMisiData));
    }, [dispatch]);

    const renderVisiandMisi = () => {
        return (
            <Stack>
                <Container className="py-4">
                    <Row className="min-vh-100 align-items-center justify-content-center text-center">
                        <Col md={8}>
                            <div
                                style={{
                                    marginBottom: isMobile ? '10px' : '20px'
                                }}
                            >
                                <p className="fw-semibold" style={{ fontSize: isMobile ? '20px' : '28px' }}>Visi</p>
                                <p style={{ textAlign: 'center', fontSize: isMobile ? '14px' : '20px', marginBottom: '2rem' }}>{visi}</p>
                            </div>
                            <div
                                style={{
                                    marginBottom: isMobile ? '10px' : '20px'
                                }}
                            >
                                <p className="fw-semibold" style={{ fontSize: isMobile ? '20px' : '28px' }}>Misi</p>
                                <div className="misi-list">
                                    {misi.map((item, index) => (
                                        <div key={index} className="misi-item" style={{ fontSize: isMobile ? '14px' : '20px' }}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="fw-semibold" style={{ fontSize: isMobile ? '20px' : '28px', marginTop: isMobile ? '30px' : '40px' }}>Motto</p>
                            <Row className="justify-content-center">
                                {moto.map((item, index) => (
                                    <Col md={6} lg={4} key={index} className="mb-4">
                                        <Card className="custom-card">
                                            <Card.Img variant="top" src={item.logo} alt={item.title} className="img-fluid card-image" />
                                            <Card.Body className="text-center">
                                                <Card.Title className="card-title">{item.title}</Card.Title>
                                                <Card.Text className="card-text">
                                                    {item.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Stack>
        )
    }

    return (
        <Stack>
            {renderVisiandMisi()}
            <WhatsAppButton />
        </Stack>
    );
};

export default VisiMisiPage;
