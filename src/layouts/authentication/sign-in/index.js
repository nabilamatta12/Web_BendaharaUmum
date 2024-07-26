import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";

import img from "../../../assets/LoginAssets1/Asset4@3x.png";
import logo from "../../../assets/LoginAssets1/gambarCCNT.png";
import "../sign-in/Login.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipe, setTipe] = useState("password");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        alert("Password atau username salah Sayangkuh");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("authToken", data);

        console.log("Login berhasil:", data.redirect);
        localStorage.setItem("token", data.token);
        window.location.href = `${window.location.href}${data.redirect}`;
      } else {
        throw new Error("Token tidak ditemukan dalam respons");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const tampil = () => {
    setTipe(tipe === "password" ? "text" : "password");
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
            <h3>WELCOME!!!</h3>
          </div>
          <form onSubmit={handleLogin} className="form grid">
            <h6>Login Bendahara Umum</h6>

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
                <a onClick={tampil}><BsFillShieldLockFill className="icon" /></a>
                <input
                  type={tipe}
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <br/>
            <button type="submit" className="btn flex">
              <h6>Sign In</h6>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
