import { useState } from 'react';
import { Form, Button, Container, Alert, Stack, Table, Card } from 'react-bootstrap';

const VideoPage = () => {
    const [state, setState] = useState({
        judul: "",
        tanggal: "",
        link: "",
        validated: false,
        error: "",
    });

    const [videoList, setVideoList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setState(prevState => ({
            ...prevState,
            validated: true
        }));
        if (!state.judul || !state.tanggal || !state.link) {
            setState(prevState => ({
                ...prevState,
                error: "Semua field harus diisi."
            }));
            return;
        }
        const newVideo = {
            id: Date.now(),
            judul: state.judul,
            tanggal: state.tanggal,
            link: state.link,
        };
        setVideoList([...videoList, newVideo]);
        setState({
            judul: "",
            tanggal: "",
            link: "",
            validated: false,
            error: "",
        });
    };

    const handleDelete = (id) => {
        setVideoList(videoList.filter(video => video.id !== id));
    };

    const handleEdit = (id) => {
        const videoToEdit = videoList.find(video => video.id === id);
        setState({
            judul: videoToEdit.judul,
            tanggal: videoToEdit.tanggal,
            link: videoToEdit.link,
            validated: false,
            error: "",
        });
        setVideoList(videoList.filter(video => video.id !== id));
    };

    const inputVideo = () => {
        return (
            <Container style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px' }}>
                <Card className="p-4 shadow-sm" style={{ borderRadius: '10px' }}>
                    <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
                        {state.error && <Alert variant="danger">{state.error}</Alert>}
                        <Form.Group className='py-2' controlId="formJudul">
                            <Form.Label>Judul Video</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan judul video"
                                value={state.judul}
                                onChange={(e) => setState({ ...state, judul: e.target.value })}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Judul tidak boleh kosong.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='py-4' controlId="formTanggal">
                            <Form.Label>Tanggal Video</Form.Label>
                            <Form.Control
                                type="date"
                                value={state.tanggal}
                                onChange={(e) => setState({ ...state, tanggal: e.target.value })}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Tanggal tidak boleh kosong.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='py-4' controlId="formLinkVideo">
                            <Form.Label>Link Video</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan link video"
                                value={state.link}
                                onChange={(e) => setState({ ...state, link: e.target.value })}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Link Video tidak boleh kosong.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Stack className='py-3'>
                            <Button variant="primary" type="submit" style={{ borderRadius: '5px', backgroundColor: '#007bff', borderColor: '#007bff' }}>
                                Submit
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
                <h4 className="mb-4" style={{ textAlign: 'center' }}>Daftar Video</h4>
                <Table striped bordered hover responsive style={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>NO</th>
                            <th>Judul</th>
                            <th>Tanggal</th>
                            <th>Link Video</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videoList.map((video, index) => (
                            <tr key={video.id}>
                                <td>{index + 1}</td>
                                <td>{video.judul}</td>
                                <td>{video.tanggal}</td>
                                <td><a href={video.link} target="_blank" rel="noopener noreferrer">{video.link}</a></td>
                                <td>
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(video.id)} style={{ marginRight: '5px', borderRadius: '5px' }}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(video.id)} style={{ borderRadius: '5px' }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    };

    return (
        <Stack>
            {inputVideo()}
            {renderTable()}
        </Stack>
    );
}

export default VideoPage;
