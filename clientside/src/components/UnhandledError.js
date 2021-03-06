import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <React.Fragment>
      <div className="bounds">
        <div className="grid-100">
          <Link className="button button-secondary" to="/">Home</Link>
        </div>
      </div>
      <div className="bounds course--detail">
      <div className="course--header"><br />
        <br /><h1>Error</h1>
      </div>
        <p>Uh oh, an unexpected error occurred.</p>
      </div>
    </React.Fragment>
  );
};

export default Error;