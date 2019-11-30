import React from "react";
import { mount } from "enzyme";
import { courses, authors } from "../../tools/mockData";
import { MemoryRouter } from "react-router-dom";
import { CoursesPage } from "./CoursesPage";

const pageSize = 5;

const defaultProps = {
  courses,
  authors,
  loading: false,
  loadCourses: jest.fn(),
  deleteCourse: jest.fn(),
  loadAuthors: jest.fn()
};

function render(args) {
  const props = { ...defaultProps, ...args };
  return mount(
    <MemoryRouter>
      <CoursesPage {...props} />
    </MemoryRouter>
  ).mount("CoursesPage");
}

it("should render Spinner when loading is true", () => {
  const wrapper = render({ loading: true });
  expect(wrapper.find("Spinner").length).toEqual(1);
});

it("should render properly when loading is false", () => {
  const wrapper = render();
  expect(wrapper.find("Spinner").length).toEqual(0);
  expect(wrapper.find("SearchInput").length).toEqual(1);
  expect(wrapper.find("CourseList").length).toEqual(1);
  expect(wrapper.find("Pagination").length).toEqual(1);
});
