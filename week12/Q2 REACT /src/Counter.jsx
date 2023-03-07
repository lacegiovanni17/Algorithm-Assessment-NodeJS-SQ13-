import React from "react";

class Counter extends React.Component {
constructor(props) {
super(props);
this.state = {
counterValue: 0,
};
}

incrementCounter = () => {
this.setState((prevState) => ({
counterValue: prevState.counterValue + 1,
}));
};

decrementCounter = () => {
this.setState((prevState) => ({
counterValue: prevState.counterValue - 1,
}));
};

render() {
return (
<div>
<h1 className="counter">{this.state.counterValue}</h1>
<button type="button" className="decrement" onClick={this.decrementCounter}>
Decrement
</button>
<button type="button" className="increment" onClick={this.incrementCounter}>
Increment
</button>
</div>
);
}
}

export default Counter;
