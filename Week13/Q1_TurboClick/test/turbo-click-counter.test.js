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

describe("Turbo Click Counter", () => {
  beforeEach(async () => {
    if (!page.listeners("console").includes(onPageConsole)) {
      page.on("console", onPageConsole);
    }

    await page.goto(baseURL, { waitUntil: "load" });
  });

  it("should have an element with the class '.step-size'", async () => {
    const counterElem = await page.evaluate(() =>
      document.querySelector(".step-size")
    );
    expect(counterElem).not.toBeNull();
  });

  it("should have an element with the class '.increment-step-size'", async () => {
    const incElem = await page.evaluate(() =>
      document.querySelector(".increment-step-size")
    );
    expect(incElem).not.toBeNull();
  });

  it("should have an element with the class '.decrement-step-size'", async () => {
    const decElem = await page.evaluate(() =>
      document.querySelector(".decrement-step-size")
    );
    expect(decElem).not.toBeNull();
  });

  it("should have a default value of 1", async () => {
    const stepSizeElem = await page.$(".step-size");
    expect(stepSizeElem).not.toBeNull();
    const value = await page.evaluate((el) => el.textContent, stepSizeElem);
    expect(value).toEqual("1");
  });

  it("should increase the counter by 1 when '.increment-step-size' is clicked", async () => {
    await page.waitForSelector(".increment-step-size");
    const incElem = await page.$(".increment-step-size");
    expect(incElem).not.toBeNull();
    await incElem.click();
    await page.waitForSelector(".step-size");
    const stepSizeElem = await page.$(".step-size");
    expect(stepSizeElem).not.toBeNull();
    const value = await page.evaluate((el) => el.textContent, stepSizeElem);
    expect(value).toEqual("2");
  });

  it("should decrease the counter by 1 when '.decrement-step-size' is clicked", async () => {
    const incElem = await page.$(".increment-step-size");
    expect(incElem).not.toBeNull();
    await incElem.click();
    const stepSizeElem = await page.$(".step-size");
    expect(stepSizeElem).not.toBeNull();
    const incValue = await page.evaluate((el) => el.textContent, stepSizeElem);
    expect(incValue).toEqual("2");
    const decElem = await page.$(".decrement-step-size");
    expect(decElem).not.toBeNull();
    await decElem.click();
    const decValue = await page.evaluate((el) => el.textContent, stepSizeElem);
    expect(decValue).toEqual("1");
  });

  it("should prevent step size from decreasing below 1", async () => {
    const decElem = await page.$(".decrement-step-size");
    expect(decElem).not.toBeNull();
    await decElem.click();
    const stepSizeElem = await page.$(".step-size");
    expect(stepSizeElem).not.toBeNull();
    const value = await page.evaluate((el) => el.textContent, stepSizeElem);
    expect(value).toEqual("1");
  });

  it("should work on repeated increments", async () => {
    const incElem = await page.$(".increment-step-size");
    expect(incElem).not.toBeNull();
    const stepSizeElem = await page.$(".step-size");
    expect(stepSizeElem).not.toBeNull();

    for (let i = 2; i < 6; i++) {
      await incElem.click();
      const value = await page.evaluate((el) => el.textContent, stepSizeElem);
      expect(value).toEqual("" + i);
    }
  });
});

describe("step size and counter operate together", () => {
  beforeEach(async () => {
    if (!page.listeners("console").includes(onPageConsole)) {
      page.on("console", onPageConsole);
    }

    await page.goto(baseURL, { waitUntil: "load" });
  });

  it("should increment counter by 5 when increment button is clicked", async () => {
    const incStepSizeElem = await page.$(".increment-step-size");
    expect(incStepSizeElem).not.toBeNull();
    const counterElem = await page.$(".counter");
    expect(counterElem).not.toBeNull();
    const incElem = await page.$(".increment");
    expect(incElem).not.toBeNull();

    for (let i = 0; i < 4; i++) {
      await incStepSizeElem.click();
    }

    const preIncValue = await page.evaluate(
      (el) => el.textContent,
      counterElem
    );
    expect(preIncValue).toEqual("0");
    await incElem.click();
    const postIncValue = await page.evaluate(
      (el) => el.textContent,
      counterElem
    );
    expect(postIncValue).toEqual("5");
  });

  it("should decrement counter by 5 when decrement button is clicked", async () => {
    const incStepSizeElem = await page.$(".increment-step-size");
    expect(incStepSizeElem).not.toBeNull();
    const counterElem = await page.$(".counter");
    expect(counterElem).not.toBeNull();
    const decElem = await page.$(".decrement");
    expect(decElem).not.toBeNull();

    for (let i = 0; i < 4; i++) {
      await incStepSizeElem.click();
    }

    const preIncValue = await page.evaluate(
      (el) => el.textContent,
      counterElem
    );
    expect(preIncValue).toEqual("0");
    await decElem.click();
    const postIncValue = await page.evaluate(
      (el) => el.textContent,
      counterElem
    );
    expect(postIncValue).toEqual("-5");
  });

  it("should work on multiple operations", async () => {
    const counterElem = await page.$(".counter");
    expect(counterElem).not.toBeNull();
    const decElem = await page.$(".decrement");
    expect(decElem).not.toBeNull();
    const incElem = await page.$(".increment");
    expect(incElem).not.toBeNull();
    const decStepSizeElem = await page.$(".decrement-step-size");
    expect(decStepSizeElem).not.toBeNull();
    const incStepSizeElem = await page.$(".increment-step-size");
    expect(incStepSizeElem).not.toBeNull();

    await incStepSizeElem.click();
    await decElem.click();
    let value = await page.evaluate((el) => el.textContent, counterElem);
    expect(value).toEqual("-2");
    await decElem.click();
    value = await page.evaluate((el) => el.textContent, counterElem);
    expect(value).toEqual("-4");
    await incStepSizeElem.click();
    await incElem.click();
    value = await page.evaluate((el) => el.textContent, counterElem);
    expect(value).toEqual("-1");
    await incElem.click();
    value = await page.evaluate((el) => el.textContent, counterElem);
    expect(value).toEqual("2");
    await decStepSizeElem.click();
    await decStepSizeElem.click();
    await decStepSizeElem.click();
    await incElem.click();
    value = await page.evaluate((el) => el.textContent, counterElem);
    expect(value).toEqual("3");
  });
});
