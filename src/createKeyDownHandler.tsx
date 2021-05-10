import keycode from "keycode";
import { EssentialKeys } from "./EssentialKeys";

export const createKeyDownHandler = ({
  showOptions,
  navigateUp,
  navigateDown,
  onEnterPress,
  hideOptions,
}: {
  showOptions: () => void;
  hideOptions: () => void;
  navigateUp: () => void;
  navigateDown: () => void;
  onEnterPress: () => void;
}) => (e) => {
  const pressedKey = keycode(e);
  console.log(pressedKey);
  switch (pressedKey) {
    case EssentialKeys.Down:
      navigateDown();
      break;
    case EssentialKeys.Up:
      navigateUp();
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
