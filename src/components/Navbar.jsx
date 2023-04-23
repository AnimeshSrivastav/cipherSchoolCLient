import React from "react";
import "../css/navbar.css";
import { useStateValue } from "../redux/Stateprovider";
function Navbar() {
  const [{ FirstName, LastName, email }, dispatch] = useStateValue();
  return (
    <div className="navbar">
      <div className="navbar__right">
        <div className="navbar__img">
          <img src="cs.png" alt="" />
        </div>
        <div className="navbar__info">
          <h4> Hello</h4>
          <h3>
            {FirstName} {LastName}
          </h3>
          <h4>{email}</h4>
        </div>
      </div>
      <div className="navbar__left">2.2K Followers</div>
    </div>
  );
}

export default Navbar;
