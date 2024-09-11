import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';

import PropTypes from 'prop-types';

const TableSumbangan = ({ rows, handleEditRow }) => {
  return (
    <Table striped bordered hover className="mt-4" style={{ fontSize: '0.9rem' }}>
      <thead>
        <tr>
          <th>No</th>
          <th>Tanggal</th>
          <th>Nama</th>
          <th>Angkatan</th>
          <th>Nota</th>
          <th>Jumlah</th>
          <th>Keterangan</th>
          {handleEditRow ? (
          <th>Aksi</th>) : null}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.No}</td>
            <td>{row.tanggal}</td>
            <td>{row.nama}</td>
            <td>{row.angkatan}</td>
            <td>
              {row.nota ? (
                <img src={"https://9e39-182-1-212-104.ngrok-free.app/image/sumbangan/" + row.nota} alt="Nota" style={{ width: '50px', height: '50px' }} />
              ) : 'No Image'}
            </td>
            <td>Rp {row.nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
            <td>{row.keterangan}</td>
            {handleEditRow ? (
              <td>
              <Button variant="warning" size="sm" onClick={() => handleEditRow(index)}>
                <FaEdit />
              </Button>
              </td>
            ) : null}
            </tr>
        ))}
      </tbody>
    </Table>
  );
};

TableSumbangan.propTypes = {
  rows: PropTypes.objectOf(
    PropTypes.shape({
      No: PropTypes.number.isRequired,
      tanggal: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      angkatan: PropTypes.string.isRequired,
      nota: PropTypes.string,
      nilai: PropTypes.string.isRequired,
      keterangan: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleEditRow: PropTypes.func.isRequired,
};

export default TableSumbangan;
