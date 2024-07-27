import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Dashboard components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const PemasukanAlgoCafe = () => {
  const [rows, setRows] = useState([
    { no: '1', tanggal: '2024-07-01', keterangan: 'Kopi Susu', harga: '12000', jumlah: '1' },
    { no: '2', tanggal: '2024-07-02', keterangan: 'Es Milo', harga: '15000', jumlah: '3' },
    { no: '3', tanggal: '2024-07-03', keterangan: 'Green Tea', harga: '15000', jumlah: '1' },
    { no: '4', tanggal: '2024-07-03', keterangan: 'Thai Tea', harga: '15000', jumlah: '1' },
    { no: '5', tanggal: '2024-07-03', keterangan: 'Es Batu', harga: '1000', jumlah: '1' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    no: '',
    tanggal: '',
    keterangan: '',
    harga: '',
    jumlah: ''
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
    setFormData({ no: '', tanggal: '', keterangan: '', harga: '', jumlah: '' });
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
        <Table striped bordered hover className="mt-4" style={{ fontSize: '0.9rem'}}>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Keterangan</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.no}</td>
                <td>{row.tanggal}</td>
                <td>{row.keterangan}</td>
                <td>{row.harga}</td>
                <td>{row.jumlah}</td>
                <td>{row.harga * row.jumlah}</td>
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
              <Form.Group controlId="formKeterangan">
                <Form.Label>Keterangan</Form.Label>
                <Form.Control
                  type="text"
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formHarga">
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formJumlah">
                <Form.Label>Jumlah</Form.Label>
                <Form.Control
                  type="number"
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

export default PemasukanAlgoCafe;
