import React from "react";
import { act } from "react-dom/test-utils";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import mockAxios from "axios";
import CurrencyConverter from "../src/components/CurrencyConverter";

describe("CurrencyConverter", () => {
  let cc;
  let findRate;
  let currSrc;
  let currDest;
  let currDate;
  let reset;
  let result;

  describe("renders correct HTML elements", () => {
    beforeEach(() => {
      cc = mount(<CurrencyConverter />);
      findRate = cc.find(".find-rate").hostNodes();
      currSrc = cc.find(".currency-source").hostNodes();
      currDest = cc.find(".currency-destination").hostNodes();
      currDate = cc.find(".currency-date").hostNodes();
      reset = cc.find(".reset-fields").hostNodes();
      result = cc.find(".conversion-result").hostNodes();
    });
    afterEach(() => jest.resetAllMocks());
  
    it('should have a "find-rate" button', () => {
      expect(findRate.exists()).toBe(true);
      expect(findRate).toHaveLength(1);
    });
    
    it('should have a "currency-source" input field', () => {
      expect(currSrc.exists()).toBe(true);
      expect(currSrc).toHaveLength(1);
    });
    
    it('should have a "currency-dest" input field', () => {
      expect(currDest.exists()).toBe(true);
      expect(currDest).toHaveLength(1);
    });
    
    it('should have a "currency-date" input field', () => {
      expect(currDate.exists()).toBe(true);
      expect(currDate).toHaveLength(1);
    });
  
    it('should have a "reset-fields" button', () => {
      expect(reset.exists()).toBe(true);
      expect(reset).toHaveLength(1);
    });
    
    it('should have a "conversion-result" input field', () => {
      expect(result.exists()).toBe(true);
      expect(result).toHaveLength(1);
    });
  });
  
  describe("handles form input correctly", () => {
    beforeEach(() => {
      cc = mount(<CurrencyConverter />);
      findRate = cc.find(".find-rate").hostNodes();
      currSrc = cc.find(".currency-source").hostNodes();
      currDest = cc.find(".currency-destination").hostNodes();
      currDate = cc.find(".currency-date").hostNodes();
      reset = cc.find(".reset-fields").hostNodes();
      result = cc.find(".conversion-result").hostNodes();
    });
    afterEach(() => jest.resetAllMocks());
  
    test('"currency-source" should uppercase alphabetical input', () => {
      currSrc.simulate("change", { target: { value: "abc" } });
      expect(currSrc.instance().value).toEqual("ABC");
      currSrc.simulate("change", { target: { value: "" } });
    });
    
    test('"currency-source" should limit input to 3 letters', () => {
      currSrc.simulate("change", { target: { value: "abCd" } });
      expect(currSrc.instance().value).toEqual("ABC");
      currSrc.simulate("change", { target: { value: "" } });
    });
    
    test('"currency-source" should reject non-alphabetical input', () => {
      const input = "123456789!@#$%^&*().,;'[]{}\\|'\"`~:";
      currSrc.simulate("change", { target: { value: input } });
      expect(currSrc.instance().value).toEqual("");
    });
    
    test('"currency-dest" should uppercase alphabetical input', () => {
      currDest.simulate("change", { target: { value: "abc" } });
      expect(currDest.instance().value).toEqual("ABC");
      currDest.simulate("change", { target: { value: "" } });
    });
    
    test('"currency-dest" should limit input to 3 letters', () => {
      currDest.simulate("change", { target: { value: "abCd" } });
      expect(currDest.instance().value).toEqual("ABC");
      currDest.simulate("change", { target: { value: "" } });
    });
    
    test('"currency-dest" should reject non-alphabetical input', () => {
      const input = "123456789!@#$%^&*().,;'[]{}\\|'\"`~:-";
      currDest.simulate("change", { target: { value: input } });
      expect(currDest.instance().value).toEqual("");
    });
    
    test('"currency-date" should accept digit and hyphen input', () => {
      currDate.simulate("change", { target: { value: "2019-01-01" } });
      expect(currDate.instance().value).toEqual("2019-01-01");
      currDate.simulate("change", { target: { value: "" } });
    });
    
    test('"currency-date" should limit input to 10 characters', () => {
      currDate.simulate("change", { target: { value: "2019-02-021" } });
      expect(currDate.instance().value).toEqual("2019-02-02");
      currDate.simulate("change", { target: { value: "" } });
    });
    
    test('"currency-date" should reject non-digit or hyphen input', () => {
      const input = "!@#$%^&*().,;'[]{}\\|'\"`~:abcdefghijklmnopqrstuvwxyz";
      currDate.simulate("change", { target: { value: input } });
      expect(currDate.instance().value).toEqual("");
    });
    
    it('should show correct error in "conversion-result" on incomplete symbol', async () => {
      currDate.simulate("change", { target: { value: "2012-02-02" } });
      currSrc.simulate("change", { target: { value: "US" } });
      currDest.simulate("change", { target: { value: "EUR" } });
      const expected = "Please complete each field";
      mockAxios.get.mockImplementationOnce(() => Promise.resolve(
        {
          "data": {
            "rates": {
              "EUR": 0.7637085688
            },
            "base": "USD",
            "date": "2012-02-02"
          },
          "status": 200,
          "statusText": "",
          "headers": {
            "content-type": "application/json",
            "cache-control": "public, max-age=1800",
            "expires": "Sat, 20 Jul 2019 02:01:47 GMT"
          },
          "config": {
            "transformRequest": {},
            "transformResponse": {},
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "headers": {
              "Accept": "application/json, text/plain, */*"
            },
            "method": "get",
            "url": "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates/historical?date=2012-02-02&base=USD&symbols=EUR"
          },
          "request": {}
        }
      ));
      expect(mockAxios.get).toHaveBeenCalledTimes(0);
      findRate.simulate("click");
      await act(() => new Promise(setImmediate));
      cc.update();
      expect(mockAxios.get).toHaveBeenCalledTimes(0);
      expect(result.text()).toEqual(expected);
    });
    
    it('should show correct error in "conversion-result" on incomplete date', async () => {
      currDate.simulate("change", { target: { value: "2012-02-0" } });
      currSrc.simulate("change", { target: { value: "USD" } });
      currDest.simulate("change", { target: { value: "EUR" } });
      const expected = "Please complete each field";
      mockAxios.get.mockImplementationOnce(() => Promise.resolve(
        {
          "data": {
            "rates": {
              "EUR": 0.7637085688
            },
            "base": "USD",
            "date": "2012-02-02"
          },
          "status": 200,
          "statusText": "",
          "headers": {
            "content-type": "application/json",
            "cache-control": "public, max-age=1800",
            "expires": "Sat, 20 Jul 2019 02:01:47 GMT"
          },
          "config": {
            "transformRequest": {},
            "transformResponse": {},
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "headers": {
              "Accept": "application/json, text/plain, */*"
            },
            "method": "get",
            "url": "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates/historical?date=2012-02-02&base=USD&symbols=EUR"
          },
          "request": {}
        }
      ));
      findRate.simulate("click");
      await act(() => new Promise(setImmediate));
      cc.update();
      expect(mockAxios.get).toHaveBeenCalledTimes(0);
      expect(result.text()).toEqual(expected);
    });
  });
  
  describe("performs requests", () => {
    beforeEach(() => {
      cc = mount(<CurrencyConverter />);
      findRate = cc.find(".find-rate").hostNodes();
      currSrc = cc.find(".currency-source").hostNodes();
      currDest = cc.find(".currency-destination").hostNodes();
      currDate = cc.find(".currency-date").hostNodes();
      reset = cc.find(".reset-fields").hostNodes();
      result = cc.find(".conversion-result").hostNodes();
    });
    afterEach(() => jest.resetAllMocks());
    
    it('should call the `axios.get` function and put the result in the "conversion-result" element upon success', async () => {
      currDate.simulate("change", { target: { value: "2007-11-13" } });
      currSrc.simulate("change", { target: { value: "JPY" } });
      currDest.simulate("change", { target: { value: "GBP" } });
      const expected = "0.06082815060048688";
      mockAxios.get.mockImplementationOnce(() => Promise.resolve(
        {
          "data": {
            "rates": {
              "GBP": 0.06082815060048688
            },
            "base": "JPY",
            "date": "2007-11-13"
          },
          "status": 200,
          "statusText": "",
          "headers": {
            "content-type": "application/json",
            "cache-control": "public, max-age=1800",
            "expires": "Sat, 20 Jul 2036 02:04:51 GMT"
          },
          "config": {
            "transformRequest": {},
            "transformResponse": {},
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "headers": {
              "Accept": "application/json, text/plain, */*"
            },
            "method": "get",
            "url": "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates/historical?date=2007-11-13&base=JPY&symbols=GBP"
          },
          "request": {}
        }
      ));
      findRate.simulate("click");
      await act(() => new Promise(setImmediate));
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(result.text()).toEqual(expected);
    });
    
    it('should call the `axios.get` function and put the result in the "conversion-result" element upon src symbol error', async () => {
      const expected = "Base 'XYZ' is not supported.";
      currDate.simulate("change", { target: { value: "2000-02-02" } });
      currSrc.simulate("change", { target: { value: "XYZ" } });
      currDest.simulate("change", { target: { value: "USD" } });
      mockAxios.get.mockImplementationOnce(() => Promise.reject(
        {
          "config": {
            "transformRequest": {},
            "transformResponse": {},
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "headers": {
              "Accept": "application/json, text/plain, */*"
            },
            "method": "get",
            "url": "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates/historical?date=2000-02-02&base=XYZ&symbols=USD"
          },
          "request": {},
          "response": {
            "data": {
              "error": "Base 'XYZ' is not supported."
            },
            "status": 400,
            "statusText": "",
            "headers": {
              "content-type": "application/json"
            },
            "config": {
              "transformRequest": {},
              "transformResponse": {},
              "timeout": 0,
              "xsrfCookieName": "XSRF-TOKEN",
              "xsrfHeaderName": "X-XSRF-TOKEN",
              "maxContentLength": -1,
              "headers": {
                "Accept": "application/json, text/plain, */*"
              },
              "method": "get",
              "url": "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates/historical?date=2000-02-02&base=XYZ&symbols=USD"
            },
            "request": {}
          }
        }
      ));
      findRate.simulate("click");
      await act(() => new Promise(setImmediate));
      cc.update();
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(result.text()).toEqual(expected);
    });
    
    it('should call the `axios.get` function and put the result in the "conversion-result" element upon dest symbol error', async () => {
      const expected = "Symbols 'XYZ' are invalid for date 1999-12-31.";
      currDate.simulate("change", { target: { value: "1999-12-31" } });
      currSrc.simulate("change", { target: { value: "sek" } });
      currDest.simulate("change", { target: { value: "XYZ" } });
      mockAxios.get.mockImplementationOnce(() => Promise.reject(
        {
          "config": {
            "transformRequest": {},
            "transformResponse": {},
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "headers": {
              "Accept": "application/json, text/plain, */*"
            },
            "method": "get",
            "url": "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates/historical?date=1999-12-31&base=SEK&symbols=XYZ"
          },
          "request": {},
          "response": {
            "data": {
              "error": "Symbols 'XYZ' are invalid for date 1999-12-31."
            },
            "status": 400,
            "statusText": "",
            "headers": {
              "content-type": "application/json"
            },
            "config": {
              "transformRequest": {},
              "transformResponse": {},
              "timeout": 0,
              "xsrfCookieName": "XSRF-TOKEN",
              "xsrfHeaderName": "X-XSRF-TOKEN",
              "maxContentLength": -1,
              "headers": {
                "Accept": "application/json, text/plain, */*"
              },
              "method": "get",
              "url": "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates/historical?date=1999-12-31&base=SEK&symbols=XYZ"
            },
            "request": {}
          }
        }
      ));
      expect(mockAxios.get).toHaveBeenCalledTimes(0);
      findRate.simulate("click");
      await act(() => new Promise(setImmediate));
      cc.update();
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(result.text()).toEqual(expected);
    });
    
    it('should call the `axios.get` function and put the result in the "conversion-result" element upon date formatting error', async () => {
      const expected = "time data '1999-52-31' does not match format '%Y-%m-%d'";
      currDate.simulate("change", { target: { value: "1999-52-31" } });
      currSrc.simulate("change", { target: { value: "gbp" } });
      currDest.simulate("change", { target: { value: "jpy" } });
      mockAxios.get.mockImplementationOnce(() => Promise.reject(
        {
          "config": {
            "transformRequest": {},
            "transformResponse": {},
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "headers": {
              "Accept": "application/json, text/plain, */*"
            },
            "method": "get",
            "url": "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates/historical?date=1999-52-31&base=GBP&symbols=JPY"
          },
          "request": {},
          "response": {
            "data": {
              "error": "time data '1999-52-31' does not match format '%Y-%m-%d'"
            },
            "status": 400,
            "statusText": "",
            "headers": {
              "content-type": "application/json"
            },
            "config": {
              "transformRequest": {},
              "transformResponse": {},
              "timeout": 0,
              "xsrfCookieName": "XSRF-TOKEN",
              "xsrfHeaderName": "X-XSRF-TOKEN",
              "maxContentLength": -1,
              "headers": {
                "Accept": "application/json, text/plain, */*"
              },
              "method": "get",
              "url": "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates/historical?date=1999-52-31&base=GBP&symbols=JPY"
            },
            "request": {}
          }
        }
      ));
      expect(mockAxios.get).toHaveBeenCalledTimes(0);
      findRate.simulate("click");
      await act(() => new Promise(setImmediate));
      cc.update();
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(result.text()).toEqual(expected);
    });
  });
});
