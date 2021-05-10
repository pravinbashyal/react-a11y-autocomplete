import { useRef } from "react";

export function useMenuTransition(hideOption: () => void) {
  const blurTimeout = useRef<number>();

  const onBlur = () => {
    blurTimeout.current = window.setTimeout(() => {
      hideOption();
    }, 100);
  };

  const onMenuFocus = () => {
    window.clearTimeout(blurTimeout.current);
  };
  return { onBlur, onMenuFocus };
}
