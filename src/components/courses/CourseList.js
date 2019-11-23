import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CourseList = ({ courses }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Slug</th>
        <th>Author</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {courses
        ? courses.map(course => {
            return (
              <tr key={course.id}>
                <td>
                  <a
                    className="btn btn-light"
                    href={`http://pluralsight.com/courses/${course.slug}`}
                  >
                    Watch
                  </a>
                </td>
                <td>{course.title}</td>
                <td>
                  <Link to={`/course/${course.slug}`}>{course.slug}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
              </tr>
            );
          })
        : null}
    </tbody>
  </table>
);

CourseList.prototype = {
  courses: PropTypes.array.isRequired
};

export default CourseList;
