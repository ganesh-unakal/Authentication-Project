import React, { useState } from "react";


const AuthConetxt= React.createContext({
    token: " ",
    isLoggedIn: false,
    login : (token)=>{},
    logout: () => {}
})

 export const AuthContextProvider = (props) =>{
    const initialToken = localStorage.getItem('token')
   const [token, setToken]= useState(initialToken)
  

   const userIsLoggedIn = !!token // if the token is string not empty this will retuen 'true' if the token string and empty it will return false


    const loginHandler = (token) =>{  
        setToken(token)
        localStorage.setItem('token' , token)
    };

    const logoutHandler = () =>{
        setToken(null)
        localStorage.removeItem('token')
    };

    const conetxtValue = {
        token : token,
        isLoggedIn: userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    return <AuthConetxt.Provider value={conetxtValue}>{props.children}</AuthConetxt.Provider>
}
export default AuthConetxt;