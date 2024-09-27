import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import { pelatihan } from '../../data/pelatihan';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { objectRouter } from '../../utils/router/objectRouter';

const ProgramPelatihanPage = () => {
    const navigate = useNavigate();
    const handlePelatihanDetail = (id) => {
        const item = {
            pelatihanId: id,
            detailPelatihan: pelatihan,
        }
        const newPath = `${objectRouter.detailPelatihan.path.replace("/:id", "/" + id)}`;
        navigate(newPath, { state: { itemDetail: item } });
    }

    return (
        <Stack className='py-2'>
            <h2 className='text-center'>Program Pelatihan</h2>
            <div className="scroll-container">
                {pelatihan.program_pelatihan.map((programItem) => (
                    <div key={programItem.id} className="card-wrapper">
                        <Card
                            className="mb-4"
                            onClick={() => handlePelatihanDetail(programItem.id)}
                        >
                            <div className="card-image-wrapper">
                                <Card.Img
                                    variant="top"
                                    src={programItem.image}
                                    alt={programItem.nama_program}
                                    className="card-image"
                                />
                            </div>
                            <Card.Body className="card-body">
                                <Card.Title>{programItem.nama_program}</Card.Title>
                                <Card.Text>
                                    {programItem.deskripsi}
                                </Card.Text>
                                <ul>
                                    <li><strong>Durasi:</strong> {programItem.durasi}</li>
                                    <li><strong>Tanggal Mulai:</strong> {new Date(programItem.tanggal_mulai).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                                    <li><strong>Lokasi:</strong> {programItem.lokasi}</li>
                                    <li><strong>Biaya:</strong> {programItem.biaya}</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </Stack>
    );
};

export default ProgramPelatihanPage;
