import { Img, staticFile } from "remotion";
import { colors } from "../theme";

type MetrazhBrandProps = {
  light?: boolean;
};

export const MetrazhBrand: React.FC<MetrazhBrandProps> = ({
  light = false,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 18,
        padding: "12px 22px 12px 14px",
        color: light ? colors.white : colors.ink,
        background: light
          ? "rgba(255, 254, 250, 0.13)"
          : "rgba(255, 254, 250, 0.82)",
        border: light
          ? "1px solid rgba(255, 255, 255, 0.2)"
          : "1px solid rgba(17, 41, 61, 0.1)",
        borderRadius: 999,
        boxShadow: "0 12px 36px rgba(17, 41, 61, 0.1)",
        backdropFilter: "blur(16px)",
        fontSize: 32,
        fontWeight: 720,
      }}
    >
      <Img
        src={staticFile("metrazh-icon.webp")}
        style={{ width: 66, height: 66, borderRadius: 18 }}
      />
      <span>برای دفتر املاک</span>
    </div>
  );
};
