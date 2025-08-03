import { useReducer } from "react";

const initialState = {
  form: {},
  touched: {},
  error: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_TOUCH":
    default:
      return state;
  }
};

const [formState, formDispatch] = useReducer(reducer, initialState);
