import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Alert, Stack, Table, Card } from 'react-bootstrap';
import { fetchVideos, createVideo, updateVideo, deleteVideo } from './videoSlice';
import ReactPaginate from 'react-paginate';
import './styles.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import dayjs from 'dayjs';

const VideoPage = () => {
    const [state, setState] = useState({
        id: null,
        title: "",
        url: "",
        date: "",
        validated: false,
        error: "",
    });

    const dispatch = useDispatch();
    const { videos, loading, error, totalPages, currentPage } = useSelector((state) => state.video);
    // console.log('total pages : ', totalPages),
    // console.log('current pages : ', currentPage);

    useEffect(() => {
        dispatch(fetchVideos(1));
    }, [dispatch]);

    useEffect(() => {
        console.log('Videos state updated:', videos);
    }, [videos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setState(prevState => ({
            ...prevState,
            validated: true
        }));

        if (!state.title || !state.url) {
            setState(prevState => ({
                ...prevState,
                error: "Semua field harus diisi."
            }));
            return;
        }

        const videoData = {
            title: state.title,
            url: state.url,
            date: state.date,
        };
        // console.log('video data : ', videoData);

        if (state.id) {
            // console.log('submit edit : ', state.id)
            dispatch(updateVideo(state.id, videoData));
        } else {
            dispatch(createVideo(videoData));
        }

        // Reset form
        setState({
            id: null,
            title: "",
            url: "",
            date: "",
            validated: false,
            error: "",
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteVideo(id));
    };

    const handlePageChange = (selectedPage) => {
        // console.log('Selected page:', selectedPage.selected);
        dispatch(fetchVideos(selectedPage.selected + 1));
    };

    const handleEdit = (video) => {
        setState({
            id: video.id,
            title: video.title,
            url: video.url,
            date: video.date == null ? video.created_at : video.date,
            validated: false,
            error: "",
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "dd MMMM yyyy HH:mm", { locale: id });
    };

    const handleDateChange = (e) => {
        setState({ ...state, date: e.target.value });
    };

    // Format date for input
    const formattedDate = state.date ? dayjs(state.date).format('YYYY-MM-DDTHH:mm') : '';

    const inputVideo = () => (
        <Container style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px' }}>
            <Card className="p-4 shadow-sm" style={{ borderRadius: '10px' }}>
                <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
                    {state.error && <Alert variant="danger">{state.error}</Alert>}
                    <Form.Group className='py-2' controlId="formJudul">
                        <Form.Label>Judul Video</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan judul video"
                            value={state.title}
                            onChange={(e) => setState({ ...state, title: e.target.value })}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Judul tidak boleh kosong.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='py-4' controlId="formLinkVideo">
                        <Form.Label>Link Video</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan link video"
                            value={state.url}
                            onChange={(e) => setState({ ...state, url: e.target.value })}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Link Video tidak boleh kosong.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='py-4' controlId="formTanggal">
                        <Form.Label>Tanggal dan Waktu Video</Form.Label>
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

    const renderTable = () => (
        <Container className="mt-5" style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <h4 className="mb-4" style={{ textAlign: 'center' }}>Daftar Video</h4>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <Table striped bordered hover responsive style={{ borderRadius: '10px', overflow: 'hidden' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th>NO</th>
                                <th>Judul</th>
                                <th>Link Video</th>
                                <th>Tanggal Buat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos.length > 0 ? (
                                videos.map((video, index) => (
                                    <tr key={video.id}>
                                        <td>{index + 1 + (currentPage - 1) * 10}</td>
                                        <td>{video.title}</td>
                                        <td><a href={video.url} target="_blank" rel="noopener noreferrer">{video.url}</a></td>
                                        <td>{video.date == null ? formatDate(video.created_at) : formatDate(video.date)}</td>
                                        <td>
                                            <Button variant="warning" size="sm" onClick={() => handleEdit(video)} style={{ marginRight: '5px', borderRadius: '5px' }}>Edit</Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(video.id)} style={{ borderRadius: '5px' }}>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>No videos available</td>
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
            {inputVideo()}
            {renderTable()}
        </Stack>
    );
}

export default VideoPage;
