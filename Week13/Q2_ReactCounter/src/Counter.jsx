import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      stepSize: 1,
    };
    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
    this.incrementStepSize = this.incrementStepSize.bind(this);
    this.decrementStepSize = this.decrementStepSize.bind(this);
  }

  incrementCount() {
    this.setState((state) => ({ counter: state.counter + state.stepSize }));
  }

  decrementCount() {
    this.setState((state) => ({ counter: state.counter - state.stepSize }));
  }

  incrementStepSize() {
    this.setState((state) => ({ stepSize: state.stepSize + 1 }));
  }

  decrementStepSize() {
    if (this.state.stepSize > 1) {
      this.setState((state) => ({ stepSize: state.stepSize - 1 }));
    }
  }

  render() {
    return (
      <div>
        <h1 className="counter">{this.state.counter}</h1>
        <button
          type="button"
          className="increment"
          onClick={this.incrementCount}
        >
          Increment
        </button>
        <button
          type="button"
          className="decrement"
          onClick={this.decrementCount}
        >
          Decrement
        </button>
        <div className="step-size">
          Step Size: {this.state.stepSize}
        </div>
        <button
          type="button"
          className="increment-step-size"
          onClick={this.incrementStepSize}
        >
          Increment Step Size
        </button>
        <button
          type="button"
          className="decrement-step-size"
          onClick={this.decrementStepSize}
        >
          Decrement Step Size
        </button>
      </div>
    );
  }
}

export default Counter;