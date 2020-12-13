import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../reducers/auth";

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
  const authLinks = (
    <ul>
      <li><a href={"/"} onClick={logout}>
        <i className="fas fa-sign-out-alt"/>{" "}<span className="hide-sm">Logout</span></a></li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"/> DevConnector</Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

export default connect(state => ({
  auth: state.auth
}), {logout})(Navbar);