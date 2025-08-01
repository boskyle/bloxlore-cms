// Handles logic and form submission for login

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginView from "./LoginView";
import { useDispatch } from "react-redux";

import { loginUser } from "@store/slices/authSlice";

const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser(form));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      } else {
        console.log(form);
        setError(resultAction.payload || "Login failed");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <LoginView
      form={form}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
