import {
  BrowserRouter as Router,
  Route,
  Redirect, 
  Switch
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Component import
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import PrivateRoute from './components/PrivateRoute';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

function App() {
  const [ authUser, setAuthUser ] = useState(Cookies.getJSON('authUser') || null);
  
  useEffect(() => {
    if (authUser) {
      Cookies.set('authUser', authUser, {expires: 1});
    } else {
      Cookies.remove('authUser')
    }
  }, [ authUser ]);

  return (
    <Router>
      <Header authUser={authUser} />
      <Route exact path="/">
        <Redirect to="/courses" />
      </Route>
      <Switch>
        <Route exact path="/courses" render={ () => <Courses /> }/>
        {/* only authUser has access to creating a course */}
        <PrivateRoute 
          path="/courses/create"
          authUser={authUser}
          Component={CreateCourse}
        />
        <Route exact path="/courses/:id" render={ (props) => 
          <CourseDetail 
            authUser={authUser}
            {...props}
          />}
        />
        <Route path="/signin" render={ (props) => 
          <UserSignIn 
            setAuthUser={setAuthUser} 
            {...props} 
          />}
        />
        <Route path="/signup" render={ () => 
          <UserSignUp 
            setAuthUser={setAuthUser}
          />}/>
        <Route path='/signout' render={ () => 
          <UserSignOut 
            setAuthUser={setAuthUser} 
          />
        } />
        {/* only authUser can update a course they own */}
        <PrivateRoute 
          path="/courses/:id/update"
          authUser={authUser}
          Component={UpdateCourse}
        />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
