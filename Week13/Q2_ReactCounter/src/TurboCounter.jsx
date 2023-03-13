import React from "react";
import Counter from "./Counter";

class TurboCounter extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <>
        <Counter />
      </>
    );
  }
}

export default TurboCounter;