import keycode from "keycode";
import { EssentialKeys } from "../domain/EssentialKeys";

export const createKeyDownHandler = ({
  showOptions,
  navigateUp,
  navigateDown,
  onSelect,
  hideOptions,
}: {
  showOptions: () => void;
  hideOptions: () => void;
  navigateUp: () => void;
  navigateDown: () => void;
  onSelect: () => void;
}) => (e) => {
  const pressedKey = keycode(e);
  switch (pressedKey) {
    case EssentialKeys.Down:
      navigateDown();
      break;
    case EssentialKeys.Up:
      navigateUp();
      break;
    case EssentialKeys.Enter:
      onSelect();
      break;
    case EssentialKeys.Space:
      onSelect();
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
