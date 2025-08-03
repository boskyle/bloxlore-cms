import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@store/slices/authSlice";
import RegisterView from "./RegisterView";
import { useFormManager } from "@hooks/useFormManager";

const RegisterContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { form, touched, errors, setField, touchField, setErrors } =
    useFormManager(
      {
        email: "",
        password: "",
      },
      "REGISTER"
    );

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

    // Validate and abort if client-side errors exist
    if (Object.keys(errors).length > 0) return;

    try {
      const resultAction = await dispatch(registerUser(form));

      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/dashboard", { replace: true });
      } else {
        // Handles server-side 422 errors like { errors: { email: [...] } }
        const errors = resultAction.payload;

        const flattened = Object.values(errors).flat();
        setErrors({ server: flattened });
      }
    } catch (err) {
      console.error("Unexpected error during registration:", err);
      setErrors({ general: ["Something went wrong. Try again."] });
    }
  };

  return (
    <RegisterView
      form={form}
      errors={errors}
      touched={touched}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
};

export default RegisterContainer;
