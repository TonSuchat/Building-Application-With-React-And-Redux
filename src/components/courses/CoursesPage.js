import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import CourseList from "./CourseList";

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors } = this.props;

    if (courses.length === 0) {
      this.props
        .loadCourses()
        .catch(error => console.log("Loading courses failed", error));
    }

    if (authors.length === 0) {
      this.props
        .loadAuthors()
        .catch(error => console.log("Loading authors failed", error));
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          className="btn btn-primary add-course mb-3"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
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
    authors: state.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCourses: () => dispatch(courseActions.loadCourses()),
    loadAuthors: () => dispatch(authorActions.loadAuthors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
