import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateToken } from "@store/slices/authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [checked, setChecked] = React.useState(false);
  const [valid, setValid] = React.useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setChecked(true);
        return;
      }

      const result = await dispatch(validateToken());
      setValid(validateToken.fulfilled.match(result));
      setChecked(true);
    };

    checkToken();
  }, [dispatch, token]);

  if (!checked) return <div>Checking authentication...</div>;

  return valid ? children : <Navigate to="/" />;
};

export default PrivateRoute;
