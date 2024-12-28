import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import Grid from "@mui/material/Grid";

import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
// Dashboard components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const PemasukanAlgoCafe = () => {
  const [rows, setRows] = useState({});
  const [bphInfo, setBphInfo] = useState({})

  const navigate = useNavigate();

  const buatTable = () => {
    
    // useEffect(() => {
      const fetchData = async () => {
      const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
      if (!token) {
        navigate('/authentication/sign-in');
        return;
      }
      const response = await fetch(`${localStorage.getItem('api-endpoint')}/api/iuran/addtable`,{

        method: 'POST',
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`,
        }
        })
        try{
        const result = await response.json();
        console.log("Result iuran", result)
        } catch {
          console.log("ERR fetch");
        }
      }
      fetchData();
    // },[navigate])
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
        if (!token) {
          navigate('/authentication/sign-in');
          return;
        }

        const headers = {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        }

        const [response1, response2] = await Promise.all([
          
        fetch(`${localStorage.getItem('api-endpoint')}/api/iuran/all`, {
          method: 'GET', // atau 'POST' tergantung kebutuhan
          headers: headers,
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer ${token}`, // Tambahkan header Authorization
          // },
        }),
        fetch(`${localStorage.getItem('api-endpoint')}/api/iuran/bph`, {
          method: 'GET',
          headers: headers,
        })
        ])


        // const response = await fetch('https://1887-114-10-134-219.ngrok-free.app/iuran/all'); // Ganti dengan URL API Anda
        const result = await response1.json();
        const result2 = await response2.json();

        if (!response1.ok || !response2.ok) {
          alert(result.error)
            navigate('/authentication/logout');
            return;
        }

        const formattedData = {};
        console.log("result", result)
        console.log("result2", result2)
        setBphInfo(result2)

        result.forEach((item, index) => {
          
          const bulan = item.bulan; // Mengubah nama bulan menjadi lowercase
          // console.log("item",item.bulan, index);
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
        // console.log("row", rows)
        // console.log("Daftar Bulan:", Object.keys(rows));
        // Object.keys(rows).map((bulan) => (
        //   console.log(bulan, rows[bulan])
        // ))

        setRows(formattedData);
        console.log("Bph info",bphInfo);

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

      const response = await fetch(`${localStorage.getItem('api-endpoint')}/api/iuran/update`, {
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

    const [isTableVisible, setIsTableVisible] = useState("Semua");
  
    const handleSelect = (selectedBulan) => {
      console.log(`Selected value: ${selectedBulan}`);
      setIsTableVisible(selectedBulan);
    };

    const [tableBphvisible, setTableBphVisible] = useState(false)

    const handleTableBph = () => {
      setTableBphVisible(!tableBphvisible);
    }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container mt-4">
        <Grid container spacing={1}>
          <Grid item xs={3} md={2} xl={1.7}>
            {/* <SoftBox mb={3}> */}
              <Button variant="primary" onClick={() => buatTable()}>Tambah Data</Button>
            {/* </SoftBox> */}
          </Grid>
          <Grid item xs={3} md={2} xl={1.3}>
            {/* <SoftBox mb={3}> */}
              <Button variant="primary" onClick={() => handleTableBph()}>Table Bph</Button>
            {/* </SoftBox> */}
          </Grid>
          <Grid item xs={3} md={2} xl={1}>
            {/* <SoftBox mb={3}> */}
              <DropdownButton
                id="dropdown-basic-button"
                title={isTableVisible} 
                onSelect={handleSelect} // Handle the selected value
              >
                <Dropdown.Item key={0} eventKey="Semua">Semua</Dropdown.Item>

              {Object.keys(rows).map((bulan, index) => (
                <Dropdown.Item key={index+1} eventKey={bulan}>{bulan}</Dropdown.Item>
              ))
              }
              </DropdownButton>
            {/* </SoftBox> */}
          </Grid> 
        </Grid>

        <Table striped bordered hover className="mt-4" style={{display: tableBphvisible ? 'table' : 'none'}}>
        <thead>
          <tr>
            <th style={{ fontSize: '15px' }}>No</th>
            <th style={{ fontSize: '15px' }}>Nama</th>
            <th style={{ fontSize: '15px' }}>Belum Terbayar</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bphInfo) && bphInfo.length > 0 ? (
            bphInfo.map((row, index) => (
              <tr key={index + 1}>
                <td style={{ fontSize: '13px' }}>{index + 1}</td>
                <td style={{ fontSize: '13px' }}>{row.nama}</td>
                <td style={{ fontSize: '13px' }}>Rp. {(row.total * 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>


        {Object.keys(rows).map((bulan, index) => (
  <Table key={index} striped bordered hover className="mt-4" style={{ 
    display: isTableVisible == bulan || isTableVisible == "Semua" ? 'table' : 'none', 
    fontSize: '0.9rem' 
  }}>
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
        <td style={{color: row.minggu1 ? '#2152ff' : '#ea0606'}}>Rp.{row.minggu1}</td>
        <td style={{color: row.minggu2 ? '#2152ff' : '#ea0606'}}>Rp.{row.minggu2}</td>
        <td style={{color: row.minggu3 ? '#2152ff' : '#ea0606'}}>Rp.{row.minggu3}</td>
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
                  as="select"
                  name="minggu1"
                  value={formData.minggu1}
                  onChange={handleInputChange}
                >
                  <option value={0}>0</option>
                  <option value={10000}>10000</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formMinggu2">
                <Form.Label>Minggu 2</Form.Label>
                <Form.Control
                  as="select"
                  name="minggu2"
                  value={formData.minggu2}
                  onChange={handleInputChange}
                >
                  <option value={0}>0</option>
                  <option value={10000}>10000</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formMinggu3">
                <Form.Label>Minggu 3</Form.Label>
                <Form.Control
                  as="select"
                  name="minggu3"
                  value={formData.minggu3}
                  onChange={handleInputChange}
                >
                  <option value={0}>0</option>
                  <option value={10000}>10000</option>
                </Form.Control>
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
