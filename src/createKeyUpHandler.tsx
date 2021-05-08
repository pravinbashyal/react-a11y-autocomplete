import keycode from "keycode";
import { EssentialKeys } from "./EssentialKeys";

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
