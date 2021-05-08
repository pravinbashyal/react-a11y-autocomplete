import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Autocomplete } from "./Autocomplete";

function App() {
  const options = ["option1", "option2"];
  const getLabel = (option) => option;
  const getValue = (option) => option;
  const label = "";
  const inputId = "";
  return (
    <Autocomplete
      options={options}
      getLabel={getLabel}
      getValue={getValue}
      label={label}
      id={inputId}
    ></Autocomplete>
  );
}

export default App;
