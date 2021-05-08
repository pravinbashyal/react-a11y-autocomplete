import React, { FC } from "react";

export const VisuallyHidden: FC<{}> = ({ children }) => (
  <div
    style={{
      clipPath: "inset(100%)",
      clip: "rect(1px, 1px, 1px, 1px)",
      height: "1px",
      width: "1px",
      overflow: "hidden",
      position: "absolute",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);
