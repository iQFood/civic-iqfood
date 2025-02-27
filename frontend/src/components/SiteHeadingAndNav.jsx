import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

import black from "../media/black.png";
import white from "../media/white.png";
import green from "../media/green.png";
import brown from "../media/brown.png";
import yellow from "../media/yellow.png";
import logo from "../media/logo.png";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header>
      <div className = "brand">
        <img src={logo} id="logo" />
        <a id="title" href="/">
          IQ FOOD
        </a>
      </div>

      <nav>
        <ul>
          {currentUser ? (
            <>
              <li  className="nav-li" id="nav-left">
                <NavLink to="/users/search">Search</NavLink>
              </li >
              <li className="nav-li" id="nav-mid">
                <NavLink to={`/users/${currentUser.id}`}>DashBoard</NavLink>
              </li>
              <li className="nav-li" id="nav-right">
                <NavLink to="/aboutus" end={true}>
                  About
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-li" id="nav-left">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="nav-li" id="nav-mid">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="nav-li" id="nav-right">
                <NavLink to="/sign-up">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
