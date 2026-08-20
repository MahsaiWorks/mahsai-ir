import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MetrazhBrand } from "../components/MetrazhBrand";
import { persianFontFamily } from "../fonts";
import { colors, enter, fadeUp } from "../theme";

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brandIn = enter(frame, fps, 2);
  const titleIn = enter(frame, fps, 10);
  const copyIn = enter(frame, fps, 22);
  const zoom = interpolate(frame, [0, 138], [1.115, 1.165], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: colors.ink,
        fontFamily: persianFontFamily,
      }}
    >
      <Img
        src={staticFile("metrazh-site-character.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoom})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(13,35,52,0.98) 0%, rgba(13,35,52,0.91) 34%, rgba(13,35,52,0.53) 56%, rgba(13,35,52,0.03) 79%)",
        }}
      />
      <div
        dir="rtl"
        style={{
          position: "absolute",
          left: 112,
          top: 104,
          width: 790,
          color: colors.white,
          textAlign: "right",
        }}
      >
        <div style={fadeUp(brandIn, 24)}>
          <MetrazhBrand light />
        </div>
        <h1
          style={{
            ...fadeUp(titleIn, 54),
            margin: "56px 0 0",
            fontSize: 100,
            lineHeight: 1.22,
            letterSpacing: "-0.035em",
            fontWeight: 880,
          }}
        >
          مشتری پشت خطه؛
          <br />
          <span style={{ color: colors.butter }}>فایل مناسب</span> کجاست؟
        </h1>
        <p
          style={{
            ...fadeUp(copyIn, 46),
            maxWidth: 840,
            margin: "34px 0 0",
            color: "rgba(255, 254, 250, 0.82)",
            fontSize: 39,
            lineHeight: 1.7,
            fontWeight: 520,
          }}
        >
          بین دفتر، پیام‌ها و عکس‌ها دنبالش نگرد.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          bottom: 62,
          width: 126,
          height: 9,
          background: colors.orange,
          borderRadius: 999,
          opacity: interpolate(frame, [16, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
