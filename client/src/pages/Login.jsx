import React, { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../APIs/api";
import { setToken } from "../utilities/authReducer";
import { useDispatch } from "react-redux";
import { setUser } from "../utilities/userReducer";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const response = await login(data);
      setData({ email: "", password: "" });
      toast(response.data.Message, {
        style: {
          borderRadius: "20px",
          color: "#78350f",
          background: "#f8fafc",
        },
        duration: 1500,
      });
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      setTimeout(() => {
        navigate("/list");
      }, 1000);
      console.log(response.data.user);
    } catch (error) {
      toast(error.response.data.Message, {
        style: {
          borderRadius: "20px",
          color: "#f8fafc",
          background: "#78350f",
        },
        duration: 3500,
      });
    }
  };
  return (
    <div className="bg-yellow-100 h-screen flex items-center justify-center">
      <div className="bg-slate-50 p-8 rounded-xl shadow-lg w-full max-w-80 md:max-w-md">
        <div>
          <h1 className="text-xl font-bold font-sans text-amber-900 pb-4 text-center">
            Welcome Back to BlissList!
          </h1>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email:
          </label>
          <div className="relative mt-2  rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">@</span>
            </div>
            <input
              name="email"
              type="email"
              placeholder="E-mail Please"
              value={data.email}
              onChange={(e) =>
                setData(() => ({ ...data, email: e.target.value }))
              }
              className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            ></input>
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password:
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">*</span>
            </div>
            <input
              name="password"
              type="password"
              placeholder="Password Please"
              value={data.password}
              onChange={(e) =>
                setData(() => ({ ...data, password: e.target.value }))
              }
              className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
            ></input>
          </div>
        </div>
        <div className="flex justify-center mt-7">
          <button
            type="submit"
            className="bg-amber-900 text-slate-50 rounded-md py-1 px-3 font-semibold w-full"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Login
          </button>
        </div>
        <div className="text-center mt-3 text-amber-900">
          <Link to="/">
            <span>Haven't registered yet? Register Here!</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
