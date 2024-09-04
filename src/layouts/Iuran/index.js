import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
// Dashboard components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const PemasukanAlgoCafe = () => {
  const [rows, setRows] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
        if (!token) {
          navigate('/authentication/sign-in');
          return;
        }

        const response = await fetch('https://e75b-140-213-1-165.ngrok-free.app/api/iuran/all', {
          method: 'GET', // atau 'POST' tergantung kebutuhan
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Tambahkan header Authorization
          },
        })
        // const response = await fetch('https://1887-114-10-134-219.ngrok-free.app/iuran/all'); // Ganti dengan URL API Anda
        const result = await response.json();

        const formattedData = {};
        console.log("result", result)

        result.forEach((item, index) => {
          const bulan = item.bulan.toLowerCase(); // Mengubah nama bulan menjadi lowercase
          console.log("item",item.bulan.toLowerCase());
          if (!formattedData[bulan]) {
            formattedData[bulan] = [];
          }

          formattedData[bulan].push({
            bulan: bulan,
            no: item.no,
            nama: item.nama,
            minggu1: item.minggu1.Int16,
            minggu2: item.minggu2.Int16,
            minggu3: item.minggu3.Int16,
          });
        });
        console.log("row", rows)
        Object.keys(rows).map((bulan) => (
          console.log(bulan, rows[bulan])
        ))

        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);
  const token = localStorage.getItem('authToken');
console.log(token); // Ini akan menampilkan nilai token yang disimpan


  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    bulan: '',
    no: '',
    nama: '',
    minggu1: '',
    minggu2: '',
    minggu3: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRow = (bulan) => {
    if (editIndex !== null) {
      console.log("edit index:", editIndex);
      // Update the existing row
      const updatedRows = {...rows};
      updatedRows[bulan][editIndex] = formData;
      // updatedRows[bulan] = [...updatedRows[bulan], formData];
      setRows(updatedRows);
      setEditIndex(null);
      handleSaveChanges();
    } else {
      // Add a new row
      // setRows([...rows, formData]);
    }
    // Clear form data and hide modal
    setFormData({ bulan: '', no: '', nama: '', minggu1: '', minggu2: '', minggu3: '' });
    setShowModal(false);
  };

  const handleEditRow = (bulan,index) => {
    setEditIndex(index);
    setFormData(rows[bulan][index]);
    setShowModal(true);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((row, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSaveChanges = async () => {
    const updatedFormData = {
      ...formData,
      minggu1: parseInt(formData.minggu1),
      minggu2: parseInt(formData.minggu2),
      minggu3: parseInt(formData.minggu3),
    };
    console.log("parse int",updatedFormData);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/authentication/sign-in');
        return;
      }

      const response = await fetch(`https://e75b-140-213-1-165.ngrok-free.app/api/iuran/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        console.log("Update logs:", JSON.stringify(updatedFormData))
        throw new Error('Failed to update data');
      }

      const updatedData = await response.json();
      console.log('Data updated successfully:', updatedData);
      setShowModal(false);
      // Update state or refetch data here
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container mt-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>Tambah Data</Button>
        <SoftBox mb={3}>
        
        </SoftBox>
        {Object.keys(rows).map((bulan, index) => (
  <Table key={index} striped bordered hover className="mt-4" style={{ fontSize: '0.9rem' }}>
    <thead>
      <tr>
        <th colSpan="7" style={{ textAlign: 'center', fontSize: '1.2rem' }}>{bulan} 2024</th>
      </tr>
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Minggu 1</th>
        <th>Minggu 2</th>
        <th>Minggu 3</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      {rows[bulan].map((row, index) => (
        <tr key={bulan+index}>
        <td>{index+1}</td>
        <td>{row.nama}</td>
        <td>Rp.{row.minggu1}</td>
        <td>Rp.{row.minggu2}</td>
        <td>Rp.{row.minggu3}</td>
        <td>
          <Button variant="warning" size="sm" onClick={() => handleEditRow(bulan,index)}><FaEdit /></Button>{' '}
          {/* <Button variant="danger" size="sm" onClick={() => handleDeleteRow(index)}><FaTrash /></Button> */}
        </td>
      </tr>
      ))}
    </tbody>
  </Table>
))}

        <Modal show={showModal} onHide={() => setShowModal(false)} style={{ fontSize: '0.9rem', zIndex: 999999 }}>
          <Modal.Header closeButton>
            <Modal.Title>{editIndex !== null ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group controlId="formMinggu4">
                <Form.Label>Minggu 4</Form.Label>
                <Form.Control
                  type="text"
                  name="minggu4"
                  value={formData.bulan}
                  onChange={handleInputChange}
                />
              </Form.Group>
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
          
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={() => handleAddRow(formData.bulan)}>{editIndex !== null ? 'Simpan Perubahan' : 'Tambah Data'}</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default PemasukanAlgoCafe;
