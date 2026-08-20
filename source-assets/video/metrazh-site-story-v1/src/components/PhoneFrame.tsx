import type { CSSProperties } from "react";
import { Img, staticFile } from "remotion";
import { colors } from "../theme";

type PhoneFrameProps = {
  image: string;
  style?: CSSProperties;
  width?: number;
};

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  image,
  style,
  width = 386,
}) => {
  return (
    <div
      style={{
        width,
        padding: 12,
        background: colors.ink,
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 58,
        boxShadow: "0 38px 90px rgba(17, 41, 61, 0.25)",
        ...style,
      }}
    >
      <Img
        src={staticFile(image)}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          borderRadius: 46,
        }}
      />
    </div>
  );
};
