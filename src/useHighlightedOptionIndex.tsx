import { useState } from "react";

export function useHighlightedOptionIndex<T>({
  options,
  initialIndex = -1,
}: {
  options: T[];
  initialIndex?: number;
}) {
  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(
    initialIndex
  );

  const increaseHighlightedOptionIndex = () => {
    setHighlightedOptionIndex((prevIndex) => {
      if (prevIndex === options.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const decreaseHighlightedOptionIndex = () => {
    setHighlightedOptionIndex((prevIndex) => {
      if (prevIndex === 0) {
        return options.length - 1;
      }
      return prevIndex - 1;
    });
  };

  return {
    highlightedOptionIndex,
    increaseIndex: increaseHighlightedOptionIndex,
    decreaseIndex: decreaseHighlightedOptionIndex,
  };
}
