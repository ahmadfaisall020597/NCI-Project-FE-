import { useEffect, useState, useRef } from "react";
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

const PelatihanPage = () => {
  const [state, setState] = useState({
    id: null,
    title: "",
    logoKemendikbudRistek: "",
    locoNCI: "",
    deskripsi: "",
    persyaratan: [],
    spanduk: "",
    spandukPreview: "",
    durasi: "",
    lokasi: "",
    biaya: "",
    linkFormPendaftaran: "",
    output: "",
    validated: false,
    error: "",
  });

  const inputFileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      validated: true,
    }));

    if (
      state.title === "" ||
      state.logoKemendikbudRistek === "" ||
      state.locoNCI === "" ||
      state.deskripsi === "" ||
      state.persyaratan.length === 0 ||
      state.spanduk === "" ||
      state.durasi === "" ||
      state.lokasi === "" ||
      state.biaya === "" ||
      state.linkFormPendaftaran === ""
    ) {
      setState((prevState) => ({
        ...prevState,
        error: "Semua field harus diisi",
      }));
      return;
    }

    const data = {
      title: state.title,
      logoKemendikbudRistek: state.logoKemendikbudRistek,
      locoNCI: state.locoNCI,
      deskripsi: state.deskripsi,
      persyaratan: state.persyaratan,
      spanduk: state.spanduk,
      spandukPreview: state.spandukPreview,
      durasi: state.durasi,
      lokasi: state.lokasi,
      biaya: state.biaya,
      linkFormPendaftaran: state.linkFormPendaftaran,
      output: state.output,
    };

    setIsLoading(true);
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
    const file = e.target.files[0];
    setState((prevState) => ({
      ...prevState,
      spanduk: file ? file : null,
      spandukPreview: file ? URL.createObjectURL(file) : state.spanduk,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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
              {state.persyaratan.map((persyaratan, index) => (
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
                onChange={handleImageChange}
                ref={inputFileRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Gambar tidak boleh kosong.
              </Form.Control.Feedback>
              {state.spandukPreview && (
                <div
                  className="mt-3"
                  style={{ maxWidth: "200px", overflow: "hidden" }}
                >
                  <img
                    src={state.spandukPreview}
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
                  type="number"
                  placeholder="Masukkan durasi"
                  value={state.durasi}
                  onChange={(e) =>
                    setState({ ...state, durasi: e.target.value })
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
                value={state.lokasi}
                onChange={(e) => setState({ ...state, lokasi: e.target.value })}
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
                value={state.linkFormPendaftaran}
                onChange={(e) =>
                  setState({ ...state, linkFormPendaftaran: e.target.value })
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

            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </Form>
        </Card>
      </Container>
    );
  };

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
        {/* {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : ( */}
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
              {/* <tbody>
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
              </tbody> */}
            </Table>
            {/* <Stack className="py-3">
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
            </Stack> */}
          </>
        {/* )} */}
      </Container>
    );
  };

  return (
    <Stack>
      {inputPelatihan()}
      {renderTable()}
    </Stack>
);
};

export default PelatihanPage;
