
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

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

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "old/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "old/dashboard/components/WorkWithTheRockets";
import Projects from "old/dashboard/components/Projects";
import OrderOverview from "old/dashboard/components/OrderOverview";
import authorsTableData from "./data/authorsTableData";


// Data
import reportsBarChartData from "old/dashboard/data/reportsBarChartData";
import gradientLineChartData from "old/dashboard/data/gradientLineChartData";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const { columns, rows } = authorsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
          <Grid item xs={5} xl={5}>
                  <MasterCard number={4562112245947852} holder="Nabila Ismail Matta" expires="11/22" />
                </Grid>
          <Grid item xs={10} md={4} xl={2}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Total"
                    description="Uang Khas"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={10} md={4} xl={2}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Total"
                    description="Total Uang Keluar"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={10} md={4} xl={2}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Total"
                    description="Total Uang Keluar"
                    value="+$2000"
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
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
