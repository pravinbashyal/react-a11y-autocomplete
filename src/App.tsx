import React, { useState } from "react";
import "./App.css";
import { Autocomplete } from "./Autocomplete";

function App() {
  const options = [
    "apple",
    "orange",
    "grapes",
    "mango",
    "pineapple",
    "grapefruit",
    "kiwi",
    "papaya",
    "lime",
    "fingerlime",
  ];
  const getLabel = (option) => option;
  const getValue = (option) => option;
  const label = "Options";
  const inputId = "opt";
  const [value, setValue] = useState<string>();
  return (
    <Autocomplete
      options={options}
      getLabel={getLabel}
      getValue={getValue}
      label={label}
      id={inputId}
      value={value}
      onOptionSelect={(option) => setValue(option)}
    ></Autocomplete>
  );
}

export default App;
