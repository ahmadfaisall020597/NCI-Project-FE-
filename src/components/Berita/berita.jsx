import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Container,
  Alert,
  Stack,
  Table,
  Card,
  InputGroup,
  FormControl,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";
import { fetchNews, createNews, updateNews, deleteNews } from "./beritaSlice";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import dayjs from "dayjs";
import Swal from "sweetalert2"; // Import Swal
import { MdDelete, MdEdit } from "react-icons/md";

const BeritaPage = () => {
  const [state, setState] = useState({
    id: null,
    title: "",
    deskripsi: "",
    imagePreview: "",
    image_url: "",
    date: "",
    validated: false,
    error: "",
  });
  // Ref untuk mengakses input file
  const inputFileRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [successMessage, setSuccessMessage] = useState(""); // State for success popup

  const dispatch = useDispatch();
  const { news, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews(currentPage, debouncedQuery));
  }, [dispatch, currentPage, debouncedQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      validated: true,
    }));

    if (state.title === "" || state.deskripsi === "" || state.date === "") {
      setState((prevState) => ({
        ...prevState,
        error: "Semua field harus diisi.",
      }));
      return;
    }

    const newsData = {
      title: state.title,
      deskripsi: state.deskripsi,
      image_url: state.image_url,
      imagePreview: state.imagePreview,
      date: state.date,
    };

    setIsLoading(true); // Set loading to true

    try {
      if (state.id) {
        await dispatch(updateNews(state.id, newsData));
        // Mengganti alert success dengan SweetAlert setelah update
        Swal.fire("Berhasil", "Berita berhasil diupdate!", "success");
      } else {
        await dispatch(createNews(newsData));
        // Mengganti alert success dengan SweetAlert setelah create
        Swal.fire("Berhasil", "Berita berhasil dibuat!", "success");
      }

      setState({
        id: null,
        title: "",
        deskripsi: "",
        imagePreview: "",
        image_url: "",
        date: "",
        validated: false,
        error: "",
      });
      // Reset input file field using ref
      if (inputFileRef.current) {
        inputFileRef.current.value = ""; // Reset input file value
      }
    } finally {
      setIsLoading(false); // Set loading to false after operation
    }
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
          await dispatch(deleteNews(id));
          // Mengganti alert success dengan SweetAlert setelah delete
          Swal.fire("Berhasil", "Berita berhasil dihapus!", "success");
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handlePageChange = (page) => {
    dispatch(fetchNews(page.selected + 1));
  };

  const handleEdit = (news) => {
    setState({
      id: news.id,
      title: news.title,
      deskripsi: news.deskripsi,
      image_url: news.image_url,
      date: news.date == null ? news.created_at : news.date,
      validated: false,
      error: "",
      imagePreview: news.image_url,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy HH:mm", { locale: id });
  };

  const handleDateChange = (e) => {
    setState({
      ...state,
      date: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setState((prevState) => ({
      ...prevState,
      image_url: file ? file : null,
      imagePreview: file ? URL.createObjectURL(file) : state.image_url,
    }));
  };

  const formattedDate = state.date
    ? dayjs(state.date).format("YYYY-MM-DDTHH:mm")
    : "";

  const inputBerita = () => {
    return (
      <Container
        style={{ maxWidth: "1440px", margin: "0 auto", padding: "20px" }}
      >
        <Card className="p-4 shadow-sm" style={{ borderRadius: "10px" }}>
          <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
            {state.error && <Alert variant="danger">{state.error}</Alert>}
            <Form.Group className="py-2" controlId="formJudul">
              <Form.Label>Judul Berita</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan judul berita"
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">
                Judul tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="py-4" controlId="formTanggal">
              <Form.Label>Tanggal Berita</Form.Label>
              <Form.Control
                type="datetime-local"
                value={formattedDate}
                onChange={handleDateChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Tanggal tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="py-4" controlId="formImage">
              <Form.Label>Image Berita</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                ref={inputFileRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Image tidak boleh kosong.
              </Form.Control.Feedback>
              {state.imagePreview && (
                <div
                  className="mt-3"
                  style={{ maxWidth: "200px", overflow: "hidden" }}
                >
                  <img
                    src={state.imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="py-4" controlId="formDeskripsi">
              <Form.Label>Deskripsi Berita</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan deskripsi berita"
                value={state.deskripsi}
                onChange={(e) =>
                  setState({ ...state, deskripsi: e.target.value })
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                Deskripsi tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>
            <Stack className="py-3">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                }}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Loading...
                  </>
                ) : state.id ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
            </Stack>
          </Form>
        </Card>
      </Container>
    );
  };

  const filteredNews = Array.isArray(news)
    ? news.filter(
        (berita) =>
          berita.title &&
          berita.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : [];

  const renderTable = () => {
    return (
      <Container
        className="mt-5"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Daftar Berita
        </h4>
        <Row className="mb-3">
          <Col lg="auto" className="d-flex justify-content-end">
            <div style={{ maxWidth: "500px", width: "100%" }}>
              <InputGroup>
                <FormControl
                  placeholder="Cari judul berita..."
                  aria-label="Cari judul berita"
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
                  <th>NO</th>
                  <th>Image</th>
                  <th>Judul</th>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.length > 0 ? (
                  filteredNews.map((berita, index) => (
                    <tr key={berita.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={berita.image_url}
                          alt={berita.title}
                          style={{ width: "100px", borderRadius: "8px" }}
                        />
                      </td>
                      <td>{berita.title}</td>
                      <td>{formatDate(berita.date)}</td>
                      <td>{berita.deskripsi}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleEdit(berita)}
                        >
                          <MdEdit size={20} />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(berita.id)}
                        >
                          <MdDelete size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Tidak ada berita yang ditemukan
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
  };

  return (
    <div>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {inputBerita()}
      {renderTable()}

      {/* Success Popup */}
      <Modal
        show={!!successMessage}
        onHide={() => setSuccessMessage("")}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setSuccessMessage("")}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BeritaPage;
