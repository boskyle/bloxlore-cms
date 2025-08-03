import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@store/slices/authSlice";
import RegisterView from "./RegisterView";

const RegisterContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validateForm(form);
    setError(validationErrors || {});
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.email.trim()) {
      errors.email = ["Email is required."];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = ["Enter a valid email address."];
    }

    if (!data.password.trim()) {
      errors.password = ["Password is required."];
    } else if (data.password.length < 6) {
      errors.password = ["Password must be at least 6 characters."];
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientErrors = validateForm(form);
    if (clientErrors) {
      setError(clientErrors);
      setTouched({ email: true, password: true });
      return;
    }

    try {
      const resultAction = await dispatch(registerUser(form));
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/dashboard", { replace: true });
      } else {
        setError(resultAction.payload || { general: ["Registration failed."] });
      }
    } catch (err) {
      setError({ general: ["Something went wrong. Try again."] });
    }
  };

  return (
    <RegisterView
      form={form}
      error={error}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
      touched={touched}
    />
  );
};

export default RegisterContainer;
