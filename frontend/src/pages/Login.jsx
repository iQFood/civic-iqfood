import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(
      Object.fromEntries(formData.entries())
    );
    if (error) return setErrorText(error.statusText);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <>
      <div className="sign-bg">
        <form className="user-form" onSubmit={handleSubmit}>
          <h1 className="login-text">Login</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            autoComplete="username"
            id="username"
            name="username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            id="password"
            name="password"
          />

          <button className="login-button">Log in!</button>
        </form>
        {!!errorText && <p>{errorText}</p>}
      </div>
    </>
  )
}
