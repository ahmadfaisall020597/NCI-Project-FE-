import { Container, Row, Col, Card, Stack } from "react-bootstrap";
import visiMisiData from "./../../../data/visiMisi.json";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoading, setVisiMisi } from "./visiMisiSlice";
import "./styles.css";

const VisiMisiPage = () => {
    const dispatch = useDispatch();
    const { visi, misi, moto } = useSelector((state) => state.visiMisi);

    useEffect(() => {
        dispatch(getLoading());
        dispatch(setVisiMisi(visiMisiData));
    }, [dispatch]);

    const renderVisiandMisi = () => {
        return (
            <Stack className="py-4">
                <Container className="py-4">
                    <Row className="min-vh-100 align-items-center justify-content-center text-center">
                        <Col md={8}>
                            <div className="mb-5">
                                <h2 style={{ fontSize: '1.5rem' }}>Visi</h2>
                                <p style={{ textAlign: 'center', fontSize: '1.125rem', marginBottom: '2rem' }}>{visi}</p>
                            </div>
                            <div className="mb-5">
                                <h2 style={{ fontSize: '1.5rem' }}>Misi</h2>
                                <div className="misi-list">
                                    {misi.map((item, index) => (
                                        <div key={index} className="misi-item" style={{ fontSize: '1.125rem' }}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginTop: '3rem' }}>Motto</h2>
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
        <Stack className="py-4">
            {renderVisiandMisi()}
        </Stack>
    );
};

export default VisiMisiPage;
