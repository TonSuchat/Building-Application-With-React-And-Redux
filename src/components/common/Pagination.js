import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Pagination({ dataLength, onPaginationClicked, pageSize }) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(Math.ceil(dataLength / pageSize));

  useEffect(() => {
    setPage(1);
    setTotalPage(Math.ceil(dataLength / pageSize));
  }, [dataLength, pageSize]);

  function handleClick(inputPage) {
    setPage(inputPage);
    onPaginationClicked(inputPage);
  }

  return (
    <nav className="float-right" aria-label="...">
      <ul className="pagination">
        <li className={page === 1 ? "page-item disabled" : "page-item"}>
          <Link
            className="page-link"
            to="#"
            tabIndex="-1"
            aria-disabled="true"
            onClick={() => handleClick(1)}
          >
            {"<<"}
          </Link>
        </li>
        {[...Array(totalPage).keys()].map((item, index) => (
          <li
            key={index}
            className={index + 1 === page ? "page-item active" : "page-item"}
          >
            <Link
              className="page-link"
              to="#"
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </Link>
          </li>
        ))}
        <li className={page === totalPage ? "page-item disabled" : "page-item"}>
          <Link
            className="page-link"
            to="#"
            onClick={() => handleClick(totalPage)}
          >
            {">>"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  onPaginationClicked: PropTypes.func.isRequired,
  dataLength: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default Pagination;
