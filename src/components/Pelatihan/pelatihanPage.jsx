import { useState, useRef } from "react";
import {
  Container,
  Card,
  Form,
  Alert,
  Button,
  InputGroup,
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

  return inputPelatihan();
};

export default PelatihanPage;
