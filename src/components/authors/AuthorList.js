import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function AuthorList({ authors, onDeleteClick }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Total course</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {authors
          ? authors.map(author => {
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
  );
}

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};
