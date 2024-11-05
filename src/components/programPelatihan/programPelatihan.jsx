import React, { useEffect } from 'react';
import { Card, Stack } from 'react-bootstrap';
import { pelatihan } from '../../data/pelatihan';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { objectRouter } from '../../utils/router/objectRouter';
import Footer from '../../partials/Footer/footer';
import { fetchPelatihanDashboard } from '../Pelatihan/pelatihanSlice';
import { useSelector, useDispatch } from 'react-redux';
import WhatsAppButton from '../../partials/Whatsapp/whatsapp';

const ProgramPelatihanPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pelatihan } = useSelector((state) => state.pelatihan);
    useEffect(() => {
        dispatch(fetchPelatihanDashboard());
    }, []);

    const handlePelatihanDetail = (id) => {
        const selectedPelatihan = pelatihan.find(item => item.id === id);
        const item = {
            pelatihanId: id,
            detailPelatihan: selectedPelatihan,
        };
        const newPath = `${objectRouter.detailPelatihan.path.replace("/:id", "/" + id)}`;
        navigate(newPath, { state: { itemDetail: item } });
    }

    return (
        <Stack className='py-2 d-flex flex-column min-vh-100'>
            <h2 className='text-center'>Program Pelatihan</h2>
            <div className="scroll-container flex-grow-1">
                {pelatihan.map((programItem) => (
                    <div key={programItem.id} className="card-wrapper">
                        <Card
                            className="mb-4"
                            onClick={() => handlePelatihanDetail(programItem.id)}
                        >
                            <div className="card-image-wrapper">
                                <Card.Img
                                    variant="top"
                                    src={programItem.image_spanduk_pelatihan}
                                    alt={programItem.title}
                                    className="card-image"
                                />
                            </div>
                            <Card.Body className="card-body">
                                <Card.Title className='card-title'>{programItem.title}</Card.Title>
                                <ul>
                                    <li><strong>Durasi:</strong> {programItem.duration}</li>
                                    <li><strong>Tanggal Mulai:</strong> {new Date(programItem.tanggal_mulai).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                                    <li><strong>Lokasi:</strong> {programItem.location}</li>
                                    <li><strong>Biaya: </strong> {programItem.biaya === "0.00" ? 'Gratis' : parseFloat(programItem.biaya).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            <WhatsAppButton />
            <Footer />
        </Stack>
    );
};

export default ProgramPelatihanPage;
