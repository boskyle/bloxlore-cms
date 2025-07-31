// src/views/register/RegisterContainer.jsx

import React, { useState } from "react";
import RegisterView from "./RegisterView";
import { useAuth } from "@hooks/useAuth";

/**
 * Container component that manages form state and authentication logic.
 */
const RegisterContainer = () => {
  const { login } = useAuth(); // You can use this after registration to auto-login
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/creator/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();
      await login(form.email, form.password); // Optional: Auto-login after register
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterView
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default RegisterContainer;
