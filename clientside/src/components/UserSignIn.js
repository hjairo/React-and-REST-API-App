import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import btoa from 'btoa';

const UserSignIn = (props) => {
  const { setAuthUser } = props;
  const [ formInfo, setFormInfo ] = useState({ emailAddress: '', password: '' });
  const history = useHistory();

  // sends sign in info to API to check user credentials
  async function submit(e) {
    e.preventDefault();
    await fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + btoa(`${formInfo.emailAddress}:${formInfo.password}`),
      },
      credentials: 'same-origin',
    })
      .then(res => {
        if (res.status === 500) {
          return history.push('/error');
        } else if (res.status === 401) {
          return history.push('/forbidden');
        } else {
          return res.json();
        }
      })
      .then(data => {
        setAuthUser({
          emailAddress: formInfo.emailAddress, 
          password: formInfo.password, 
          firstName: data.firstName, 
          lastName: data.lastName
        });
        if (props.location.from) {
          history.push(props.location.from)
        } else {
          history.push('/');
        }
      })
      .catch(err => console.log('Wrong authentication'))
  }

  // form info updates when values are changed
  const change = e => {
    setFormInfo({ ...formInfo, [ e.target.name ]: e.target.value });
  }

    // redirects to home if cancelled
  function cancel(e) {
    e.preventDefault();
    history.push('/');
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form onSubmit={submit}>
            <div>
              <input 
                id="emailAddress" 
                name="emailAddress" 
                type="text" 
                className="" 
                placeholder="Email Address" 
                onChange={change} 
              />
            </div>
            <div>
              <input 
                id="password" 
                name="password" 
                type="password" 
                className="" 
                placeholder="Password" 
                onChange={change}
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Sign In</button>
              <button className="button button-secondary" onClick={cancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up</p>
      </div>
    </div>
  );
};

export default UserSignIn;