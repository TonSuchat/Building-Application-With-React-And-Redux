import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../common/tableList.css";

const CourseList = ({
  displayCourses,
  totalCourse,
  onDeleteClick,
  onTHClick
}) => (
  <>
    <div className="row mt-3">
      <div className="col-12">
        <p>Total: {totalCourse} records</p>
      </div>
    </div>
    <table className="table table-list">
      <thead>
        <tr>
          <th onClick={() => onTHClick("id")} />
          <th onClick={() => onTHClick("slug")}>Title</th>
          <th onClick={() => onTHClick("authorName")}>Author</th>
          <th onClick={() => onTHClick("category")}>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {displayCourses
          ? displayCourses.map(course => {
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
  </>
);

CourseList.propTypes = {
  displayCourses: PropTypes.array.isRequired,
  totalCourse: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onTHClick: PropTypes.func.isRequired
};

export default CourseList;
