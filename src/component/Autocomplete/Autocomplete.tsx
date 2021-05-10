import "./Autocomplete.css";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useHighlightedOptionIndex } from "./state/useHighlightedOptionIndex";
import { VisuallyHidden } from "../common/VisuallyHidden";
import { useClickEventListener } from "./app/useClickEventListener";
import { createKeyDownHandler } from "./app/createKeyDownHandler";
import { useFilteredOptions } from "./state/useFilteredOptions";
import { HighlightedOption } from "./view/HighlightedOption";
import { useMenuTransition } from "./app/useMenuTransition";

export type AutocompleteProps = {
  id?: string;
  label: string;
  value?: any;
  options: string[];
  onOptionSelect: (option: string) => void;
  maxOptions?: number;
  required?: boolean;
  name?: string;
};

export const searchTextIsASubstring = (
  value1: string | number,
  value2: string | number
): boolean => {
  return String(value1).toLowerCase().includes(String(value2).toLowerCase());
};

export function Autocomplete({
  id,
  label,
  value,
  options,
  onOptionSelect: onOptionSelectProp,
  maxOptions = 15,
  required,
  name,
}: AutocompleteProps) {
  const inputEl = useRef<HTMLInputElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const menuBox = useRef<HTMLUListElement>(null);

  const [textInputIntermediateValue, setTextInputIntermediateValue] = useState(
    value || ""
  );

  const filteredOptions = useFilteredOptions(
    options,
    textInputIntermediateValue,
    maxOptions
  );

  const {
    highlightedOptionIndex,
    increaseIndex,
    decreaseIndex,
    resetIndex,
  } = useHighlightedOptionIndex({ filteredOptions, initialIndex: -1 });

  const [showOptions, setShowOptions] = useState(false);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTextInputIntermediateValue(e.target.value);
    resetIndex();
  };

  const onOptionSelect = (option: string) => {
    onOptionSelectProp(option);
    setShowOptions(false);
    setTextInputIntermediateValue(option);
    inputEl?.current?.blur();
  };

  const keyDownHandler = createKeyDownHandler({
    showOptions: () => setShowOptions(true),
    hideOptions: () => setShowOptions(false),
    navigateUp: decreaseIndex,
    navigateDown: increaseIndex,
    onEnterPress: () => {
      if (filteredOptions[highlightedOptionIndex].item) {
        onOptionSelect(filteredOptions[highlightedOptionIndex].item as string);
      }
    },
  });

  useClickEventListener(container, {
    onClickOutside: () => {
      setShowOptions(false);
      resetIndex();
    },
  });

  const { onBlur, onMenuFocus } = useMenuTransition(function hideOption() {
    setShowOptions(false);
  });

  useEffect(() => {
    const currentHighlight = menuBox?.current?.querySelectorAll("li")[
      highlightedOptionIndex
    ];
    currentHighlight?.focus();
  }, [highlightedOptionIndex]);

  return (
    <div ref={container} style={{ maxWidth: "200px" }} className="inputArea">
      <label htmlFor={id}>
        <span className="field-label">{label}</span>
      </label>
      <VisuallyHidden>
        <select
          value={value}
          name={name}
          aria-hidden="true"
          tabIndex={-1}
          required={required}
        >
          {filteredOptions.map(({ item: option }) => (
            <option value={option} key={option}></option>
          ))}
        </select>
      </VisuallyHidden>
      <div className="autocomplete" onKeyDown={keyDownHandler}>
        <input
          aria-owns="autocomplete-options--destination"
          ref={inputEl}
          autoCapitalize="none"
          type="text"
          autoComplete="off"
          aria-autocomplete="list" // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
          role="combobox"
          id={id || undefined}
          aria-expanded={showOptions}
          value={textInputIntermediateValue}
          onKeyDown={keyDownHandler}
          onFocus={() => {
            setShowOptions(true);
          }}
          onBlur={onBlur}
          onChange={onInputChange}
          className="input"
          required={required}
        />
        {showOptions && filteredOptions.length > 0 && (
          <ul
            id={`autocomplete-options--${id}`}
            role="listbox"
            className="menuBox"
            onFocus={onMenuFocus}
            ref={menuBox}
          >
            {filteredOptions.map(({ item: option, matches = [] }, index) => (
              <li
                role="option"
                tabIndex={-1}
                aria-selected={option === value}
                key={option}
                id={`autocomplete_${index}`}
                onClick={(_) => {
                  onOptionSelect(option as string);
                }}
              >
                <HighlightedOption
                  matches={matches}
                  option={option}
                ></HighlightedOption>
                <VisuallyHidden>{option}</VisuallyHidden>
              </li>
            ))}
          </ul>
        )}
        <VisuallyHidden aria-live="polite" role="status">
          {filteredOptions.length} results available.
        </VisuallyHidden>
      </div>
    </div>
  );
}
