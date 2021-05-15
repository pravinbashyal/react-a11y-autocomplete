import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";

const unique = require("array-unique");

const config = {
  includeMatches: true,
  minMatchCharLength: 0,
};

type FilteredOption = Partial<Fuse.FuseResult<string>>;

export function useFilteredOptions(
  options: string[],
  textInputIntermediateValue: string,
  maxOptions: number
): Array<FilteredOption> {
  const defaultOptions = useMemo(
    () => options.map((option) => ({ item: option })),
    [options]
  );
  const [filteredOptions, setFilteredOptions] = useState<Array<FilteredOption>>(
    options.map((option) => ({ item: option }))
  );

  const fuse = useMemo(() => {
    return new Fuse(unique(options) as string[], config);
  }, [options]);

  useEffect(() => {
    const filtered = fuse.search(textInputIntermediateValue);
    if (filtered.length === 0 && textInputIntermediateValue === "") {
      setFilteredOptions(defaultOptions);
      return;
    }
    setFilteredOptions(filtered);
  }, [defaultOptions, fuse, maxOptions, options, textInputIntermediateValue]);
  return filteredOptions;
}
