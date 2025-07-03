import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { CustomButton } from "../components/button";
import { EyeOff, Eye } from "lucide-react";
import * as SC from "../../style";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import logo from "/logo.png";

export default function LogIn() {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const res = await API.post("/api/auth/login", {
        email: identifier,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      // Decode the token
      const decoded = jwtDecode<{ isAdmin?: boolean }>(token);
      console.log("Decoded Token:", decoded);

      // Navigate based on role
      if (decoded.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed.");
      setLoading(false)
    }
  };

  return (
    <SC.Main className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 px-3 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center">
        <span className=" flex justify-between items-center p-4 mb-5">
          <h2 className="text-[16px] text-left font-semibold">
            Vic Movies Zone
          </h2>
          <Link to={''}>
            <img src={logo} alt="" className="h-10" />
          </Link>
        </span>
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <CustomInput
            name="email"
            placeholder="Email or User-Name"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            rightIcon={null}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <p className="text-btn-text text-left cursor-pointer">
            Forgot Password?
          </p>

          <CustomButton
            type="submit"
            title={loading ? "Logging In..." : "Log In "}
            className="w-full p-3 disabled:opacity-50"
            disabled={loading}
          />

          <span className="flex justify-between mt-2">
            <Link to="/sign_Up" className="w-[42%] disabled:opacity-50">
              <CustomButton
                type="button"
                title="Sign Up"
                className="w-full bg-input p-[6px]"
                disabled={loading}
              />
            </Link>

            <CustomButton
              type="button"
              title="Continue as guest"
              className="w-[56%] bg-input disabled:opacity-50"
              disabled={loading}
            />
          </span>
        </form>
      </div>
    </SC.Main>
  );
}