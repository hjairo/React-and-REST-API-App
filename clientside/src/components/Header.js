import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { authUser } = props;

  return (
    <React.Fragment>
      <div className="header">
        <div className="bounds">
          <Link to='/'><h1 className="header--logo">Courses</h1></Link>
          {/* authUser is displayed upon login */}
          {
            authUser
            ? <nav><span>{`Hello, ${authUser.firstName}!`}</span><Link className="signin" to="/signout">Sign Out</Link></nav>
            : <nav><Link className="signup" to='/signup'>Sign Up</Link><Link className="signin" to="/signin">Sign In</Link></nav>
          }
          
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Header;