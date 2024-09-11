// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import MasterCard from "examples/Cards/MasterCard";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Table from "examples/Tables/Table";
import { Card } from "@mui/material";

import TableSumbangan from "layouts/sumbangan/tableSumbangan/TableSumbangan";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components

import authorsTableData from "./data/authorsTableData";

// Data
import reportsBarChartData from "old/dashboard/data/reportsBarChartData";
import gradientLineChartData from "old/dashboard/data/gradientLineChartData";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  // const { columns, rows } = authorsTableData;
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [inforows, setInfo] = useState({
    sisa_uang:'',
    total_pengeluaran:'',
    total_sumbangan:'',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
        // if (!token) {
        //   navigate('/authentication/sign-in');
        //   return;
        // }

        const response = await fetch('https://9e39-182-1-212-104.ngrok-free.app/sumbangan/all', {
          method: 'GET', // atau 'POST' tergantung kebutuhan
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Tambahkan header Authorization
          },
        })
        const result = await response.json();

        console.log("result sumbangan", result)

        setRows(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
        // if (!token) {
        //   navigate('/authentication/sign-in');
        //   return;
        // }

        const response = await fetch('https://9e39-182-1-212-104.ngrok-free.app/info', {
          method: 'GET', // atau 'POST' tergantung kebutuhan
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Tambahkan header Authorization
          },
        })
        const result = await response.json();

        console.log("result Inf", result)
        setInfo(result);
        console.log(inforows);

        // setRows(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={5}>
              <MasterCard number={380801031645533} holder="Nabila Ismail Matta" expires="11/22" />
            </Grid>
            <Grid item xs={12} md={4} xl={2}>
              <DefaultInfoCard
                icon="account_balance"
                title="Total"
                description="Uang Khas"
                value={"Rp "+inforows["sisa_uang"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              />
            </Grid>
            <Grid item xs={12} md={4} xl={2}>
              <DefaultInfoCard
                icon="account_balance"
                title="Total"
                description="Uang Keluar"
                value={"Rp "+inforows["total_pengeluaran"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              />
            </Grid>
            <Grid item xs={12} md={4} xl={2}>
              <DefaultInfoCard
                icon="account_balance"
                title="Total"
                description="Uang Masuk"
                value={"Rp "+inforows["total_sumbangan"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid> */}
            {/* <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid> */}
          </Grid>
        </SoftBox>
        {/* <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Histori Pembayaran Iuran 2023</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card> */}
          </SoftBox>
      <SoftBox py={3}>
        <SoftBox mb={3}>
            <SoftBox mb={10}>

          <h2>History Sumbangan</h2>
          <TableSumbangan rows={rows} handleEditRow={null} />
          </SoftBox>
      </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
