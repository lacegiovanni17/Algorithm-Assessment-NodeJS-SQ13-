import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import sinon from "sinon";
import Counter from "../src/Counter";

describe("Counter", () => {
  test("has an element with a 'counter' class", () => {
    const wrapper = mount(<Counter />);
    expect(wrapper.exists(".counter")).toBe(true);
  });
  
  test("has an element with an 'increment' class", () => {
    const wrapper = mount(<Counter />);
    expect(wrapper.exists(".increment")).toBe(true);
  });
  
  test("has an element with a 'decrement' class", () => {
    const wrapper = mount(<Counter />);
    expect(wrapper.exists(".decrement")).toBe(true);
  });
  
  test("shows inital value", () => {
    const wrapper = mount(<Counter />);
    expect(wrapper.find('.counter').text()).toEqual("0");
  });
  
  it("increments counter by 1 when increment button is clicked", () => {
    const wrapper = mount(<Counter />);
    wrapper.find(".increment").simulate("click");
    expect(wrapper.find(".counter").text()).toEqual("1");
  });
  
  it("decrements counter by 1 when decrement button is clicked", () => {
    const wrapper = mount(<Counter />);
    wrapper.find(".decrement").simulate("click");
    expect(wrapper.find(".counter").text()).toEqual("-1");
  });
});