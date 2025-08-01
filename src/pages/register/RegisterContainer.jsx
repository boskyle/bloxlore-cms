// Handles logic and form submission for registration

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterView from "./RegisterView";
import { useDispatch } from "react-redux";

import { registerUser } from "@store/slices/authSlice";

const RegisterContainer = () => {
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
      const resultAction = await dispatch(registerUser(form));

      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/dashboard", { replace: true });
      } else {
        console.log(form);
        setError(resultAction.payload || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <RegisterView
      form={form}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default RegisterContainer;
