// Handles logic and form submission for login

import React, { useState } from "react";
import { useAuth } from "@hooks/useAuth"; // Custom composable hook
import { useNavigate } from "react-router-dom";
import LoginView from "./LoginView";

const LoginContainer = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

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
    setError(null);

    try {
      await login(form.email, form.password);
      navigate("/"); // redirect to main dashboard or landing page
    } catch (err) {
      setError("Invalid credentials");
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
