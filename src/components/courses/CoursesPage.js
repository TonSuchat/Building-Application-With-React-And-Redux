import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { loadCourses, deleteCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseList from "./CourseList";
import Pagination from "../common/Pagination";
import SearchInput from "../common/SearchInput";
import { toast } from "react-toastify";
import { isLoading, objectFilter } from "../../helpers/utility";

export function CoursesPage({
  courses,
  authors,
  loading,
  loadCourses,
  deleteCourse,
  loadAuthors
}) {
  const pageSize = 5;
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourses, setFilterCourses] = useState(courses);
  const [displayCourses, setDisplayCourses] = useState(courses);

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

  useEffect(() => {
    if (!searchQuery) setFilterCourses(courses);
    else {
      setFilterCourses(
        objectFilter(courses, searchQuery, [
          "title",
          "authorName",
          "slug",
          "category"
        ])
      );
    }
  }, [searchQuery, courses]);

  useEffect(() => {
    getCoursesByPage(filterCourses, 1);
  }, [filterCourses]);

  async function handleDeleteCourse(course) {
    toast.success("Course deleted");
    try {
      await deleteCourse(course);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  }

  function handleSearch(event) {
    const { value } = event.target;
    setSearchQuery(value);
  }

  function getCoursesByPage(courses, page) {
    setDisplayCourses(courses.slice(pageSize * (page - 1), pageSize * page));
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
          <SearchInput
            name="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search courses..."
          />
          {displayCourses.length > 0 && (
            <>
              <CourseList
                displayCourses={displayCourses}
                totalCourse={filterCourses.length}
                onDeleteClick={handleDeleteCourse}
              />
              <Pagination
                dataLength={filterCourses.length}
                pageSize={pageSize}
                onPaginationClicked={page =>
                  getCoursesByPage(filterCourses, page)
                }
              />
            </>
          )}
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
