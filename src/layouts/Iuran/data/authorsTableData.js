/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

function Author({ name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography> 
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "NO", align: "center" },
    { name: "Nama", align: "left" },
    { name: "Tahun", align: "left" },
    { name: "Bulan", align: "left" },
    { name: "Minggu1", align: "left" },
    { name: "Minggu2", align: "center" },
    { name: "Minggu3", align: "center" },
    { name: "Minggu4", align: "center" },
    // { name: "action", align: "center" },
  ],

  rows: [
    {
      NO: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01
        </SoftTypography>
      ),
      Nama: <Author name="Darius" email="12.23.009" />,
      Tahun:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          2023
        </SoftTypography>
      ),
      Bulan:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Januari
        </SoftTypography>
      ),
      Minggu1: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu2: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu3: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu4: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      
    },
    {
      NO: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01
        </SoftTypography>
      ),
      Nama: <Author name="Mamang" email="12.23.009" />,
      Tahun:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          2023
        </SoftTypography>
      ),
      Bulan:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Januari
        </SoftTypography>
      ),
      Minggu1: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu2: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu3: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu4: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      
    },
    {
      NO: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01
        </SoftTypography>
      ),
      Nama: <Author name="Bilaa" email="12.23.009" />,
      Tahun:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          2023
        </SoftTypography>
      ),
      Bulan:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Januari
        </SoftTypography>
      ),
      Minggu1: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu2: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu3: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu4: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      
    },
    {
      NO: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01
        </SoftTypography>
      ),
      Nama: <Author name="Farhan" email="12.23.009" />,
      Tahun:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          2023
        </SoftTypography>
      ),
      Bulan:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Januari
        </SoftTypography>
      ),
      Minggu1: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu2: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu3: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu4: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      
    },
    {
      NO: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01
        </SoftTypography>
      ),
      Nama: <Author name="Dayat" email="12.23.009" />,
      Tahun:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          2023
        </SoftTypography>
      ),
      Bulan:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Januari
        </SoftTypography>
      ),
      Minggu1: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu2: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu3: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu4: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      
    },
    {
      NO: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01
        </SoftTypography>
      ),
      Nama: <Author name="Bilaa" email="12.23.009" />,
      Tahun:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          2023
        </SoftTypography>
      ),
      Bulan:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Januari
        </SoftTypography>
      ),
      Minggu1: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu2: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu3: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Minggu4: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      
    },
  ],
};

export default authorsTableData;
