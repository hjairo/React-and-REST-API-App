import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <React.Fragment>
      <div className="bounds">
        <div className="grid-100">
          <Link className="button button-secondary" to="/">Home</Link>
        </div>
      </div>
      <div className="bounds course--detail">
      <div className="course--header"><br />
        <br /><h1>Forbidden</h1>
      </div>
        <p>This one right here officer. You're not authorized to view this page.</p>
      </div>
    </React.Fragment>
  );
};

export default Forbidden;