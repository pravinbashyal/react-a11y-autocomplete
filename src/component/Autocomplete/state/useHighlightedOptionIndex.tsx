import { useState } from "react";

export function useHighlightedOptionIndex<T>({
  filteredOptions,
  initialIndex = -1,
}: {
  filteredOptions: T[];
  initialIndex?: number;
}) {
  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(
    initialIndex
  );

  const increaseHighlightedOptionIndex = () => {
    setHighlightedOptionIndex((prevIndex) => {
      if (prevIndex === filteredOptions.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const decreaseHighlightedOptionIndex = () => {
    setHighlightedOptionIndex((prevIndex) => {
      if (prevIndex === 0) {
        return filteredOptions.length - 1;
      }
      return prevIndex - 1;
    });
  };

  return {
    highlightedOptionIndex,
    increaseIndex: increaseHighlightedOptionIndex,
    decreaseIndex: decreaseHighlightedOptionIndex,
    resetIndex: () => setHighlightedOptionIndex(-1),
  };
}
