import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(saveCourse) {
  return { type: types.UPDATE_COURSE_SUCCESS, course: saveCourse };
}

export function createCourseSuccess(saveCourse) {
  return { type: types.CREATE_COURSE_SUCCESS, course: saveCourse };
}

export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => dispatch(loadCoursesSuccess(courses)))
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch) {
    return courseApi
      .saveCourse(course)
      .then(saveCourse => {
        course.id
          ? dispatch(updateCourseSuccess(saveCourse))
          : dispatch(createCourseSuccess(saveCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}
