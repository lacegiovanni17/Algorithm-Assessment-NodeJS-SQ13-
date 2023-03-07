import "./style.css";

// TODO (see instructions)
const counterDisplay = document.querySelector(".counter");
const incrementButton = document.querySelector(".increment");
const decrementButton = document.querySelector(".decrement");
let counterValue = 0;

function updateCounterDisplay() {
  counterDisplay.textContent = counterValue;
}

function incrementCounter() {
  counterValue++;
  updateCounterDisplay();
}

function decrementCounter() {
  counterValue--;
  updateCounterDisplay();
}

incrementButton.addEventListener("click", incrementCounter);
decrementButton.addEventListener("click", decrementCounter);

updateCounterDisplay();
