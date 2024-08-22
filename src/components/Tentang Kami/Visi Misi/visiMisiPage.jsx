import { Container, Row, Col, Card } from "react-bootstrap";
import visiMisiData from "./../../../data/visiMisi.json";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoading, setVisiMisi } from "./visiMisiSlice";
import "./styles.css"

const VisiMisiPage = () => {
    const dispatch = useDispatch();
    const { visi, misi, moto } = useSelector((state) => state.visiMisi);

    useEffect(() => {
        dispatch(getLoading());
        dispatch(setVisiMisi(visiMisiData));
    }, [dispatch]);

    return (
        <Container className="py-5">
            <Row className="min-vh-100 align-items-center justify-content-center text-center">
                <Col md={8}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Visi dan Misi</h1>
                    <div className="mb-5">
                        <h2 style={{ fontSize: '1.5rem' }}>Visi</h2>
                        <p style={{ textAlign: 'center', fontSize: '1.125rem', marginBottom: '2rem' }}>{visi}</p>
                    </div>
                    <div className="mb-5">
                        <h2 style={{ fontSize: '1.5rem' }}>Misi</h2>
                        <ul style={{ fontSize: '1.125rem', lineHeight: '1.6', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                            {misi.map((item, index) => (
                                <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginTop: '3rem' }}>Motto</h2>
                    <Row className="justify-content-center">
                        {moto.map((item, index) => (
                            <Col md={6} lg={4} key={index} className="mb-4">
                                <Card className="border-0 shadow-sm card-hover-effect">
                                    <Card.Img variant="top" src={item.logo} alt={item.title} className="img-fluid" style={{ maxHeight: '150px', objectFit: 'contain' }} />
                                    <Card.Body className="text-center">
                                        <Card.Title style={{ fontSize: '1.25rem' }}>{item.title}</Card.Title>
                                        <Card.Text style={{ fontSize: '1rem' }}>
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
    );
};

export default VisiMisiPage;
