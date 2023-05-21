import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [logoutTimer, setLogoutTimer] = useState(null);

  const userIsLoggedIn = !!token; // if the token is a non-empty string, it will return 'true'; if the token is an empty string or null, it will return 'false'

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Function to start the logout timer
  const startLogoutTimer = () => {
    const timer = setTimeout(logoutHandler, 5 * 60 * 1000); // 5 minutes in milliseconds
    setLogoutTimer(timer);
  };

  // Function to reset the logout timer
  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    startLogoutTimer();
  };

  useEffect(() => {
    if (userIsLoggedIn) {
      startLogoutTimer();
    } else {
      clearTimeout(logoutTimer);
    }
  }, [userIsLoggedIn]); // Run the effect whenever the user's login status changes

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;