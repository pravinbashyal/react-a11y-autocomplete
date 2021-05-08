import keycode from "keycode";
import React, { Dispatch, SetStateAction } from "react";
import { EssentialKeys } from "./EssentialKeys";

export const createKeyUpHandler = ({
  setShowOptions,
}: {
  setShowOptions: Dispatch<SetStateAction<boolean>>;
}) => (e) => {
  console.log("focused");
  const pressedKey = keycode(e);
  console.log(keycode(e));
  switch (pressedKey) {
    case EssentialKeys.Down:
    case EssentialKeys.Up:
    case EssentialKeys.Left:
    case EssentialKeys.Right:
    case EssentialKeys.Enter:
    case EssentialKeys.Esc:
      setShowOptions(false);
      break;
    case EssentialKeys.Tab:
      setShowOptions(false);
      break;
    default:
      setShowOptions(() => true);
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
