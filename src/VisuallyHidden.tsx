import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";

export const VisuallyHidden: FC<
  {} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...props }) => (
  <div
    style={{
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      height: "1px",
      width: "1px",
      margin: "-1px",
      padding: "0px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      position: "absolute",
    }}
    {...props}
  >
    {children}
  </div>
);
