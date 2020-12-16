import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Course from './Course';

const Courses = () => {
  const [ courses, setCourses ] = useState([]);
  const history = useHistory();

  let allCourses;

  // compiles course list
  if (courses) {
    allCourses = courses.map(course => <Course id={course.id} title={course.title} key={course.id} />);
  }

  // fetches course data from API and sets courses in state
  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => {
        if (res.status === 500) {
          return history.push('./error');
        } else {
          return res.json();
        }
      })
      .then(data => setCourses(data))
      .catch(err => console.log(err))
  }, [ history ]);

  return (
    <div className="bounds">
      {allCourses}
      <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </a></div>
    </div>
  );
}

export default Courses;