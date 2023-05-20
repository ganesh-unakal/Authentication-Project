import AuthConetxt from "../../store/Auth-context";
import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const passwordInputref = useRef();
  const history = useHistory;

  const AuthCntx = useContext(AuthConetxt);

  const submitHAndler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputref.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBBZ2InOGQ7wCS3rgt77JkpEnMz4suNWrE",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: AuthCntx.token,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res);
      })
      .then((data) => {
        console.log(data);
        history.replace("/");
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHAndler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInputref} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
