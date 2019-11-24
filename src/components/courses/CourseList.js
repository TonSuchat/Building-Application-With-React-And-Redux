import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CourseList = ({ courses, onDeleteClick }) => (
  <table className="table mt-3">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th />
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
                <td>
                  <Link to={`/course/${course.slug}`}>{course.slug}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Delete this course?"))
                        onDeleteClick(course);
                    }}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        : null}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
