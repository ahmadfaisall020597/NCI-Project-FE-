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
import ReactPaginate from "react-paginate";
import { fetchPelatihan, createPelatihan, updatePelatihan, deletePelatihan } from "./pelatihanSlice";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import dayjs from "dayjs";
import Swal from "sweetalert2"; // Import Swal
import { MdDelete, MdEdit } from "react-icons/md";

const PelatihanPage = () => {
  const [state, setState] = useState({
    id: null,
    title: "",
    image_kemendikbud_ristek: "",
    image_kemendikbud_ristekPreview: "",
    image_logo_nci: "",
    image_logo_nciPreview: "",
    image_logo_mitra: "",
    image_logo_mitraPreview: "",
    deskripsi: "",
    persyaratan: [],
    image_spanduk_pelatihan: "",
    image_spanduk_pelatihanPreview: "",
    duration: "",
    location: "",
    biaya: "",
    url_daftar: "",
    output: "",
    date: "",
    validated: false,
    error: "",
  });

  const inputFileRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [successMessage, setSuccessMessage] = useState(""); // State for success popup

  const dispatch = useDispatch();
  const { pelatihan, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.pelatihan
  );

  useEffect(() => {
    dispatch(fetchPelatihan(currentPage, debouncedQuery));
  }, [dispatch, currentPage, debouncedQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  
  useEffect(() => {
}, [pelatihan]);
  
  const handlePageChange = (page) => {
    dispatch(fetchPelatihan(page.selected + 1));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return dayjs(date).format("YYYY-MM-DD HH:mm"); // Use dayjs for formatting
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // Get the raw input value
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD HH:mm"); // Format it
    setState({
      ...state,
      date: formattedDate, // Store the formatted date
    });
  };
  

  const formattedDate = state.date
  ? dayjs(state.date).format("YYYY-MM-DDTHH:mm")
  : "";


  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      validated: true,
    }));

    if (
      state.title === "" ||
      state.image_kemendikbud_ristek === "" ||
      state.image_logo_mitra === "" ||
      state.deskripsi === "" ||
      state.spanduk === "" ||
      state.persyaratan.length === 0 ||
      state.image_spanduk_pelatihan === "" ||
      state.duration === "" ||
      state.location === "" ||
      state.biaya === "" ||
      state.url_daftar === "" ||
      state.output === ""
    ) {
      setState((prevState) => ({
        ...prevState,
        error: "Semua field harus diisi",
      }));
      return;
    }

    const pelatihanData = {
      title: state.title,
      image_kemendikbud_ristek: state.image_kemendikbud_ristek,
      image_kemendikbud_ristekPreview: state.image_kemendikbud_ristekPreview,
      image_logo_nci: state.image_logo_nci,
      image_logo_nciPreview: state.image_logo_nciPreview,
      image_logo_mitra: state.image_logo_mitra,
      image_logo_mitraPreview: state.image_logo_mitraPreview,
      deskripsi: state.deskripsi,
      persyaratan: state.persyaratan,
      image_spanduk_pelatihan: state.image_spanduk_pelatihan,
      image_spanduk_pelatihanPreview: state.image_spanduk_pelatihanPreview,
      duration: state.duration,
      location: state.location,
      biaya: state.biaya,
      url_daftar: state.url_daftar,
      output: state.output,
      date: state.date,
    };

    setIsLoading(true);

    try {
      if (state.id) {
        await dispatch(updatePelatihan(state.id, pelatihanData));
        // Mengganti alert success dengan SweetAlert setelah update
        Swal.fire("Berhasil", "Pelatihan berhasil diupdate!", "success");
      } else {
        await dispatch(createPelatihan(pelatihanData));
        // Mengganti alert success dengan SweetAlert setelah create
        Swal.fire("Berhasil", "Pelatihan berhasil dibuat!", "success");
      }

      setState({
        id: null,
        title: "",
        image_kemendikbud_ristek: "",
        image_kemendikbud_ristekPreview: "",
        image_logo_nci: "",
        image_logo_nciPreview: "",
        image_logo_mitra: "",
        image_logo_mitraPreview: "",
        deskripsi: "",
        persyaratan: [],
        image_spanduk_pelatihan: "",
        image_spanduk_pelatihanPreview: "",
        duration: "",
        location: "",
        biaya: "",
        url_daftar: "",
        output: "",
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

  const handleAddPersyaratan = () => {
    setState((prevState) => ({
      ...prevState,
      persyaratan: [...prevState.persyaratan, ""],
    }));
  };

  const handleRemovePersyaratan = (index) => {
    const newPersyaratan = state.persyaratan.filter((_, i) => i !== index);
    setState((prevState) => ({
      ...prevState,
      persyaratan: newPersyaratan,
    }));
  };

  const handlePersyaratanChange = (e, index) => {
    const newPersyaratan = [...state.persyaratan];
    newPersyaratan[index] = e.target.value;
    setState({ ...state, persyaratan: newPersyaratan });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const filePreview = file ? URL.createObjectURL(file) : null;
  
    setState((prevState) => ({
      ...prevState,
      [`${name}`]: file || null,  // Set the image file
      [`${name}Preview`]: filePreview || prevState[`${name}Preview`]  // Set the preview
    }));
  };
  
  const handleEdit = (pelatihan) => {
    let parsedPersyaratan;
  
    // Check if persyaratan is a string or an array
    if (typeof pelatihan.persyaratan === "string") {
      try {
        // Attempt to parse as JSON first
        parsedPersyaratan = JSON.parse(pelatihan.persyaratan);
      } catch (e) {
        // If JSON parsing fails, try to split by commas
        parsedPersyaratan = pelatihan.persyaratan.split(",").map(item => item.trim());
      }
    } else if (Array.isArray(pelatihan.persyaratan)) {
      // If it's already an array, use it directly
      parsedPersyaratan = pelatihan.persyaratan;
    } else {
      // Fallback to an empty array if persyaratan is not defined or has an unexpected type
      parsedPersyaratan = [];
    }
  
    setState({
      id: pelatihan.id,
      title: pelatihan.title,
      image_kemendikbud_ristek: pelatihan.image_kemendikbud_ristek,
      image_kemendikbud_ristekPreview: pelatihan.image_kemendikbud_ristek,
      image_logo_nci: pelatihan.image_logo_nci,
      image_logo_nciPreview: pelatihan.image_logo_nci,
      image_logo_mitra: pelatihan.image_logo_mitra,
      image_logo_mitraPreview: pelatihan.image_logo_mitra,
      deskripsi: pelatihan.deskripsi,
      persyaratan: parsedPersyaratan, // This will now always be an array
      image_spanduk_pelatihan: pelatihan.image_spanduk_pelatihan,
      image_spanduk_pelatihanPreview: pelatihan.image_spanduk_pelatihan,
      duration: pelatihan.duration,
      location: pelatihan.location,
      biaya: pelatihan.biaya,
      url_daftar: pelatihan.url_daftar,
      output: pelatihan.output,
      date: pelatihan.date == null ? pelatihan.created_at : pelatihan.date,
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
          await dispatch(deletePelatihan(id));
          // Mengganti alert success dengan SweetAlert setelah delete
          Swal.fire("Berhasil", "Berita berhasil dihapus!", "success");
        } finally {
          setIsLoading(false);
        }
      }
    });
  };
 
  const inputPelatihan = () => {
    return (
      <Container
        style={{ maxWidth: "1440px", margin: "0 auto", padding: "20px" }}
      >
        <Card className="p-4 shadow-sm" style={{ borderRadius: "10px" }}>
          <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
            {state.error && <Alert variant="danger">{state.error}</Alert>}

            {/* Title Field */}
            <Form.Group className="py-2" controlId="formJudul">
              <Form.Label>Judul Pelatihan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan judul pelatihan"
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">
                Judul tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Image KemendikbudRistek Section */}
            <Form.Group className="py-4" controlId="formImage">
              <Form.Label>Gambar Kemendikbud Ristek</Form.Label>
              <Form.Control
                type="file"
                name="image_kemendikbud_ristek"
                onChange={handleImageChange}
                ref={inputFileRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Gambar tidak boleh kosong.
              </Form.Control.Feedback>
              {state.image_kemendikbud_ristekPreview && (
                <div
                  className="mt-3"
                  style={{ maxWidth: "200px", overflow: "hidden" }}
                >
                  <img
                    src={state.image_kemendikbud_ristekPreview}
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

            {/* Image Logo NCI Section */}
            <Form.Group className="py-4" controlId="formImage">
              <Form.Label>Gambar Logo NCI</Form.Label>
              <Form.Control
                type="file"
                name="image_logo_nci"
                onChange={handleImageChange}
                ref={inputFileRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Gambar tidak boleh kosong.
              </Form.Control.Feedback>
              {state.image_logo_nciPreview && (
                <div
                  className="mt-3"
                  style={{ maxWidth: "200px", overflow: "hidden" }}
                >
                  <img
                    src={state.image_logo_nciPreview}
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

            {/* Image Logo Mitra Section */}
            <Form.Group className="py-4" controlId="formImage">
              <Form.Label>Gambar Logo Mitra</Form.Label>
              <Form.Control
                type="file"
                name="image_logo_mitra"
                onChange={handleImageChange}
                ref={inputFileRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Gambar tidak boleh kosong.
              </Form.Control.Feedback>
              {state.image_logo_mitraPreview && (
                <div
                  className="mt-3"
                  style={{ maxWidth: "200px", overflow: "hidden" }}
                >
                  <img
                    src={state.image_logo_mitraPreview}
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

            {/* Deskripsi Field */}
            <Form.Group className="py-2" controlId="formDeskripsi">
              <Form.Label>Deskripsi Pelatihan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan deskripsi pelatihan"
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

            {/* Persyaratan Section */}
            <Form.Group className="py-2" controlId="formPersyaratan">
              <Form.Label>Persyaratan</Form.Label>
              {state.persyaratan.length === 0 && (
                <div className="mb-1" style={{ marginBottom: "0.5rem" }}></div>
              )}
              {Array.isArray(state.persyaratan) &&
                state.persyaratan.map((persyaratan, index) => (
                  <div key={index} className="d-flex mb-2">
                    <Form.Control
                      type="text"
                      placeholder={`Persyaratan ${index + 1}`}
                      value={persyaratan}
                      onChange={(e) => handlePersyaratanChange(e, index)}
                      required
                    />
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleRemovePersyaratan(index)}
                    >
                      Hapus
                    </Button>
                  </div>
                ))}
              <div className="my-2">
                <Button variant="primary" onClick={handleAddPersyaratan}>
                  Tambah Persyaratan
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                Persyaratan tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Spanduk Section */}
            <Form.Group className="py-4" controlId="formImage">
              <Form.Label>Gambar Spanduk</Form.Label>
              <Form.Control
                type="file"
                name="image_spanduk_pelatihan"
                onChange={handleImageChange}
                ref={inputFileRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Gambar tidak boleh kosong.
              </Form.Control.Feedback>
              {state.image_spanduk_pelatihanPreview && (
                <div
                  className="mt-3"
                  style={{ maxWidth: "200px", overflow: "hidden" }}
                >
                  <img
                    src={state.image_spanduk_pelatihanPreview}
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

            {/* Durasi Field */}
            <Form.Group className="py-4" controlId="formDurasi">
              <Form.Label>Durasi Pelatihan</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Masukkan durasi"
                  value={state.duration}
                  onChange={(e) =>
                    setState({ ...state, duration: e.target.value })
                  }
                  required
                />
                <InputGroup.Text>Hari</InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Durasi tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Lokasi Field */}
            <Form.Group className="py-2" controlId="formJudul">
              <Form.Label>Lokasi Pelatihan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan lokasi pelatihan"
                value={state.location}
                onChange={(e) =>
                  setState({ ...state, location: e.target.value })
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                Lokasi tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Biaya Field */}
            <Form.Group className="py-2" controlId="formJudul">
              <Form.Label>Biaya Pelatihan</Form.Label>
              <InputGroup>
                <InputGroup.Text>Rp. </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Masukkan biaya pelatihan"
                  value={state.biaya}
                  onChange={(e) =>
                    setState({ ...state, biaya: e.target.value })
                  }
                  required
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Biaya tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Link Form Pendaftaran Field */}
            <Form.Group className="py-2" controlId="formJudul">
              <Form.Label>Link Form Pendaftaran Pelatihan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan link form pendaftaran pelatihan"
                value={state.url_daftar}
                onChange={(e) =>
                  setState({ ...state, url_daftar: e.target.value })
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                Link form pendaftaran pelatihan tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Output Field */}
            <Form.Group className="py-2" controlId="formJudul">
              <Form.Label>Output Pelatihan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan output pelatihan"
                value={state.output}
                onChange={(e) => setState({ ...state, output: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">
                Output pelatihan tidak boleh kosong.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="py-4" controlId="formTanggal">
              <Form.Label>Tanggal Dibuat</Form.Label>
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

  const filteredPelatihan = Array.isArray(pelatihan)
  ? pelatihan.filter(
      (pelatihan) =>
        pelatihan.title &&
        pelatihan.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  : [];

  const renderTable = () => {
    return (
      <Container
        className="mt-5"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Daftar Pelatihan
        </h4>
        <Row className="mb-3">
          <Col lg="auto" className="d-flex justify-content-end">
            <div style={{ maxWidth: "500px", width: "100%" }}>
              <InputGroup>
                <FormControl
                  placeholder="Cari judul pelatihan..."
                  aria-label="Cari judul pelatihan"
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
                {filteredPelatihan.length > 0 ? (
                  filteredPelatihan.map((pelatihan, index) => (
                    <tr key={pelatihan.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={pelatihan.image_spanduk_pelatihan}
                          alt={pelatihan.title}
                          style={{ width: "100px", borderRadius: "8px" }}
                        />
                      </td>
                      <td>{pelatihan.title}</td>
                      <td> {pelatihan.date == null
                          ? formatDate(pelatihan.created_at)
                          : formatDate(pelatihan.date)}</td>
                      <td>{pelatihan.deskripsi}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleEdit(pelatihan)}
                        >
                          <MdEdit size={20} />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(pelatihan.id)}
                        >
                          <MdDelete size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Tidak ada pelatihan yang ditemukan
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
    {inputPelatihan()}
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

export default PelatihanPage;
