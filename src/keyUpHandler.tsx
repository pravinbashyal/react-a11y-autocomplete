import keycode from "keycode";
import { EssentialKeys } from "./EssentialKeys";

export const keyUpHandler = (e) => {
  const pressedKey = keycode(e);
  console.log(keycode(e));
  switch (pressedKey) {
    case EssentialKeys.Down:
    case EssentialKeys.Up:
    case EssentialKeys.Left:
    case EssentialKeys.Right:
    case EssentialKeys.Enter:
    default:
      console.log("hello");
  }
  //   switch (e.keyCode) {
  //     case this.keys.esc:
  //     case this.keys.up:
  //     case this.keys.left:
  //     case this.keys.right:
  //     case this.keys.space:
  //     case this.keys.enter:
  //     case this.keys.tab:
  //     case this.keys.shift:
  //       // ignore otherwise the menu will show
  //       break;
  //     case this.keys.down:
  //       this.onTextBoxDownPressed(e);
  //       break;
  //     default:
  //       this.onTextBoxType(e);
  //   }
  //
};
