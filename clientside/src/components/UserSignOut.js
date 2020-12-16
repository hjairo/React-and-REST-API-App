import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = (props) => {
  const { setAuthUser } = props;

  // redirects user to home after signing out
  useEffect(() => {
    setAuthUser(null);
  });

  return (
    <Redirect to='/' />
  );
};
export default UserSignOut;