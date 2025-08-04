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
    touchField(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    touchField("email");
    touchField("password");

    if (Object.keys(errors).length > 0) return;

    try {
      const resultAction = await dispatch(registerUser(form));

      if (registerUser.fulfilled.match(resultAction)) {
        // Optional: display a success toast or notification here
        navigate("/login", { replace: true }); // redirect user to login page
      } else {
        const errors = resultAction.payload;
        const flattened = Object.values(errors).flat();
        setErrors({ server: flattened });
      }
    } catch (err) {
      console.error("Unexpected error during registration:", err);
      setErrors({ general: ["Unexpected error. Please try again."] });
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
