import { isLoading, objectFilter } from "./utility";

it("should return loading when apiCall more than 0", () => {
  const state = { apiCallInProgress: 1 };
  expect(isLoading(state)).toBe(true);
});

it("should return not loading when apiCall equal/less than 0", () => {
  const state = { apiCallInProgress: 0 };
  expect(isLoading(state)).toBe(false);
});

it("should filter data properly", () => {
  const source = [
    { title: "react-big-picture", category: "Javascript" },
    { title: "writing-clean-code", category: "Software Practices" },
    { title: "react-redux", category: "Javascript" }
  ];
  const properties = ["title", "category"];
  // filter by category / lowercase
  let query = "javascript";
  let result = objectFilter(source, query, properties);
  expect(result.length).toEqual(2);
  // filter by title
  query = "rea";
  result = objectFilter(source, query, properties);
  expect(result.length).toEqual(2);
  expect(result[0].title.indexOf(query) > -1).toBe(true);
  expect(result[1].title.indexOf(query) > -1).toBe(true);
  // filter by title
  query = "wri";
  result = objectFilter(source, query, properties);
  expect(result.length).toEqual(1);
});
