import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import CurrencyConverter from "./components/CurrencyConverter";

/* Changes made to this file will not affect your tests.
 * This file is used to control the behavior of the web preview. 
*/
function App() {
  return (
    <div className="App">
      <CurrencyConverter />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));