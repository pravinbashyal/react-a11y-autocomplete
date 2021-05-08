import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createKeyUpHandler } from "./keyUpHandler";
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

export const searchTextIsASubstring = (
  value1: string | number,
  value2: string | number
): boolean => {
  return String(value1).toLowerCase().includes(String(value2).toLowerCase());
};

export function Autocomplete<T>({
  id,
  label,
  getLabel = defaultGetter,
  getValue = defaultGetter,
  value,
  options,
}: AutocompleteProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [textInputIntermediateValue, setTextInputIntermediateValue] = useState(
    ""
  );

  const clickEventListener = useCallback((e) => {
    console.log(e.target);
    if (!container?.current?.contains(e.target)) {
      setShowOptions(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("click", clickEventListener);
    return () => document.removeEventListener("click", clickEventListener);
  }, []);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        searchTextIsASubstring(getLabel(option), textInputIntermediateValue)
      )
    );
  }, [getLabel, options, textInputIntermediateValue]);
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTextInputIntermediateValue(e.target.value);
  };
  const keyUpHandler = createKeyUpHandler({ setShowOptions });
  // const handleKeyCode = (event: React.ChangeEvent<HTMLInputElement> => {
  //   console.log(keycode(event.keyCode));
  // };
  return (
    <div className="field" ref={container} style={{ maxWidth: "200px" }}>
      <label htmlFor={id}>
        <span className="field-label">{label}</span>
      </label>
      <VisuallyHidden>
        <select name="destination" aria-hidden="true" tabIndex={-1}></select>
      </VisuallyHidden>
      <div className="autocomplete">
        <input
          aria-owns="autocomplete-options--destination"
          ref={inputEl}
          autoCapitalize="none"
          type="text"
          autoComplete="off"
          aria-autocomplete="list" // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
          id={id || undefined}
          aria-expanded={isExpanded}
          value={textInputIntermediateValue}
          onKeyUp={(e) => {
            e.preventDefault();
            keyUpHandler(e);
            e.stopPropagation();
          }}
          onFocus={(_) => setShowOptions(true)}
          onChange={onInputChange}
        />
        {showOptions && (
          <ul
            id={`autocomplete-options--${id}`}
            role="listbox"
            className="hidden"
          >
            {filteredOptions.map((option, index) => (
              <li
                role="option"
                tabIndex={-1}
                aria-selected={getValue(option) === value}
                key={getLabel(option)}
                id={`autocomplete_${index}`}
              >
                {getLabel(option)}
              </li>
            ))}
          </ul>
        )}
        <VisuallyHidden>
          <div aria-live="polite" role="status">
            {filteredOptions.length} results available.
          </div>
        </VisuallyHidden>
      </div>
    </div>
  );
}
