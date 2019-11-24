import authorReducer from "./authorReducer";
import * as authorActions from "../actions/authorActions";
import { authors } from "../../tools/mockData";

it("should return initial state properly", () => {
  // arrange
  const initialState = [];
  // act
  const newState = authorReducer(initialState, {});
  // assert
  expect(newState.length).toEqual(0);
});

it("should return authors when passed LOAD_AUTHORS_SUCCESS", () => {
  // arrange
  const initialState = [];
  const action = authorActions.loadAuthorsSuccess(authors);
  // act
  const newState = authorReducer(initialState, action);
  // assert
  expect(newState.length).toEqual(3);
  expect(newState).toEqual(authors);
});

it("should delete author when passed DELETE_AUTHOR_OPTIMISTIC", () => {
  // arrange
  const initialState = authors;
  const deleteAuthors = authors[0];
  const action = authorActions.deleteAuthorOptimistic(deleteAuthors);
  // act
  const newState = authorReducer(initialState, action);
  // assert
  expect(newState.length).toEqual(2);
  expect(newState[0].id).toEqual(2);
  expect(newState[1].id).toEqual(3);
});

it("should create author when passed CREATE_AUTHOR_SUCCESS", () => {
  // arrange
  const initialState = authors;
  const author = { id: authors.length + 1, name: "New author" };
  const action = authorActions.createAuthorSuccess(author);
  // act
  const newState = authorReducer(initialState, action);
  // assert
  expect(newState.length).toEqual(4);
  expect(newState[3].name).toBe("New author");
});

it("should update author when passed UPDATE_AUTHOR_SUCCESS", () => {
  // arrange
  const initialState = authors;
  const author = { ...authors[0], name: "Update name" };
  const action = authorActions.updateAuthorSuccess(author);
  // act
  const newState = authorReducer(initialState, action);
  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].name).toBe("Update name");
});
