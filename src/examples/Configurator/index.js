import { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor,
} from "context";

function Configurator() {
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
     
     <Grid item xs={12} lg={3}>
            {/* <Card> */}
        {/* tanda kaliiii */}
        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon> 
            <SoftBox textAlign="center">
            <SoftTypography fontWeight="bold">Bayar Iuran</SoftTypography>
            </SoftBox>

            <SoftBox component="form" role="form">
            <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                NO
                </SoftTypography>
            </SoftBox>
            <SoftInput type="text" placeholder="No" />
            </SoftBox>

            <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              NAMA
            </SoftTypography>
          </SoftBox>
          <SoftInput type="text" placeholder="Name" />
        </SoftBox>

        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              BULAN
            </SoftTypography>
          </SoftBox>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">
              <em>Pilih Bulan</em>
            </MenuItem>
            <MenuItem value="Januari">Januari</MenuItem>
            <MenuItem value="Februari">Februari</MenuItem>
            <MenuItem value="Maret">Maret</MenuItem>
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="Mei">Mei</MenuItem>
            <MenuItem value="Juni">Juni</MenuItem>
            <MenuItem value="Juli">Juli</MenuItem>
            <MenuItem value="Agustus">Agustus</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="Oktober">Oktober</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="Desember">Desember</MenuItem>
          </Select>
        </SoftBox>

        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              MINGGU
            </SoftTypography>
          </SoftBox>
          <Select
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">
              <em>Pilih Minggu</em>
            </MenuItem>
            <MenuItem value="Minggu 1">Minggu 1</MenuItem>
            <MenuItem value="Minggu 2">Minggu 2</MenuItem>
            <MenuItem value="Minggu 3">Minggu 3</MenuItem>
            <MenuItem value="Minggu 4">Minggu 4</MenuItem>
          </Select>
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleCloseConfigurator}>
            Kirim
          </SoftButton>
        </SoftBox>

        <SoftBox mt={3} textAlign="center">
        </SoftBox>

      </SoftBox>
      {/* </Card> */}

            </Grid>
    </ConfiguratorRoot>
  );
}

export default Configurator;
