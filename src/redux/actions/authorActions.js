import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function deleteAuthorOptimistic(author) {
  return { type: types.DELETE_AUTHOR_OPTIMISTIC, author };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => dispatch(loadAuthorsSuccess(authors)))
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function canDeleteAuthor(courses, deleteAuthor) {
  if (!!courses && !!deleteAuthor)
    return (
      courses.filter(course => course.authorId === deleteAuthor.id).length === 0
    );
  return false;
}

export function deleteAuthor(author) {
  return function(dispatch, getState) {
    const { courses } = getState();
    if (!canDeleteAuthor(courses, author)) {
      throw new Error(
        "Can't delete author, There're still courses of this author."
      );
    }
    dispatch(deleteAuthorOptimistic(author));
    return authorApi.deleteAuthor(author.id);
  };
}

export function saveAuthor(author) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .saveAuthor(author)
      .then(saveAuthor => {
        if (author.id) dispatch(updateAuthorSuccess(saveAuthor));
        else dispatch(createAuthorSuccess(saveAuthor));
      })
      .catch(error => {
        throw error;
      });
  };
}
