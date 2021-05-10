import { ReactElement } from "react";

const isEven = (num) => num % 2 === 0;

export const HighlightedOption = ({ matches, option }) => {
  if (!matches?.[0]) return <span aria-hidden="true">{option}</span>;
  const highlightSeries = matches
    .map((match) => match.indices)
    .flat(2)
    .concat(option.length - 1);
  const optionBreakdown: ReactElement[] = [];
  for (let i = 0; i < highlightSeries.length; i++) {
    if (i === 0) {
      const nonHighlightedElement = (
        <span>{option.substring(0, highlightSeries[i])}</span>
      );
      optionBreakdown.push(nonHighlightedElement);
      continue;
    }
    if (!isEven(i)) {
      const highlightedElement = (
        <strong>
          {option.substring(highlightSeries[i - 1], highlightSeries[i] + 1)}
        </strong>
      );
      optionBreakdown.push(highlightedElement);
      continue;
    }
    if (i === highlightSeries.length - 1) {
      const nonHighlightedElement = (
        <span>
          {option.substring(highlightSeries[i - 1] + 1, highlightSeries[i] + 1)}
        </span>
      );
      optionBreakdown.push(nonHighlightedElement);
      continue;
    }

    const nonHighlightedElement = (
      <span>
        {option.substring(highlightSeries[i - 1] + 1, highlightSeries[i])}
      </span>
    );
    optionBreakdown.push(nonHighlightedElement);
  }
  return <span aria-hidden="true">{optionBreakdown}</span>;
};
