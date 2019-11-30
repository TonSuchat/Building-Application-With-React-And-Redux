import React from "react";
import { mount } from "enzyme";
import { courses } from "../../tools/mockData";
import { MemoryRouter } from "react-router-dom";
import CourseList from "./CourseList";

const pageSize = 5;

const defaultProps = {
  displayCourses: courses.slice(0, pageSize),
  totalCourse: courses.length,
  onDeleteClick: jest.fn()
};

function render(args) {
  const props = { ...defaultProps, ...args };
  return mount(
    <MemoryRouter>
      <CourseList {...props} />
    </MemoryRouter>
  ).mount("CourseList");
}

it("should render table properly", () => {
  const wrapper = render();
  expect(wrapper.find("table").length).toEqual(1);
  expect(wrapper.find("th").length).toEqual(5);
});

it("should show total records properly", () => {
  const wrapper = render();
  expect(wrapper.find("p").text()).toEqual("Total: 10 records");
});
