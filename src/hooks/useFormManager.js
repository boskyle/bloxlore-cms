import { useReducer, useCallback } from "react";

// Validation functions by form type
const VALIDATION_TYPES = {
  REGISTER: (form) => {
    const errors = {};

    if (!form.email?.trim()) {
      errors.email = ["Email is required."];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = ["Enter a valid email address."];
    }

    if (!form.password?.trim()) {
      errors.password = ["Password is required."];
    } else if (form.password.length < 6) {
      errors.password = ["Password must be at least 6 characters."];
    }

    return Object.keys(errors).length > 0 ? errors : null;
  },

  LOGIN: (form) => {
    const errors = {};

    if (!form.email?.trim()) {
      errors.email = ["Email is required."];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = ["Enter a valid email address."];
    }

    if (!form.password?.trim()) {
      errors.password = ["Password is required."];
    }

    return Object.keys(errors).length > 0 ? errors : null;
  },
};

// Initial state builder
const createInitialState = (initialForm) => ({
  form: initialForm,
  touched: {},
  errors: {},
});

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD": {
      const updatedForm = {
        ...state.form,
        [action.field]: action.value,
      };

      const validate = VALIDATION_TYPES[action.validationType];
      const validationErrors = validate(updatedForm);

      return {
        ...state,
        form: updatedForm,
        errors: validationErrors || {},
      };
    }

    case "TOUCH_FIELD":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors || {},
      };

    default:
      return state;
  }
};

// 💡 Custom hook
export const useFormManager = (
  initialForm = {},
  validationType = "REGISTER"
) => {
  const [state, dispatch] = useReducer(
    reducer,
    createInitialState(initialForm)
  );

  const setField = useCallback(
    (field, value) => {
      dispatch({ type: "SET_FIELD", field, value, validationType });
    },
    [validationType]
  );

  const touchField = useCallback((field) => {
    dispatch({ type: "TOUCH_FIELD", field });
  }, []);

  const setErrors = useCallback((errors) => {
    dispatch({ type: "SET_ERRORS", errors });
  }, []);

  return {
    form: state.form,
    errors: state.errors,
    touched: state.touched,
    setField,
    touchField,
    setErrors,
  };
};
