import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { persianFontFamily } from "../fonts";
import { colors, enter, fadeUp } from "../theme";

export const InstallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const screenIn = enter(frame, fps, 2);
  const iconIn = enter(frame, fps, 8);
  const titleIn = enter(frame, fps, 15);
  const ctaIn = enter(frame, fps, 28);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        color: colors.white,
        background:
          "radial-gradient(circle at 12% 14%, rgba(25,141,130,0.42), transparent 32%), radial-gradient(circle at 88% 84%, rgba(227,104,75,0.28), transparent 34%), #11293d",
        fontFamily: persianFontFamily,
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -60,
          bottom: -260,
          width: 920,
          height: 920,
          background: "rgba(255, 240, 184, 0.08)",
          borderRadius: "50%",
        }}
      />
      <PhoneFrame
        image="screens/customer-follow-up.webp"
        width={350}
        style={{
          position: "absolute",
          right: 172,
          top: 152,
          opacity: screenIn,
          transform: `translateY(${interpolate(screenIn, [0, 1], [130, 0])}px) rotate(-5deg)`,
          filter: "brightness(0.98)",
        }}
      />
      <PhoneFrame
        image="screens/property-catalog.webp"
        width={318}
        style={{
          position: "absolute",
          right: 510,
          top: 240,
          opacity: screenIn,
          transform: `translateY(${interpolate(screenIn, [0, 1], [160, 0])}px) rotate(5deg)`,
          filter: "brightness(0.82)",
        }}
      />
      <div
        dir="rtl"
        style={{
          position: "absolute",
          left: 116,
          top: 126,
          width: 810,
          textAlign: "right",
        }}
      >
        <div
          style={{
            ...fadeUp(iconIn, 34),
            display: "flex",
            alignItems: "center",
            gap: 26,
          }}
        >
          <Img
            src={staticFile("metrazh-icon.webp")}
            style={{ width: 140, height: 140, borderRadius: 34 }}
          />
          <div
            style={{
              color: "rgba(255,254,250,0.72)",
              fontSize: 36,
              fontWeight: 620,
            }}
          >
            برای مشاور املاک
          </div>
        </div>
        <h2
          style={{
            ...fadeUp(titleIn, 54),
            margin: "52px 0 0",
            fontSize: 94,
            lineHeight: 1.28,
            letterSpacing: "-0.035em",
            fontWeight: 880,
          }}
        >
          فایل، مشتری و پیگیری؛
          <br />
          <span style={{ color: colors.butter }}>همه روی گوشی.</span>
        </h2>
        <div
          style={{
            ...fadeUp(ctaIn, 38),
            display: "inline-flex",
            alignItems: "center",
            gap: 18,
            marginTop: 50,
            padding: "22px 34px",
            color: colors.ink,
            background: colors.butter,
            borderRadius: 22,
            boxShadow: "0 18px 46px rgba(0,0,0,0.16)",
            fontSize: 40,
            fontWeight: 820,
          }}
        >
          نصب رایگان از کافه‌بازار
          <span aria-hidden style={{ fontSize: 42 }}>
            ←
          </span>
        </div>
      </div>
      <Img
        src={staticFile("mahsai-symbol-reversed.svg")}
        style={{
          position: "absolute",
          left: 120,
          bottom: 62,
          width: 70,
          height: 70,
          objectFit: "contain",
          opacity: 0.72,
        }}
      />
    </AbsoluteFill>
  );
};
