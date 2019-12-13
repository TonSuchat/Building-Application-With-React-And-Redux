import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../common/tableList.css";

export default function AuthorList({
  displayAuthors,
  totalAuthors,
  onDeleteClick,
  onTHClick
}) {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <p>Total: {totalAuthors} records</p>
        </div>
      </div>
      <table className="table table-list">
        <thead>
          <tr>
            <th onClick={() => onTHClick("name")}>Name</th>
            <th onClick={() => onTHClick("totalCourse")}>Total course</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {displayAuthors
            ? displayAuthors.map(author => {
                return (
                  <tr key={author.id}>
                    <td>
                      <Link to={`/author/${author.id}`}>{author.name}</Link>
                    </td>
                    <td>{author.totalCourse}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDeleteClick(author)}
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
}

AuthorList.propTypes = {
  displayAuthors: PropTypes.array.isRequired,
  totalAuthors: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onTHClick: PropTypes.func.isRequired
};
