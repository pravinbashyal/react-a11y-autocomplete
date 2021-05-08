import React, { useCallback, useEffect } from "react";

export function useClickEventListener(
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
