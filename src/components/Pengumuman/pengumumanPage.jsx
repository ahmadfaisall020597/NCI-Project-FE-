import { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Stack, Table, Card, InputGroup, FormControl, Row, Col, Spinner } from 'react-bootstrap';
import dayjs from 'dayjs';
import { updatePengumuman, createPengumuman, fetchPengumuman, deletePengumuman } from './pengumumanSlice';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { id } from 'date-fns/locale';
import Swal from "sweetalert2"; // Import Swal
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
    const [isLoading, setIsLoading] = useState(false); // State for loading
    const [successMessage, setSuccessMessage] = useState(""); // State for success popup
    useEffect(() => {
        dispatch(fetchPengumuman(currentPage, debouncedQuery));
    }, [dispatch, currentPage, debouncedQuery]);

    useEffect(() => {
    }, [pengumuman]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const handleSubmit = async(e) => {
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

        if (state.id) {
             await dispatch(updatePengumuman(state.id, pengumumanData));
            // Mengganti alert success dengan SweetAlert setelah update
            Swal.fire("Berhasil", "Pengumuman berhasil diupdate!", "success");
        } else {
            await dispatch(createPengumuman(pengumumanData));
            Swal.fire("Berhasil", "Pengumuman berhasil dibuat", "success");
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
        dispatch(fetchPengumuman(selectedPage.selected + 1));
    };

    const handleEdit = (pengumuman) => {
        setState({
            id: pengumuman.id,
            deskripsi: pengumuman.deskripsi,
            date: pengumuman.date == null ? pengumuman.created_at : pengumuman.date,
            validated: false,
            error: "",
        });
    };

    const handleDelete = async (id) => {
        // SweetAlert untuk konfirmasi penghapusan berita
        Swal.fire({
          title: "Apakah Anda yakin?",
          text: "Pengumuman akan dihapus secara permanen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
        }).then(async (result) => {
          if (result.isConfirmed) {
            setIsLoading(true);
            try {
              await dispatch(deletePengumuman(id));
              // Mengganti alert success dengan SweetAlert setelah delete
              Swal.fire("Berhasil", "Pengumuman berhasil dihapus!", "success");
            } finally {
              setIsLoading(false);
            }
          }
        });
      };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "dd MMMM yyyy HH:mm", { locale: id });
    };

    const formattedDate = state.date ? dayjs(state.date).format('YYYY-MM-DDTHH:mm') : '';

    const inputPengumuman = () => {
        return (
          <Container
            style={{ maxWidth: "1440px", margin: "0 auto", padding: "20px" }}
          >
            <Card className="p-4 shadow-sm" style={{ borderRadius: "10px" }}>
              <Form
                noValidate
                validated={state.validated}
                onSubmit={handleSubmit}
              >
                {state.error && <Alert variant="danger">{state.error}</Alert>}
                <Form.Group className="py-2" controlId="formDeskripsi">
                  <Form.Label>Deskripsi Pengumuman</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan deskripsi pengumuman"
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

                <Form.Group className="py-4" controlId="formTanggal">
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

    const filteredPengumuman = pengumuman.filter(pengumuman =>
        pengumuman.deskripsi.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const renderTable = () => (
      <Container
        className="mt-5"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Daftar Pengumuman
        </h4>
        <Row className="mb-3">
          <Col lg="auto" className="d-flex justify-content-end">
            <div style={{ maxWidth: "500px", width: "100%" }}>
              <InputGroup>
                <FormControl
                  placeholder="Cari judul pengumuman..."
                  aria-label="Cari judul pengumuman"
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
                      <td>
                        {pengumuman.date == null
                          ? formatDate(pengumuman.created_at)
                          : formatDate(pengumuman.date)}
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
                          onClick={() => handleEdit(pengumuman)}
                        >
                          <MdEdit size={20} />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(pengumuman.id)}
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
            {inputPengumuman()}
            {renderTable()}
        </Stack>
    );
}

export default PengumumanPage;
