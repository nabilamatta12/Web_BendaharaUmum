import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Dashboard components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const PemasukanAlgoCafe = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    no: '',
    nama: '',
    tahun: '',
    bulan: '',
    minggu: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRow = () => {
    if (editIndex !== null) {
      // Update the existing row
      const updatedRows = [...rows];
      updatedRows[editIndex] = formData;
      setRows(updatedRows);
      setEditIndex(null);
    } else {
      // Add a new row
      setRows([...rows, formData]);
    }
    // Clear form data and hide modal
    setFormData({ no: '', nama: '', tahun: '', bulan: '', minggu: '' });
    setShowModal(false);
  };

  const handleEditRow = (index) => {
    setEditIndex(index);
    setFormData(rows[index]);
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
              <th>Nama</th>
              <th>Tahun</th>
              <th>Bulan</th>
              <th>Minggu</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.no}</td>
                <td>{row.nama}</td>
                <td>{row.tahun}</td>
                <td>{row.bulan}</td>
                <td>{row.minggu}</td>
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
              <Form.Group controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formTahun">
                <Form.Label>Tahun</Form.Label>
                <Form.Control
                  type="text"
                  name="tahun"
                  value={formData.tahun}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBulan">
                <Form.Label>Bulan</Form.Label>
                <Form.Control
                  as="select"
                  name="bulan"
                  value={formData.bulan}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Bulan</option>
                  <option value="Januari">Januari</option>
                  <option value="Februari">Februari</option>
                  <option value="Maret">Maret</option>
                  <option value="April">April</option>
                  <option value="Mei">Mei</option>
                  <option value="Juni">Juni</option>
                  <option value="Juli">Juli</option>
                  <option value="Agustus">Agustus</option>
                  <option value="September">September</option>
                  <option value="Oktober">Oktober</option>
                  <option value="November">November</option>
                  <option value="Desember">Desember</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formMinggu">
                <Form.Label>Minggu</Form.Label>
                <Form.Control
                  as="select"
                  name="minggu"
                  value={formData.minggu}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Minggu</option>
                  <option value="Minggu 1">Minggu 1</option>
                  <option value="Minggu 2">Minggu 2</option>
                  <option value="Minggu 3">Minggu 3</option>
                  <option value="Minggu 4">Minggu 4</option>
                </Form.Control>
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

export default PemasukanAlgoCafe;
