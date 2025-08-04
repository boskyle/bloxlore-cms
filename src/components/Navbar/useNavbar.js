import { useReducer } from "react";
import { useLocation } from "react-router-dom";

const initialState = {
  navbarOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "navbarOpen":
      return { navbarOpen: true };
    case "navbarClose":
      return { navbarOpen: false };
    default:
      return state;
  }
}

export default function useNavbar() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openNavbar = () => dispatch({ type: "navbarOpen" });
  const closeNavbar = () => dispatch({ type: "navbarClose" });
  const toggleNavbar = () => (state.navbarOpen ? closeNavbar() : openNavbar());

  const location = useLocation();

  const currentPath = location.pathname.replace(/^\/+/, "");

  return {
    navbarOpen: state.navbarOpen,
    toggleNavbar,
    currentPath,
  };
}
