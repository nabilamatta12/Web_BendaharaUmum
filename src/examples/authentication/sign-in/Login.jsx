import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

import img from "../../LoginAssets/Asset4@3x.png";
import logo from "../../LoginAssets/gambarCCNT.png";

// Import our assets
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginData = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch("https://1b38-140-213-1-120.ngrok-free.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "Authorization",
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        // throw new Error("Login gagal");
        alert("Password atau username salah Goblok");
      }
  
      const data = await response.json();
  
      // Pastikan server mengembalikan informasi token atau identifikasi pengguna yang valid
      if (data.token) {
        localStorage.setItem('authToken', data);

    // Mengarahkan pengguna ke URL yang ditentukan
        console.log("Login berhasil:", data.redirect);
        localStorage.setItem("token", data.token);
        window.location.href = `${window.location.href}${data.redirect}`;

        // Navigasi ke halaman dashboard atau halaman utama setelah login berhasil
        // history.push("/dashboard"); // Pastikan untuk mengimpor useHistory dari 'react-router-dom'
      } else {
        throw new Error("Token tidak ditemukan dalam respons");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      // Tampilkan pesan kesalahan kepada pengguna jika login gagal
    }
  };
  
  // const PasswordInput = () => {
    // const [password, setPassword] = useState('');
    const [tipe, setTipe] = useState('password');
  
    const tampil = () => {
      // Mengubah tipe input antara 'password' dan 'text'
      setTipe(tipe === 'password' ? 'text' : 'password');
    };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="imgDiv">
          <img src={img} alt="Login Page Banner" />
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            {/* <img src={logo} alt="Logo Image" /> */}
            <h3>WELCOME!!</h3>
          </div>
          <form onSubmit={handleLogin} className="form grid">
            <span>Login Bendahara Umum</span>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <a onClick={tampil}><BsFillShieldLockFill className="icon"/></a>
                <input
                  type={tipe}
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <br />
            <button type="submit" className="btn flex">
              <span>Login</span>
              <AiOutlineDoubleRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot your password <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
 