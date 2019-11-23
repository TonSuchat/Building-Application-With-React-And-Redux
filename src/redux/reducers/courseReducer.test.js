import courseReducer from "./courseReducer";
import * as courseActions from "../actions/courseActions";

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [{ title: "a" }, { title: "b" }];
  const newCourse = { title: "c" };
  const action = courseActions.createCourseSuccess(newCourse);
  // act
  const newState = courseReducer(initialState, action);
  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("a");
  expect(newState[1].title).toEqual("b");
  expect(newState[2].title).toEqual("c");
});

it("should update course when passed UPDATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, title: "a" },
    { id: 2, title: "b" }
  ];
  const course = { id: 2, title: "b update" };
  const action = courseActions.updateCourseSuccess(course);
  // action
  const newState = courseReducer(initialState, action);
  // assert
  expect(newState.length).toEqual(2);
  expect(newState[0].title).toEqual("a");
  expect(newState[1].title).toEqual("b update");
});
