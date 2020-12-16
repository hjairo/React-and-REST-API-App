import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import btoa from 'btoa';

const UpdateCourse = (props) => {
  const [ course, setCourse ] = useState({});
  const [ errors, setErrors ] = useState(null);
  const { authUser } = props;
  const history = useHistory();

  // course data fetched and state is set
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${props.computedMatch.params.id}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 500) {
          return history.push('/error');
        } else {
          history.push('/notfound');
        }
      })
      .then(data => {
        if (data) {
          if (authUser && data.owner?.emailAddress !== authUser.emailAddress) {
            history.push('/forbidden');
          } else {
            return setCourse(data);
          }
        }
      })
      .catch(err => console.log(err));
  }, [ history, props.computedMatch.params.id, authUser ]);

  // submits authUser and course data to API
  async function submit(e) {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/courses/${props.computedMatch.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`),
      },
      credentials: 'same-origin',
      body: JSON.stringify(course),
    })
    .then(res => {
      if (res.status === 204) {
        history.push(`/`); // courses/${props.computedMatch.params.id}
      } else if (res.status === 500) {
        return history.push('/error');
      } else if (res.status === 400) {
        const getErrors = async () => {
          const data = await res.json();
          return setErrors(data.errors);
        };

        return getErrors();
      }
    })
    .catch(err => console.log(err))
  }

      // form info update
  const change = e => {
    setCourse({ ...course, [ e.target.name ]: e.target.value });
  }

      // redirects to home on cancel
  const cancel = e => {
    e.preventDefault();
    history.push(`/courses/${props.computedMatch.params.id}`);
  };

  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      {/* displays validation errors */}
      {
        errors
        ? <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                {errors.map((error, index) => <li key={index}>{error}</li>)}
              </ul>
            </div>
          </div>
       : ''
      }
      <div>
        <form onSubmit={submit}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                  value={course.title ? course.title : ''}
                  onChange={change}
                />
              </div>
              <p>{`By ${authUser.firstName} ${authUser.lastName}`}</p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  className=""
                  placeholder="Course description..."
                  value={course.description ? course.description : ''}
                  onChange={change}
                />
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      className="course--time--input"
                      placeholder="Hours"
                      value={course.estimatedTime ? course.estimatedTime : ''}
                      onChange={change}
                    />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      className=""
                      placeholder="List materials..."
                      value={
                        course.materialsNeeded ? course.materialsNeeded : ''
                      }
                      onChange={change}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              Update Course
            </button>
            <button className="button button-secondary" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;