import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Dashboard components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const Pengeluaran = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
        if (!token) {
          navigate('/authentication/sign-in');
          return;
        }

        const response = await fetch(`${localStorage.getItem('api-endpoint')}/pengeluaran/all`, {
          method: 'GET', // atau 'POST' tergantung kebutuhan
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Tambahkan header Authorization
          },
        })
        const result = await response.json();

        console.log("result pengeluaran", result)

        setRows(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    no: '',
    date: '',
    notaImage: null,
    nilai: '',
    keterangan: '',
  });
  const [notaImage, setNotaImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      notaImage: e.target.files[0], // Ambil file pertama yang dipilih
    });
  };

  const handleAddRow = async () => {
    let currentNota = "";
    let url = "";
    const newFormData = new FormData();
    if (formData.No != undefined){
      newFormData.append('no', formData.No);
      url = `${localStorage.getItem('authToken')}/pengeluaran/update`;
    } else {
      if (!formData.notaImage){
        alert("Harap mengisi image");
        return
      }
      url = `${localStorage.getItem('authToken')}/pengeluaran/add`;
    }

    console.log("url", url)
    if (formData.tanggal == ""){
      alert("Harap mengisi tanggal");
      return
    }

    if (formData.nilai == ""){
      alert("Harap mengisi nilai");
      return
    }

    if (formData.keterangan == ""){
      alert("Harap mengisi keterangan");
      return
    }
    newFormData.append('tanggal', formData.date);
    try{
      currentNota = rows[formData.No-1].nota;
    } catch {
      currentNota = "";
    }
    newFormData.append('nota', formData.notaImage ? formData.notaImage.name : currentNota);
    newFormData.append('nilai', formData.nilai);
    newFormData.append('keterangan', formData.keterangan);
    newFormData.append('notaImage', formData.notaImage ? formData.notaImage : "");
    console.log("NewFormData: ", newFormData);
    // console.log(rows[formData.No-1].nota)

  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: newFormData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
  
      const result = await response.json();
      console.log('Data sent successfully:', result);
      setShowModal(false); // Tutup modal setelah berhasil
      
      // Tambahkan logika untuk memperbarui data di UI jika diperlukan
    } catch (error) {
      console.error('Error sending data:', error);
      return 
    }
    resetModal();
  };
  

  const handleEditRow = (index) => {
    setEditIndex(index);
    setFormData(rows[index]);
    setNotaImage(rows[index].nota);
    setShowModal(true);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((row, i) => i !== index);
    setRows(updatedRows);
  };

  const resetModal = () => {
    setFormData({    
      no: '',
      date: '',
      notaImage: null,
      nilai: '',
      keterangan: '',})
    setShowModal(false)
  }

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
              <th>Nota</th>
              <th>Jumlah</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.No}</td>
                <td>{row.date}</td>
                <td>
                  {row.nota ? (
                    <img src={`${localStorage.getItem('authToken')}/image/pengeluaran/`+row.nota} alt="Nota" style={{ width: '50px', height: '50px' }} />
                  ) : 'No Image'}
                </td>
                <td>Rp {row.nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                <td>{row.keterangan}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditRow(index)}><FaEdit /></Button>{' '}
                  {/* <Button variant="danger" size="sm" onClick={() => handleDeleteRow(index)}><FaTrash /></Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => resetModal()} style={{ fontSize: '0.9rem', zIndex: 999999 }}>
          <Modal.Header closeButton>
            <Modal.Title>{editIndex !== null ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNo" className='d-none'>
                <Form.Label>No</Form.Label>
                <Form.Control
                  type="text"
                  name="no"
                  value={formData.No}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formTanggal">
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
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
                <Form.Label>Nilai</Form.Label>
                <Form.Control
                  type="text"
                  name="nilai"
                  value={formData.nilai}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formJumlah">
                <Form.Label>Keterangan</Form.Label>
                <Form.Control
                  type="text"
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => resetModal()}>Batal</Button>
            <Button variant="primary" onClick={handleAddRow}>{editIndex !== null ? 'Simpan' : 'Tambah'}</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Pengeluaran;
