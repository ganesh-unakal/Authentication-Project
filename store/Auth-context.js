import React, { useState } from "react";


const AuthConetxt= React.createContext({
    token: " ",
    isLoggedIn: false,
    login : (token)=>{},
    logout: () => {}
})

 export const AuthContextProvider = (props) =>{
   const [token, setToken]= useState(null)

   const userIsLoggedIn = !!token // if the token is string not empty this willretuen 'true' if the token string and empty it will return false


    const loginHandler = (token) =>{
        setToken(token)
    };

    const logoutHandler = () =>{
        setToken(null)
    }

    const conetxtValue = {
        token : token,
        isLoggedIn: userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    return <AuthConetxt.Provider value={conetxtValue}>{props.children}</AuthConetxt.Provider>
}
export default AuthConetxt;