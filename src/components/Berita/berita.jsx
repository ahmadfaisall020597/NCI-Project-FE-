import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Alert, Stack, Table, Card } from 'react-bootstrap';
import { setFormState, addBerita, updateBerita, deleteBerita, resetForm } from './beritaSlice';

const BeritaPage = () => {
    const dispatch = useDispatch();
    const { beritaList, formState } = useSelector(state => state.berita);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setFormState({ validated: true }));
    
        if (!formState.id && (!formState.judul || !formState.tanggal || !formState.image || !formState.deskripsi)) {
            dispatch(setFormState({ error: "Semua field harus diisi." }));
            return;
        }
    
        if (formState.id) {
            dispatch(updateBerita({
                id: formState.id,
                judul: formState.judul,
                tanggal: formState.tanggal,
                image: formState.imagePreview,
                deskripsi: formState.deskripsi,
            }));
        } else {
            dispatch(addBerita({
                id: Date.now(),
                judul: formState.judul,
                tanggal: formState.tanggal,
                image: formState.imagePreview,
                deskripsi: formState.deskripsi,
            }));
        }
    
        dispatch(resetForm());
    };

    const handleDelete = (id) => {
        dispatch(deleteBerita(id));
    };

    const handleEdit = (id) => {
        const beritaToEdit = beritaList.find(berita => berita.id === id);
        dispatch(setFormState({
            id: beritaToEdit.id,
            judul: beritaToEdit.judul,
            tanggal: beritaToEdit.tanggal,
            image: null,
            imagePreview: beritaToEdit.image,
            deskripsi: beritaToEdit.deskripsi,
            validated: false,
            error: "",
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        dispatch(setFormState({
            image: file,
            imagePreview: file ? URL.createObjectURL(file) : ""
        }));
    };

    const inputBerita = () => {
        return (
            <Container style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px' }}>
                <Card className="p-4 shadow-sm" style={{ borderRadius: '10px' }}>
                    <Form noValidate validated={formState.validated} onSubmit={handleSubmit}>
                        {formState.error && <Alert variant="danger">{formState.error}</Alert>}
                        <Form.Group className='py-2' controlId="formJudul">
                            <Form.Label>Judul Berita</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan judul berita"
                                value={formState.judul}
                                onChange={(e) => dispatch(setFormState({ judul: e.target.value }))}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Judul tidak boleh kosong.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='py-4' controlId="formTanggal">
                            <Form.Label>Tanggal Berita</Form.Label>
                            <Form.Control
                                type="date"
                                value={formState.tanggal}
                                onChange={(e) => dispatch(setFormState({ tanggal: e.target.value }))}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Tanggal tidak boleh kosong.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='py-4' controlId="formImage">
                            <Form.Label>Image Berita</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImageChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Image tidak boleh kosong.
                            </Form.Control.Feedback>
                            {formState.imagePreview && (
                                <div className="mt-3" style={{ maxWidth: '200px', overflow: 'hidden' }}>
                                    <img
                                        src={formState.imagePreview}
                                        alt="Preview"
                                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className='py-4' controlId="formDeskripsi">
                            <Form.Label>Deskripsi Berita</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Masukkan deskripsi berita"
                                value={formState.deskripsi}
                                onChange={(e) => dispatch(setFormState({ deskripsi: e.target.value }))}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Deskripsi tidak boleh kosong.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Stack className='py-3'>
                            <Button variant="primary" type="submit" style={{ borderRadius: '5px', backgroundColor: '#007bff', borderColor: '#007bff' }}>
                                {formState.id ? 'Update' : 'Submit'}
                            </Button>
                        </Stack>
                    </Form>
                </Card>
            </Container>
        )
    };

    const renderTable = () => {
        return (
            <Container className="mt-5" style={{ maxWidth: '1440px', margin: '0 auto' }}>
                <h4 className="mb-4" style={{ textAlign: 'center' }}>Daftar Berita</h4>
                <Table striped bordered hover responsive style={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>NO</th>
                            <th>Image</th>
                            <th>Judul</th>
                            <th>Tanggal</th>
                            <th>Deskripsi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beritaList.map((berita, index) => (
                            <tr key={berita.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={berita.image}
                                        alt="Image"
                                        style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
                                    />
                                </td>
                                <td>{berita.judul}</td>
                                <td>{berita.tanggal}</td>
                                <td>{berita.deskripsi}</td>
                                <td>
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(berita.id)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" size="sm" className="ml-2" onClick={() => handleDelete(berita.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    };

    return (
        <div>
            {inputBerita()}
            {renderTable()}
        </div>
    );
};

export default BeritaPage;
