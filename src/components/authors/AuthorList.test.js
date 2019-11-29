import React from "react";
import { mount } from "enzyme";
import { authors } from "../../tools/mockData";
import { MemoryRouter } from "react-router-dom";
import AuthorList from "./AuthorList";

const defaultProps = {
  authors,
  onDeleteClick: jest.fn()
};

function render(args) {
  const props = { ...defaultProps, ...args };
  return mount(
    <MemoryRouter>
      <AuthorList {...props} />
    </MemoryRouter>
  ).mount("CourseList");
}

it("should render table properly", () => {
  const wrapper = render();
  expect(wrapper.find("table").length).toEqual(1);
  expect(wrapper.find("th").length).toEqual(3);
});

it("should show total records properly", () => {
  const wrapper = render();
  expect(wrapper.find("p").text()).toEqual("Total: 3 records");
});
