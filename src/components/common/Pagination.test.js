import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Pagination from "./Pagination";

const pageSize = 5;
const defaultProps = {
  dataLength: 10,
  pageSize,
  onPaginationClicked: jest.fn()
};

function render(args) {
  const props = { ...defaultProps, ...args };
  return mount(
    <MemoryRouter>
      <Pagination {...props} />
    </MemoryRouter>
  ).mount("Pagination");
}

it("should render buttons properly", () => {
  const wrapper = render();
  expect(
    wrapper
      .find("Link")
      .first()
      .text()
  ).toEqual("<<");
  expect(
    wrapper
      .find("Link")
      .last()
      .text()
  ).toEqual(">>");
  expect(wrapper.find("Link").length).toEqual(4);
});
