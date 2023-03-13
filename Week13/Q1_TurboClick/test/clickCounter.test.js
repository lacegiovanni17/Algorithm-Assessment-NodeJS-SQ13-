require("util").inspect.defaultOptions.depth = null;
const baseURL = process.env.TEST_BASE_URL;

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((e) => e.jsonValue())).then((args) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...args)
  );
beforeEach(() => {
  // Reset mock function"s states before each test.
  jest.clearAllMocks();
});

describe("Click Counter", () => {
  beforeEach(async () => {
    if (!page.listeners("console").includes(onPageConsole)) {
      page.on("console", onPageConsole);
    }

    await page.goto(baseURL, { waitUntil: "load" });
  });

  it("should have an element with the class '.counter'", async () => {
    const counterElem = await page.evaluate(() =>
      document.querySelector(".counter")
    );
    expect(counterElem).not.toBeNull();
  });

  it("should have an element with the class '.increment'", async () => {
    const incElem = await page.evaluate(() =>
      document.querySelector(".increment")
    );
    expect(incElem).not.toBeNull();
  });

  it("should have an element with the class '.decrement'", async () => {
    const decElem = await page.evaluate(() =>
      document.querySelector(".decrement")
    );
    expect(decElem).not.toBeNull();
  });

  it("should have a default value of 0", async () => {
    await page.waitForSelector(".counter");
    const counterElem = await page.$(".counter");
    expect(counterElem).not.toBeNull();
    const value = await page.evaluate((el) => el.textContent, counterElem);
    expect(value).toEqual("0");
  });

  it("should increase the counter by 1 when '.increment' is clicked", async () => {
    await page.waitForSelector(".increment");
    const incElem = await page.$(".increment");
    expect(incElem).not.toBeNull();
    await incElem.click();
    await page.waitForSelector(".counter");
    const counterElem = await page.$(".counter");
    expect(counterElem).not.toBeNull();
    const value = await page.evaluate((el) => el.textContent, counterElem);
    expect(value).toEqual("1");
  });

  it("should decrease the counter by 1 when '.decrement' is clicked", async () => {
    await page.waitForSelector(".decrement");
    const decElem = await page.$(".decrement");
    expect(decElem).not.toBeNull();
    await decElem.click();
    await page.waitForSelector(".counter");
    const counterElem = await page.$(".counter");
    expect(counterElem).not.toBeNull();
    const value = await page.evaluate((el) => el.textContent, counterElem);
    expect(value).toEqual("-1");
  });
});
