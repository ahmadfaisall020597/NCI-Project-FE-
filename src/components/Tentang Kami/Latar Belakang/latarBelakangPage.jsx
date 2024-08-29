import { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  setLatarBelakang,
} from "./../Latar Belakang/latarBelakangSlice";
import latarBelakangData from "./../../../data/latarBelakang.json";
import "./styles.css"; // Import the CSS file
import { Images } from "../../../helpers/images";

const LatarBelakangPage = () => {
  const dispatch = useDispatch();
  const latarBelakang = useSelector(
    (state) => state.latarBelakang.latarBelakang || {}
  );

  useEffect(() => {
    dispatch(getLoading());
    dispatch(setLatarBelakang(latarBelakangData));
  }, [dispatch]);

  // Splitting the text into two paragraphs
  const textParts = latarBelakang.text ? latarBelakang.text.split("\n\n") : [];

  return (
    <Container className="latar-belakang-page">
      <Row className="align-items-center">
        <Col md={4} className="d-flex justify-content-center">
          <Image src={Images.logoLatarBelakang} alt="Logo" fluid className="latar-belakang-logo" />
        </Col>
        <Col md={8} className="d-flex flex-column justify-content-center">
          <h1 className="latar-belakang-title">Latar Belakang</h1>
          <div className="latar-belakang-card" style={{ marginTop: '2rem'}}>
            {textParts.map((part, index) => (
              <p key={index} className="latar-belakang-text">
                {part}
              </p>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LatarBelakangPage;
