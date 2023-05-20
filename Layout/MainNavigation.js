import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/Auth-context";

const MainNavigation = () => {
  const AuthCntx = useContext(AuthContext);

  const isLoggedIn = AuthCntx.isLoggedIn; //here we get user logged in or not

  const logoutHandler = () => {
    AuthCntx.logout();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>

      <nav>
        <ul>
          {!isLoggedIn && ( //if the user is not logged in then show ths
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {isLoggedIn && ( // if the user logged in show thz
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

          {isLoggedIn && ( // if the user logged in show thz
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
