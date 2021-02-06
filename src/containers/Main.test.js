import React from "react";
import mockAxios from "axios";
import { Main } from "./Main";
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

let wrapper;

const wrapperMount = (node, opts) => {
  let attachTo = document.createElement('div');
  document.body.appendChild(attachTo);
  wrapper = mount(node, { ...opts, attachTo });
  return wrapper;
}

jest.mock("axios");
describe("Main", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    wrapperMount(<Main></Main>);
    expect(wrapper.find('Main').length).toEqual(1);
  });

  it("should not load anything if empty", async () => {
    wrapperMount(<Main></Main>);
    expect(mockAxios.get).toHaveBeenCalledTimes(0);
  });

})