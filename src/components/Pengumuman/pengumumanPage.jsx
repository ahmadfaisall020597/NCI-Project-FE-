import { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Stack, Table, Card, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import { updatePengumuman, createPengumuman, fetchPengumuman, deletePengumuman } from './pengumumanSlice';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { id } from 'date-fns/locale';
import { MdDelete, MdEdit } from "react-icons/md";

const PengumumanPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const dispatch = useDispatch();
    const [state, setState] = useState({
        id: null,
        deskripsi: "",
        date: "",
        validated: false,
        error: "",
    });
    const { pengumuman, loading, error, totalPages, currentPage } = useSelector((state) => state.pengumuman)

    console.log('pengumuman : ', pengumuman);

    useEffect(() => {
        dispatch(fetchPengumuman(currentPage, debouncedQuery));
    }, [dispatch, currentPage, debouncedQuery]);

    useEffect(() => {
        console.log('Videos state updated:', pengumuman);
    }, [pengumuman]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setState(prevState => ({
            ...prevState,
            validated: true
        }));

        if (!state.deskripsi || !state.date) {
            setState(prevState => ({
                ...prevState,
                error: "Semua field harus diisi."
            }));
            return;
        }

        const pengumumanData = {
            deskripsi: state.deskripsi,
            date: state.date,
        };

        console.log('pengumuman data : ', pengumumanData);

        if (state.id) {
            dispatch(updatePengumuman(state.id, pengumumanData));
        } else {
            dispatch(createPengumuman(pengumumanData));
        }

        // Reset form
        setState({
            id: null,
            deskripsi: "",
            date: "",
            validated: false,
            error: "",
        });
    };

    const handleDateChange = (e) => {
        setState({ ...state, date: e.target.value });
    };

    const handlePageChange = (selectedPage) => {
        // console.log('Selected page:', selectedPage.selected);
        dispatch(fetchPengumuman(selectedPage.selected + 1));
    };

    const handleEdit = (pengumuman) => {
        console.log('pengumuman edit : ', pengumuman);
        setState({
            id: pengumuman.id,
            deskripsi: pengumuman.deskripsi,
            date: pengumuman.date == null ? pengumuman.created_at : pengumuman.date,
            validated: false,
            error: "",
        });
    };

    const handleDelete = (id) => {
        dispatch(deletePengumuman(id));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "dd MMMM yyyy HH:mm", { locale: id });
    };

    const formattedDate = state.date ? dayjs(state.date).format('YYYY-MM-DDTHH:mm') : '';

    const inputPengumuman = () => {
        return (
            <Container style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px' }}>
                <Card className="p-4 shadow-sm" style={{ borderRadius: '10px' }}>
                    <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
                        {state.error && <Alert variant="danger">{state.error}</Alert>}
                        <Form.Group className='py-2' controlId="formDeskripsi">
                            <Form.Label>Deskripsi Pengumuman</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan deskripsi pengumuman"
                                value={state.deskripsi}
                                onChange={(e) => setState({ ...state, deskripsi: e.target.value })}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Deskripsi tidak boleh kosong.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='py-4' controlId="formTanggal">
                            <Form.Label>Tanggal dan Waktu Pengumuman</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={formattedDate}
                                onChange={handleDateChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Tanggal dan waktu tidak boleh kosong.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Stack className='py-3'>
                            <Button variant="primary" type="submit" style={{ borderRadius: '5px', backgroundColor: '#007bff', borderColor: '#007bff' }}>
                                {state.id ? "Update" : "Submit"}
                            </Button>
                        </Stack>
                    </Form>
                </Card>
            </Container>
        );
    };

    const filteredPengumuman = pengumuman.filter(pengumuman =>
        pengumuman.deskripsi.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const renderTable = () => (
        <Container className="mt-5" style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <h4 className="mb-4" style={{ textAlign: 'center' }}>Daftar Pengumuman</h4>
            <Row className="mb-3">
                <Col lg="auto" className="d-flex justify-content-end">
                    <div style={{ maxWidth: '500px', width: '100%' }}>
                        <InputGroup>
                            <FormControl
                                placeholder="Cari judul pengumuman..."
                                aria-label="Cari judul pengumuman"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <Table striped bordered hover responsive style={{ borderRadius: '10px', overflow: 'hidden' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th>Deskripsi Pengumuman</th>
                                <th>Tanggal Buat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPengumuman.length > 0 ? (
                                filteredPengumuman.map((pengumuman, index) => (
                                    <tr key={pengumuman.id}>
                                        <td>{pengumuman.deskripsi}</td>
                                        <td>{pengumuman.date == null ? formatDate(pengumuman.created_at) : formatDate(pengumuman.date)}</td>
                                        <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Button
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 0,
                                                    marginRight: '30px',
                                                    borderRadius: 0,
                                                    color: 'inherit',
                                                    fontSize: '24px'
                                                }}
                                                onClick={() => handleEdit(pengumuman)}
                                            >
                                                <MdEdit />
                                            </Button>
                                            <Button
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 0,
                                                    borderRadius: 0,
                                                    color: 'inherit',
                                                    fontSize: '24px'
                                                }}
                                                onClick={() => handleDelete(pengumuman.id)}
                                            >
                                                <MdDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No videos available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Stack className='py-3'>
                        <div className="text-center mb-3">Page {currentPage} of {totalPages}</div>
                        <ReactPaginate
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                            forcePage={currentPage - 1}
                        />
                    </Stack>
                </>
            )}
        </Container>
    );

    return (
        <Stack>
            {inputPengumuman()}
            {renderTable()}
        </Stack>
    );
}

export default PengumumanPage;
