/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import keycode from "keycode";
import "./Autocomplete.css";
import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { EssentialKeys } from "./EssentialKeys";
import { useHighlightedOptionIndex } from "./useHighlightedOptionIndex";
import { VisuallyHidden } from "./VisuallyHidden";

export type AutocompleteProps<T> = {
  id?: string;
  label: string;
  getLabel?: (option: T) => string;
  getValue?: (option: T) => any;
  value?: any;
  options: T[];
  onOptionSelect: (option: T) => void;
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
  onOptionSelect: onOptionSelectProp,
}: AutocompleteProps<T>) {
  const inputEl = useRef<HTMLInputElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [textInputIntermediateValue, setTextInputIntermediateValue] = useState(
    getLabel(value) || ""
  );

  const {
    highlightedOptionIndex,
    increaseIndex,
    decreaseIndex,
    resetIndex,
  } = useHighlightedOptionIndex({ options, initialIndex: -1 });

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

  const onOptionSelect = (option) => {
    onOptionSelectProp(option);
    setTextInputIntermediateValue(getLabel(option));
  };

  const keyUpHandler = createKeyUpHandler({
    showOptions: () => setShowOptions(true),
    hideOptions: () => setShowOptions(false),
    navigateUp: decreaseIndex,
    navigateDown: increaseIndex,
    navigateLeft: increaseIndex,
    navigateRight: decreaseIndex,
    onEnterPress: () => {
      onOptionSelect(options[highlightedOptionIndex]);
    },
  });

  useClickEventListener(container, () => {
    setShowOptions(false);
    resetIndex();
  });

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
          aria-expanded={showOptions}
          value={textInputIntermediateValue}
          onKeyUp={keyUpHandler}
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
                className={clsx({
                  highlighted: highlightedOptionIndex === index,
                })}
                key={getLabel(option)}
                id={`autocomplete_${index}`}
                onClick={(_) => {
                  onOptionSelect(option);
                }}
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

export const createKeyUpHandler = ({
  showOptions,
  hideOptions,
  navigateUp,
  navigateDown,
  navigateLeft,
  navigateRight,
  onEnterPress,
}: {
  showOptions: () => void;
  hideOptions: () => void;
  navigateUp: () => void;
  navigateDown: () => void;
  navigateLeft: () => void;
  navigateRight: () => void;
}) => (e) => {
  console.log("focused");
  const pressedKey = keycode(e);
  console.log(keycode(e));
  switch (pressedKey) {
    case EssentialKeys.Down:
      navigateDown();
      break;
    case EssentialKeys.Up:
      navigateUp();
      break;
    case EssentialKeys.Left:
      navigateLeft();
      break;
    case EssentialKeys.Right:
      navigateRight();
      break;
    case EssentialKeys.Enter:
      onEnterPress();
      break;
    case EssentialKeys.Esc:
      hideOptions();
      break;
    case EssentialKeys.Tab:
      hideOptions();
      break;
    default:
      showOptions();
  }
};

function useClickEventListener(
  container: React.RefObject<HTMLDivElement>,
  cb: () => void
) {
  const clickEventListener = useCallback((e) => {
    if (!container?.current?.contains(e.target)) {
      cb();
    }
  }, []);
  useEffect(() => {
    document.addEventListener("click", clickEventListener);
    return () => document.removeEventListener("click", clickEventListener);
  }, [clickEventListener]);
}
