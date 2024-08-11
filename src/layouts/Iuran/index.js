import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
// Dashboard components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const PemasukanAlgoCafe = () => {
  const [rows, setRows] = useState([
    { no: '1', nama: 'Nabila', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '2', nama: 'Muliana', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '3', nama: 'Misba', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '4', nama: 'Arini', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '5', nama: 'Diva', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '6', nama: 'Uky', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '7', nama: 'Ipul', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '8', nama: 'Darius', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '9', nama: 'Dzikri', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '10', nama: 'Dayat', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '11', nama: 'Farhan', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '12', nama: 'Ajia', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
    { no: '13', nama: 'Maman', minggu1: 'Rp.10.000', minggu2: 'Rp.10.000', minggu3: 'Rp.10.000', minggu4: 'Rp.10.000' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    no: '',
    nama: '',
    minggu1: '',
    minggu2: '',
    minggu3: '',
    minggu4: ''
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
    setFormData({ no: '', nama: '', minggu1: '', minggu2: '', minggu3: '', minggu4: '' });
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
        <SoftBox mb={3}>
        </SoftBox>
        <Table striped bordered hover className="mt-4" style={{ fontSize: '0.9rem' }}>
          <thead>
          <tr>
            <th colSpan="7" style={{ textAlign: 'center', fontSize: '1.2rem' }}>Januari 2024</th>
          </tr>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Minggu 1</th>
              <th>Minggu 2</th>
              <th>Minggu 3</th>
              <th>Minggu 4</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.no}</td>
                <td>{row.nama}</td>
                <td>{row.minggu1}</td>
                <td>{row.minggu2}</td>
                <td>{row.minggu3}</td>
                <td>{row.minggu4}</td>
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
              <Form.Group controlId="formMinggu1">
                <Form.Label>Minggu 1</Form.Label>
                <Form.Control
                  type="text"
                  name="minggu1"
                  value={formData.minggu1}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formMinggu2">
                <Form.Label>Minggu 2</Form.Label>
                <Form.Control
                  type="text"
                  name="minggu2"
                  value={formData.minggu2}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formMinggu3">
                <Form.Label>Minggu 3</Form.Label>
                <Form.Control
                  type="text"
                  name="minggu3"
                  value={formData.minggu3}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formMinggu4">
                <Form.Label>Minggu 4</Form.Label>
                <Form.Control
                  type="text"
                  name="minggu4"
                  value={formData.minggu4}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleAddRow}>{editIndex !== null ? 'Simpan Perubahan' : 'Tambah Data'}</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default PemasukanAlgoCafe;
