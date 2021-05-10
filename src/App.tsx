import React, { useState } from "react";
import "./App.css";
import { Autocomplete } from "./component/Autocomplete/Autocomplete";
import { data } from "./data";

function App() {
  const options = data;
  const label = "Options";
  const inputId = "opt";
  const [value, setValue] = useState<string>();
  return (
    <section>
      <h2>Autocomplete Demo</h2>
      <span>Selected value is: {value || "unselected"}</span>
      <form method="get" action="/">
        <Autocomplete
          name="fruits"
          options={options}
          label={label}
          id={inputId}
          value={value}
          onOptionSelect={(option) => setValue(option)}
          maxOptions={100}
        ></Autocomplete>
        <button type="submit" className="dummy-form-button">
          Works with html form too
        </button>
      </form>
      <div>placeholder div for styling overlap</div>
    </section>
  );
}

export default App;
