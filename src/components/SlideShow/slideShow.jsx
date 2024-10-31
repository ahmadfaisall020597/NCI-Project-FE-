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
import {
  fetchSlideShow,
  createSlideShow,
  updateSlideShow,
  deleteSlideShow,
} from "./slideShowSlice";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { MdDelete, MdEdit } from "react-icons/md";

const slideShowPage = () => {
    const [state, setState] = useState({
        id: null,
        title: "",
        deskripsi: "",
        imagePreview: "",
        image_url: "",
        date: "",
        validated: false,
        error: "",
    })

    // Ref untuk mengakses input file
  const inputFileRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [successMessage, setSuccessMessage] = useState(""); // State for success popup

  const dispatch = useDispatch();
  const { slideshow, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.slideshow
  );

  useEffect(() => {
    dispatch(fetchSlideShow(currentPage, debouncedQuery));
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

    const slideShowData = {
      title: state.title,
      deskripsi: state.deskripsi,
      image_url: state.image_url,
      imagePreview: state.imagePreview,
      date: state.date,
    };

    setIsLoading(true); // Set loading to true

    try {
      if (state.id) {
        await dispatch(updateSlideShow(state.id, slideShowData));
        // Mengganti alert success dengan SweetAlert setelah update
        Swal.fire("Berhasil", "Slide show berhasil diupdate!", "success");
      } else {
        await dispatch(createSlideShow(slideShowData));
        // Mengganti alert success dengan SweetAlert setelah create
        Swal.fire("Berhasil", "Slide show berhasil dibuat!", "success");
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
      text: "Slide show akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          await dispatch(deleteSlideShow(id));
          // Mengganti alert success dengan SweetAlert setelah delete
          Swal.fire("Berhasil", "Slide show berhasil dihapus!", "success");
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handlePageChange = (page) => {
    dispatch(fetchSlideShow(page.selected + 1));
  };

  const handleEdit = (slideshow) => {
    setState({
      id: slideshow.id,
      title: slideshow.title,
      deskripsi: slideshow.deskripsi,
      image_url: slideshow.image_url,
      date: slideshow.date == null ? slideshow.created_at : slideshow.date,
      validated: false,
      error: "",
      imagePreview: slideshow.image_url,
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

  const inputSlideShow = () => {
    return (
      <Container
        style={{ maxWidth: "1440px", margin: "0 auto", padding: "20px" }}
      >
        <Card className="p-4 shadow-sm" style={{ borderRadius: "10px" }}>
          <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
            {state.error && <Alert variant="danger">{state.error}</Alert>}
            <Form.Group className="py-2" controlId="formJudul">
              <Form.Label>Judul Slide Show</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan judul Slide Show"
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">
                Judul tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="py-4" controlId="formTanggal">
              <Form.Label>Tanggal Slide Show</Form.Label>
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
              <Form.Label>Image Slide Show</Form.Label>
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
              <Form.Label>Deskripsi Slideshow</Form.Label>
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

  const filteredSlideShow = Array.isArray(slideshow)
    ? slideshow.filter(
        (slideshow) =>
          slideshow.title &&
          slideshow.title.toLowerCase().includes(debouncedQuery.toLowerCase())
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
                    {filteredSlideShow.length > 0 ? (
                      filteredSlideShow.map((slideshow, index) => (
                        <tr key={slideshow.id}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={slideshow.image_url}
                              alt={slideshow.title}
                              style={{ width: "100px", borderRadius: "8px" }}
                            />
                          </td>
                          <td>{slideshow.title}</td>
                          <td>{formatDate(slideshow.date)}</td>
                          <td>{slideshow.deskripsi}</td>
                          <td>
                            <Button
                              variant="warning"
                              className="me-2"
                              onClick={() => handleEdit(slideshow)}
                            >
                              <MdEdit size={20} />
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(slideshow.id)}
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
          {inputSlideShow()}
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

export default slideShowPage;