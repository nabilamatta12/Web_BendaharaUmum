import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Dashboard components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DefaultInfoCard from 'examples/Cards/InfoCards/DefaultInfoCard';
import Footer from 'examples/Footer';
import SoftBox from 'components/SoftBox';
import { Grid } from '@mui/material';

const PemasukanAlgoCafe = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [infoAlgo, setInfoAlgo] = useState({
    "total_masuk":"",
    "total_keluar":"",
    "total_sisa":"",
  })

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
        if (!token) {
          navigate('/authentication/sign-in');
          return;
        }
        const response = await fetch(`${localStorage.getItem('api-endpoint')}/algo/all`, {
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
    fetchData2();
  }, [navigate]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
        // if (!token) {
        //   navigate('/authentication/sign-in');
        //   return;
        // }

        const response = await fetch(`${localStorage.getItem('api-endpoint')}/info-algo`, {
          method: 'GET', // atau 'POST' tergantung kebutuhan
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Tambahkan header Authorization
          },
        })
        const result = await response.json();

        console.log("result Info algo", result)
        setInfoAlgo(result)
        // setRows(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();
  }, [navigate]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    tanggal: '',
    keterangan: '',
    harga: '',
    jumlah: '',
    status: '',
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
    if (formData.id != undefined){
      url = `${localStorage.getItem('authToken')}/algo/add`;
    } else {
      newFormData.append('id', formData.id);
      console.log("Id", formData.id)
      url = `${localStorage.getItem('authToken')}/algo/update`;
    }
    
    console.log("url", url)
    if (formData.tanggal == ""){
      alert("Harap mengisi tanggal");
      return
    }

    if (formData.keterangan == ""){
      alert("Harap mengisi keterangan");
      return
    }

    if (formData.harga == ""){
      alert("Harap mengisi harga");
      return
    }
    newFormData.append('tanggal', formData.tanggal);
    newFormData.append('keterangan', formData.keterangan);
    newFormData.append('harga', formData.harga);
    newFormData.append('jumlah', formData.jumlah);
    newFormData.append('status', formData.status);
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
      keterangan: '',
      status: '',
    })
    setShowModal(false)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} xl={4}>
        <DefaultInfoCard
          icon="account_balance"
          title="Total Pendapatan"
          description="Belong Interactive"
          value={"Rp "+infoAlgo.total_masuk.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        />
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
        <DefaultInfoCard
          icon="account_balance"
          title="Total Pengeluaran"
          description="Belong Interactive"
          value={"Rp "+(infoAlgo.total_keluar).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        />
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
        <DefaultInfoCard
          icon="account_balance"
          title="Sisa Cash"
          description="Belong Interactive"
          value={"Rp "+infoAlgo.total_sisa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}

        />
        </Grid>
      </Grid>
      </SoftBox>

      <div className="container mt-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>Tambah Data</Button>
        <Table striped bordered hover className="mt-4" style={{ fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Keterangan</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.tanggal}</td>
                <td>{row.keterangan}</td>
                <td>Rp {row.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                <td>{row.jumlah}</td>
                <td>Rp {(row.harga*row.jumlah).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                <td style={{ backgroundColor: row.status == "masuk" ? "#97bcf7" : "#F91B0F" }}>{row.status}</td>
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
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={formData.id}
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
                  name='keterangan'
                  value={formData.keterangan}
                  onChange={handleInputChange}
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
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={formData.status}
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

export default PemasukanAlgoCafe;
