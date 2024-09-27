import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Alert, Stack, Table, Card, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { fetchVideos, createVideo, updateVideo, deleteVideo } from './videoSlice';
import ReactPaginate from 'react-paginate';
import './styles.css';
import Swal from "sweetalert2"; // Import Swal
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import dayjs from 'dayjs';
import { MdDelete, MdEdit } from "react-icons/md";

const VideoPage = () => {
    const [state, setState] = useState({
        id: null,
        title: "",
        url: "",
        date: "",
        validated: false,
        error: "",
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false); // State for loading
    const { videos, loading, error, totalPages, currentPage } = useSelector((state) => state.video);
    console.log('videos : ', videos);
    console.log('total pages : ', totalPages),
    console.log('current pages : ', currentPage);

    useEffect(() => {
        dispatch(fetchVideos(currentPage, debouncedQuery));
    }, [dispatch, currentPage, debouncedQuery]);

    useEffect(() => {
        console.log('Videos state updated:', videos);
    }, [videos]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const handleSubmit = async (e) => {
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
            await dispatch(updateVideo(state.id, videoData));
            Swal.fire("Berhasil", "Video berhasil diupdate!", "success");
        } else {
            await dispatch(createVideo(videoData));
            Swal.fire("Berhasil", "Video berhasil dibuat!", "success");
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

    const handleDelete = async (id) => {
        // SweetAlert untuk konfirmasi penghapusan berita
        Swal.fire({
          title: "Apakah Anda yakin?",
          text: "Berita akan dihapus secara permanen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
        }).then(async (result) => {
          if (result.isConfirmed) {
            setIsLoading(true);
            try {
              await dispatch(deleteVideo(id));
              // Mengganti alert success dengan SweetAlert setelah delete
              Swal.fire("Berhasil", "Berita berhasil dihapus!", "success");
            } finally {
              setIsLoading(false);
            }
          }
        });
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

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const renderTable = () => (
      <Container
        className="mt-5"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Daftar Video
        </h4>
        <Row className="mb-3">
          <Col lg="auto" className="d-flex justify-content-end">
            <div style={{ maxWidth: "500px", width: "100%" }}>
              <InputGroup>
                <FormControl
                  placeholder="Cari judul video..."
                  aria-label="Cari judul video"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "100%" }}
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
            <Table
              striped
              bordered
              hover
              responsive
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <thead className="thead-dark">
                <tr>
                  <th>Judul</th>
                  <th>Link Video</th>
                  <th>Tanggal Buat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video, index) => (
                    <tr key={video.id}>
                      <td>{video.title}</td>
                      <td>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {video.url}
                        </a>
                      </td>
                      <td>
                        {video.date == null
                          ? formatDate(video.created_at)
                          : formatDate(video.date)}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleEdit(video)}
                        >
                          <MdEdit size={20} />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(video.id)}
                        >
                          <MdDelete size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No videos available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Stack className="py-3">
              <div className="text-center mb-3">
                Page {currentPage} of {totalPages}
              </div>
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
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
