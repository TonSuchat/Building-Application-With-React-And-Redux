import * as authorActions from "./authorActions";
import * as types from "./actionTypes";
import { authors } from "../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Authors Thunk", () => {
    it("should create BEGEN_API_CALL and LOAD_AUTHORS_SUCCESS when loading authors", () => {
      fetchMock.mock("*", {
        body: authors,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_AUTHORS_SUCCESS, authors }
      ];

      const store = mockStore({ authors: [] });
      return store.dispatch(authorActions.loadAuthors()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("Delete Author Thunk", () => {
    it("should create DELETE_AUTHOR_OPTIMISTIC when delete author", () => {
      fetchMock.mock("*", {
        body: authors.splice(0, 1),
        headers: { "content-type": "application/json" }
      });
      const deleteAuthor = authors[0];
      const expectedActions = [
        {
          type: types.DELETE_AUTHOR_OPTIMISTIC,
          author: deleteAuthor
        }
      ];
      const store = mockStore({ authors, courses: [] });
      return store
        .dispatch(authorActions.deleteAuthor(deleteAuthor))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should throw error when delete author that existing in courses", () => {
      const mockAuthors = [{ id: 1, name: "Bob" }];
      const mockCourses = [
        { id: 1, title: "React Beginner", authorId: 1, category: "Javascript" }
      ];
      const store = mockStore({ courses: mockCourses, authors: mockAuthors });
      try {
        store.dispatch(authorActions.deleteAuthor(mockAuthors[0]));
      } catch (error) {
        expect(error.message).toBe(
          "Can't delete author, There're still courses of this author."
        );
      }
    });
  });

  describe("Save Authors Thunk", () => {
    it("should create BEGEN_API_CALL and CREATE_AUTHORS_SUCCESS when save authors", () => {
      const author = { ...authors[0], id: null };
      fetchMock.mock("*", {
        body: author,
        headers: { "content-type": "application/json" }
      });
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.CREATE_AUTHOR_SUCCESS, author }
      ];

      const store = mockStore({ authors: [] });
      return store.dispatch(authorActions.saveAuthor(author)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("should create BEGEN_API_CALL and UPDATE_AUTHORS_SUCCESS when save authors", () => {
      const author = { ...authors[0] };
      fetchMock.mock("*", {
        body: author,
        headers: { "content-type": "application/json" }
      });
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.UPDATE_AUTHOR_SUCCESS, author }
      ];

      const store = mockStore({ authors: [] });
      return store.dispatch(authorActions.saveAuthor(author)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("loadAuthorsSuccess", () => {
  it("should create a LOAD_AUTHORS_SUCCESS action", () => {
    // arrange
    const expectedAction = {
      type: types.LOAD_AUTHORS_SUCCESS,
      authors
    };
    // act
    const action = authorActions.loadAuthorsSuccess(authors);
    // assert
    expect(action).toEqual(expectedAction);
  });
});

describe("deleteAuthorOptimistic", () => {
  it("should create a DELETE_AUTHOR_OPTIMISTIC action", () => {
    // arrange
    const author = { id: 1, name: "Bob" };
    const expectedAction = { type: types.DELETE_AUTHOR_OPTIMISTIC, author };
    // act
    const action = authorActions.deleteAuthorOptimistic(author);
    // assert
    expect(action).toEqual(expectedAction);
  });
});
