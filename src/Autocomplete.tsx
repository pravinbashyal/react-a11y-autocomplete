import React, { useState } from "react";
import { VisuallyHidden } from "./VisuallyHidden";

export type AutocompleteProps<T> = {
  id?: string;
  label: string;
  getLabel?: (option: T) => string;
  getValue?: (option: T) => any;
  value?: any;
  options: T[];
};

function defaultGetter<T>(option: T) {
  return (option as never) as string;
}

export function Autocomplete<T>({
  id,
  label,
  getLabel = defaultGetter,
  getValue = defaultGetter,
  value,
  options,
}: AutocompleteProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="field">
      <label htmlFor={id}>
        <span className="field-label">{label}</span>
      </label>
      <VisuallyHidden>
        <select name="destination" aria-hidden="true" tabIndex={-1}></select>
      </VisuallyHidden>
      <div className="autocomplete">
        <input
          aria-owns="autocomplete-options--destination"
          autoCapitalize="none"
          type="text"
          autoComplete="off"
          aria-autocomplete="list" // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
          id={id || undefined}
          aria-expanded={isExpanded}
        />
        <svg
          focusable="false"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        <ul
          id={`autocomplete-options--${id}`}
          role="listbox"
          className="hidden"
        >
          {options.map((option, index) => (
            <li
              role="option"
              tabIndex={-1}
              aria-selected={getValue(option) === value}
              id={`autocomplete_${index}`}
            >
              {getLabel(option)}
              {getValue(option)}
            </li>
          ))}
        </ul>
        <VisuallyHidden>
          <div aria-live="polite" role="status">
            13 results available.
          </div>
        </VisuallyHidden>
      </div>
    </div>
  );
}
