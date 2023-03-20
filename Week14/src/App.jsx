import React from "react";
import ReactDOM from "react-dom";
import AssemblyLine from "./AssemblyLine";

/* Changes made to this file will not affect your tests.
 * This file is used to control the behavior of the web preview. 
*/
function App(props) {
  return (
    <div id="app">
      <AssemblyLine 
        stages={[
          "Idea", 
          "Development", 
          "Testing", 
          "Deployment"
        ]}
      />
    </div>
  );
}

export default App;
