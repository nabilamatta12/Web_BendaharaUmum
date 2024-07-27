import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Dashboard components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const Sumbangan = () => {
  const [rows, setRows] = useState([
    { no: '1', tanggal: '2024-07-01', nama: 'Nabila', angkatan: '2020', notaImage: null, harga: 'Rp100.000', jumlah: 'Rp100.000' },
    { no: '2', tanggal: '2024-07-02', nama: 'Misba', angkatan: '2021', notaImage: null, harga: 'Rp150.000', jumlah: 'Rp150.000' },
    { no: '3', tanggal: '2024-07-03', nama: 'Anaa', angkatan: '2022', notaImage: null, harga: 'Rp200.000', jumlah: 'Rp200.000' },
    { no: '4', tanggal: '2024-07-03', nama: 'Arini', angkatan: '2022', notaImage: null, harga: 'Rp200.000', jumlah: 'Rp200.000' },
    { no: '5', tanggal: '2024-07-03', nama: 'Arini', angkatan: '2022', notaImage: null, harga: 'Rp200.000', jumlah: 'Rp200.000' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    no: '',
    tanggal: '',
    nama: '',
    angkatan: '',
    nota: '',
    harga: '',
    jumlah: ''
  });
  const [notaImage, setNotaImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setNotaImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleAddRow = () => {
    const newRow = { ...formData, notaImage };

    if (editIndex !== null) {
      // Update the existing row
      const updatedRows = [...rows];
      updatedRows[editIndex] = newRow;
      setRows(updatedRows);
      setEditIndex(null);
    } else {
      // Add a new row
      setRows([...rows, newRow]);
    }
    // Clear form data and hide modal
    setFormData({ no: '', tanggal: '', nama: '', angkatan: '', nota: '', harga: '', jumlah: '' });
    setNotaImage(null);
    setShowModal(false);
  };

  const handleEditRow = (index) => {
    setEditIndex(index);
    setFormData(rows[index]);
    setNotaImage(rows[index].notaImage);
    setShowModal(true);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((row, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container mt-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>Tambah Data</Button>
        <Table striped bordered hover className="mt-4" style={{ fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Nama</th>
              <th>Angkatan</th>
              <th>Nota</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.no}</td>
                <td>{row.tanggal}</td>
                <td>{row.nama}</td>
                <td>{row.angkatan}</td>
                <td>
                  {row.notaImage ? (
                    <img src={row.notaImage} alt="Nota" style={{ width: '50px', height: '50px' }} />
                  ) : 'No Image'}
                </td>
                <td>{row.harga}</td>
                <td>{row.jumlah}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditRow(index)}><FaEdit /></Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteRow(index)}><FaTrash /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)} style={{ fontSize: '0.9rem', zIndex: 999999 }}>
          <Modal.Header closeButton>
            <Modal.Title>{editIndex !== null ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNo">
                <Form.Label>No</Form.Label>
                <Form.Control
                  type="text"
                  name="no"
                  value={formData.no}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formTanggal">
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formAngkatan">
                <Form.Label>Angkatan</Form.Label>
                <Form.Control
                  type="text"
                  name="angkatan"
                  value={formData.angkatan}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formNotaImage">
                <Form.Label>Nota Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Form.Group controlId="formHarga">
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="text"
                  name="harga"
                  value={formData.harga}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formJumlah">
                <Form.Label>Jumlah</Form.Label>
                <Form.Control
                  type="text"
                  name="jumlah"
                  value={formData.jumlah}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleAddRow}>{editIndex !== null ? 'Simpan' : 'Tambah'}</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Sumbangan;
