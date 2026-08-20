import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { persianFontFamily } from "../fonts";
import { colors, enter, fadeUp } from "../theme";

const FeaturePill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "18px 26px",
      color: colors.ink,
      background: "rgba(255, 254, 250, 0.82)",
      border: "1px solid rgba(17, 41, 61, 0.09)",
      borderRadius: 999,
      boxShadow: "0 12px 34px rgba(17, 41, 61, 0.07)",
      fontSize: 34,
      fontWeight: 650,
    }}
  >
    <span
      style={{
        width: 16,
        height: 16,
        flex: "0 0 auto",
        background: colors.orange,
        borderRadius: "50%",
      }}
    />
    {children}
  </div>
);

export const MatchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phoneIn = enter(frame, fps, 3);
  const titleIn = enter(frame, fps, 12);
  const copyIn = enter(frame, fps, 24);
  const pillsIn = enter(frame, fps, 35);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        color: colors.ink,
        background:
          "radial-gradient(circle at 88% 18%, rgba(255,240,184,0.94), transparent 30%), radial-gradient(circle at 8% 82%, rgba(191,229,216,0.88), transparent 33%), #fffaf2",
        fontFamily: persianFontFamily,
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -210,
          top: -210,
          width: 720,
          height: 720,
          borderRadius: "50%",
          border: "100px solid rgba(227, 104, 75, 0.14)",
        }}
      />
      <PhoneFrame
        image="screens/smart-matching.webp"
        width={410}
        style={{
          position: "absolute",
          right: 250,
          top: 118,
          opacity: phoneIn,
          transform: `translateX(${interpolate(phoneIn, [0, 1], [160, 0])}px) rotate(${interpolate(phoneIn, [0, 1], [4, -1.2])}deg)`,
        }}
      />
      <div
        dir="rtl"
        style={{
          position: "absolute",
          left: 122,
          top: 150,
          width: 950,
          textAlign: "right",
        }}
      >
        <p
          style={{
            ...fadeUp(titleIn, 46),
            margin: 0,
            color: colors.tealDark,
            fontSize: 38,
            fontWeight: 780,
          }}
        >
          وقتی خواستهٔ مشتری رو ثبت کردی
        </p>
        <h2
          style={{
            ...fadeUp(titleIn, 56),
            maxWidth: 900,
            margin: "22px 0 0",
            fontSize: 100,
            lineHeight: 1.22,
            letterSpacing: "-0.035em",
            fontWeight: 880,
          }}
        >
          فایل و مشتری
          <br />
          <span style={{ color: colors.orange }}>کنار هم</span> می‌مونن.
        </h2>
        <p
          style={{
            ...fadeUp(copyIn, 44),
            maxWidth: 820,
            margin: "34px 0 0",
            color: colors.inkSoft,
            fontSize: 43,
            lineHeight: 1.65,
            fontWeight: 510,
          }}
        >
          متراژ گزینه‌های مناسب‌تر رو نشونت می‌ده؛ انتخاب آخر با خودته.
        </p>
        <div
          style={{
            ...fadeUp(pillsIn, 36),
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginTop: 42,
          }}
        >
          <FeaturePill>نیاز مشتری ثبت می‌شه</FeaturePill>
          <FeaturePill>فایل مناسب گم نمی‌شه</FeaturePill>
        </div>
      </div>
    </AbsoluteFill>
  );
};
