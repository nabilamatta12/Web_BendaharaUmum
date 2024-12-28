import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Grid from "@mui/material/Grid";
import {Button} from "react-bootstrap";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/Asset4@3x.png";

const SignIn = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(`${localStorage.getItem('api-endpoint')}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      
      if (!response.ok) {
        console.log(response);
        // Tampilkan pesan kesalahan kepada pengguna jika login gagal
        alert("Password atau username salah");
        return;
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        console.log("Login berhasil:", data.redirect);
        localStorage.setItem("token", data.token);
        navigate(data.redirect);
      } else {
        throw new Error("Token tidak ditemukan dalam respons");
      }
    
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      // Tampilkan pesan kesalahan kepada pengguna jika login gagal
      alert("Terjadi kesalahan saat login");
    }
  };

  const handleApi = () => {
    const defaultEndpoint = localStorage.getItem("api-endpoint")
    let endpointapi = prompt(`endpoint: ${defaultEndpoint}`,defaultEndpoint)
    localStorage.setItem("api-endpoint", endpointapi);
  }

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
                <Grid item xs={3} md={2} xl={12}>
            {/* <SoftBox mb={3}> */}
              <Button variant="primary" onClick={() => handleApi()}>Set Api Url</Button>
            {/* </SoftBox> */}
          </Grid>
      <SoftBox component="form" role="form" onSubmit={handleLogin}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Username
            </SoftTypography>
          </SoftBox>
          <SoftInput 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            sign in
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
