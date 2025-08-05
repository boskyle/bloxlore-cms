// Handles logic and form submission for login

import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginView from "./LoginView";
import { loginUser } from "@store/slices/authSlice";
import { useFormManager } from "@hooks/useFormManager";

const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { form, errors, touched, setField, touchField, setErrors } =
    useFormManager({ email: "", password: "" }, "LOGIN");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    touchField(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields
    touchField("email");
    touchField("password");

    // If validation errors exist, abort
    if (Object.keys(errors).length > 0) return;

    try {
      const resultAction = await dispatch(loginUser(form));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard", { replace: true });
      } else {
        // Server-side error, e.g., incorrect credentials
        const serverError = resultAction.payload;
        setErrors({ server: [serverError] });
      }
    } catch (err) {
      setErrors({ general: ["Something went wrong. Try again."] });
    }
  };

  return (
    <LoginView
      form={form}
      errors={errors}
      touched={touched}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
