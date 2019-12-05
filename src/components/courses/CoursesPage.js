import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { loadCourses, deleteCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CustomList from "../common/CustomList";
import { toast } from "react-toastify";
import { isLoading } from "../../helpers/utility";

export function CoursesPage({
  courses,
  authors,
  loading,
  loadCourses,
  deleteCourse,
  loadAuthors
}) {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

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

  async function handleDeleteCourse(course) {
    toast.success("Course deleted");
    try {
      await deleteCourse(course);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  }

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="btn btn-primary add-course mb-3"
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>
          <CustomList
            data={courses}
            dataType="Course"
            handleDeleteData={handleDeleteCourse}
            filterProps={["title", "authorName", "slug", "category"]}
          />
        </>
      )}
    </>
  );
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadCourses: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    courses:
      state.courses.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(i => i.id === course.authorId)
                ? state.authors.find(i => i.id === course.authorId).name
                : ""
            };
          }),
    authors: state.authors,
    loading: isLoading(state)
  };
};

const mapDispatchToProps = {
  loadCourses,
  deleteCourse,
  loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
