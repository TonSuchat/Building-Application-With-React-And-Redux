import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors, deleteAuthor } from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import { Redirect } from "react-router-dom";
import AuthorList from "./AuthorList";
import { isLoading } from "../../helpers/utility";
import { toast } from "react-toastify";

export function AuthorsPage({
  loadCourses,
  loadAuthors,
  deleteAuthor,
  authors,
  courses,
  loading
}) {
  const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error =>
        console.log("Loading courses failed", error)
      );
    }

    if (authors.length === 0) {
      loadAuthors().catch(error =>
        console.log("Loading authors failed", error)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(author) {
    try {
      await deleteAuthor(author);
    } catch (error) {
      toast.error(`Delete failed: ${error.message}`, { autoClose: false });
    }
  }

  return (
    <>
      {redirectToAddAuthorPage && <Redirect to="/author" />}
      <h2>Authors</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="btn btn-primary add-course mb-3"
            onClick={() => setRedirectToAddAuthorPage(true)}
          >
            Add Author
          </button>
          {authors.length > 0 && (
            <AuthorList authors={authors} onDeleteClick={handleDelete} />
          )}
        </>
      )}
    </>
  );
}

AuthorsPage.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    authors:
      state.authors.length === 0
        ? []
        : state.authors.map(author => ({
            ...author,
            totalCourse: state.courses.filter(
              course => course.authorId === author.id
            ).length
          })),
    courses: state.courses,
    loading: isLoading(state)
  };
};

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteAuthor
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
