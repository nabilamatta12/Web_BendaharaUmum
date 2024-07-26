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
    { name: "Tanggal", align: "left" },
    { name: "Nama", align: "left" },
    { name: "Banyaknya", align: "left" },
    { name: "Debit", align: "left" },
    { name: "Jumlah", align: "center" },
    { name: "Nota", align: "center" },
    { name: "Aksi", align: "center" },
    // { name: "action", align: "center" },
  ],

  rows: [
    {
      NO: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          01
        </SoftTypography>
      ),
      Tanggal: <Author name="Darius" email="12.23.009" />,
      Nama:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          2023
        </SoftTypography>
      ),
      Banyaknya:  (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Januari
        </SoftTypography>
      ),
      Debit: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Jumlah: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Nota: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      Aksi: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Rp. 10.000
        </SoftTypography>
      ),
      
    },
    
  ],
};

export default authorsTableData;
