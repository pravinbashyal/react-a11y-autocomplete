import React, { useCallback, useEffect } from "react";

export function useClickEventListener(
  container: React.RefObject<HTMLDivElement>,
  {
    onClickOutside,
  }: {
    onClickOutside: () => void;
  }
) {
  const clickEventListener = useCallback((e) => {
    if (!container?.current?.contains(e.target)) {
      onClickOutside();
    }
  }, []);
  useEffect(() => {
    document.addEventListener("click", clickEventListener);
    return () => document.removeEventListener("click", clickEventListener);
  }, [clickEventListener]);
}
