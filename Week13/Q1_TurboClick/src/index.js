import "./style.css";

const counterEl = document.querySelector(".counter");
const incrementBtn = document.querySelector(".increment");
const decrementBtn = document.querySelector(".decrement");
const stepSizeEl = document.querySelector(".step-size");
const incrementStepSizeBtn = document.querySelector(".increment-step-size");
const decrementStepSizeBtn = document.querySelector(".decrement-step-size");

let counterValue = 0;
let stepSize = 1;

incrementBtn.addEventListener("click", () => {
  counterValue += stepSize;
  counterEl.textContent = counterValue;
});

decrementBtn.addEventListener("click", () => {
  counterValue -= stepSize;
  counterEl.textContent = counterValue;
});

incrementStepSizeBtn.addEventListener("click", () => {
  stepSize += 1;
  stepSizeEl.textContent = stepSize;
});

decrementStepSizeBtn.addEventListener("click", () => {
  if (stepSize > 1) {
    stepSize -= 1;
    stepSizeEl.textContent = stepSize;
  }
});
