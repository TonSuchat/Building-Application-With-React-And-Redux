import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../tools/mockData";
import { MemoryRouter } from "react-router-dom";
import { ManageCoursePage } from "./ManageCoursePage";

function render(args) {
  const defaultProps = {
    courses,
    authors,
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    saveCourse: jest.fn(),
    course: newCourse,
    history: {},
    match: {}
  };

  const props = { ...defaultProps, ...args };
  return mount(
    <MemoryRouter>
      <ManageCoursePage {...props} />
    </MemoryRouter>
  ).mount("ManageCoursePage");
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});

it("should set 'when' in prompt to 'true' when edited datas", () => {
  const wrapper = render();
  wrapper
    .find("input[name='title']")
    .simulate("change", { target: { value: "abc" } });
  const prompt = wrapper.find("Prompt");
  expect(prompt.props().when).toBe(true);
});
