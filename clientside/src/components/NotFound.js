import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="bounds">
        <div className="grid-100">
          <Link className="button button-secondary" to="/">Home</Link>
        </div>
      </div>
      <div className="bounds course--detail">
      <div className="course--header"><br />
        <br /><h1>Not Found</h1>
      </div>
        <p>Whoops, the requested route doesn't exist.</p>
      </div>
    </React.Fragment>
  );
};

export default NotFound;