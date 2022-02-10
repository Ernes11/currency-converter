import React from "react";
import ReactDOM from "react-dom";
import Converter from "./component/Converter";
import "./component/converter.scss";

function App() {
  return (
    <div className="App">
      
      <Converter />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

