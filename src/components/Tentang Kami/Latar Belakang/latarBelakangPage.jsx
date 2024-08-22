import { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, setLatarBelakang } from "./../Latar Belakang/latarBelakangSlice";
import latarBelakangData from "./../../../data/latarBelakang.json";
import logo from "./../../../../public/images/latar belakang.png"; // Replace with the actual path to your logo/image

const LatarBelakangPage = () => {
    const dispatch = useDispatch();
    const latarBelakang = useSelector((state) => state.latarBelakang.latarBelakang || {});

    useEffect(() => {
        dispatch(getLoading());
        dispatch(setLatarBelakang(latarBelakangData));
    }, [dispatch]);

    // Splitting the text into two paragraphs
    const textParts = latarBelakang.text ? latarBelakang.text.split("\n\n") : [];

    return (
        <Row className="min-vh-100 align-items-center"> {/* Vertically centered row */}
                <Col md={4} className="d-flex justify-content-center align-items-center">
                    <Image src={logo} alt="Logo" fluid />
                </Col>
                <Col md={8} className="d-flex flex-column justify-content-center">
                    {textParts.map((part, index) => (
                        <p key={index} className="text-center fs-5 mb-4"> {/* Larger text and centered */}
                            {part}
                        </p>
                    ))}
                </Col>
            </Row>
    );
};

export default LatarBelakangPage;
