import React from "react";
import { mount } from "enzyme";
import { courses } from "../../tools/mockData";
import { MemoryRouter } from "react-router-dom";
import CourseList from "./CourseList";
import { customSort } from "../../helpers/utility";

const pageSize = 5;
const displayCourses = courses.slice(0, pageSize);

const defaultProps = {
  displayCourses,
  totalCourse: courses.length,
  onDeleteClick: jest.fn(),
  onTHClick: jest.fn()
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

it("should initial sort by 'id' properly", () => {
  const wrapper = render();
  expect(wrapper.props().children.props.displayCourses).toEqual(displayCourses);
});

it("should sorting properly", () => {
  const wrapper = render();
  expect(wrapper.props().children.props.displayCourses).toEqual(
    courses.slice(0, pageSize)
  );
  wrapper
    .find("th")
    .at(1)
    .simulate("click");
  const sortBySlug = customSort(displayCourses, "slug", true);
  expect(wrapper.props().children.props.displayCourses).toEqual(sortBySlug);
});
