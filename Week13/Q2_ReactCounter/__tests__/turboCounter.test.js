import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import sinon from "sinon";
import TurboCounter from "../src/TurboCounter";

let wrapper;

describe("TurboCounter", () => {
  describe("basic counter functionality", () => {
    beforeEach(() => {
      wrapper = mount(<TurboCounter />);
    });

    test("has an element with a '.counter' class", () => {
      expect(wrapper.exists(".counter")).toBe(true);
    });

    test("has an element with an '.increment' class", () => {
      expect(wrapper.exists(".increment")).toBe(true);
    });

    test("has an element with a '.decrement' class", () => {
      expect(wrapper.exists(".decrement")).toBe(true);
    });

    test("'.counter' shows an inital value of 0", () => {
      expect(wrapper.find(".counter").text()).toEqual("0");
    });

    test("increments counter by 1 when increment button is clicked", () => {
      wrapper.find(".increment").simulate("click");
      expect(wrapper.find(".counter").text()).toEqual("1");
    });

    test("decrements counter by 1 when decrement button is clicked", () => {
      wrapper.find(".decrement").simulate("click");
      expect(wrapper.find(".counter").text()).toEqual("-1");
    });
  });

  describe("step size controller functionality", () => {
    beforeEach(() => {
      wrapper = mount(<TurboCounter />);
    });

    test("has an element with a '.step-size' class", () => {
      expect(wrapper.exists(".step-size")).toBe(true);
    });

    test("has an element with an '.increment-step-size' class", () => {
      expect(wrapper.exists(".increment-step-size")).toBe(true);
    });

    test("has an element with a '.decrement-step-size' class", () => {
      expect(wrapper.exists(".decrement-step-size")).toBe(true);
    });

    test("'.step-size' shows an inital value of 1", () => {
      expect(wrapper.find(".step-size").text()).toEqual("1");
    });

    test("increments step size by 1 when '.increment-step-size' button is clicked", () => {
      wrapper.find(".increment-step-size").simulate("click");
      expect(wrapper.find(".step-size").text()).toEqual("2");
    });

    test("decrements step size by 1 when '.decrement-step-size' button is clicked", () => {
      wrapper.find(".increment-step-size").simulate("click");
      expect(wrapper.find(".step-size").text()).toEqual("2");
      wrapper.find(".decrement-step-size").simulate("click");
      expect(wrapper.find(".step-size").text()).toEqual("1");
    });

    test("doesn't go below 1", () => {
      wrapper.find(".decrement-step-size").simulate("click");
      expect(wrapper.find(".step-size").text()).toEqual("1");
    });

    test("increment works repeatedly, increasing the value to 5", () => {
      for (let i = 2; i < 6; i++) {
        wrapper.find(".increment-step-size").simulate("click");
        expect(wrapper.find(".step-size").text()).toEqual("" + i);
      }
    });
  });

  describe("step size and counter operate together", () => {
    beforeEach(() => {
      wrapper = mount(<TurboCounter />);
    });

    test("increments counter by 5 when increment button is clicked", () => {
      for (let i = 0; i < 4; i++) {
        wrapper.find(".increment-step-size").simulate("click");
      }

      expect(wrapper.find(".counter").text()).toEqual("0");
      wrapper.find(".increment").simulate("click");
      expect(wrapper.find(".counter").text()).toEqual("5");
    });

    test("decrements counter by 5 when decrement button is clicked", () => {
      for (let i = 0; i < 4; i++) {
        wrapper.find(".increment-step-size").simulate("click");
      }

      wrapper.find(".decrement").simulate("click");
      expect(wrapper.find(".counter").text()).toEqual("-5");
    });

    test("should work on multiple operations", () => {
      wrapper.find(".increment-step-size").simulate("click");
      expect(wrapper.find(".step-size").text()).toEqual("2");
      wrapper.find(".increment").simulate("click");
      expect(wrapper.find(".counter").text()).toEqual("2");
      wrapper.find(".increment-step-size").simulate("click");
      expect(wrapper.find(".step-size").text()).toEqual("3");
      wrapper.find(".increment").simulate("click");
      expect(wrapper.find(".counter").text()).toEqual("5");
      wrapper.find(".decrement").simulate("click");
      expect(wrapper.find(".counter").text()).toEqual("2");
    });
  });
});
