import { interpolate, spring } from "remotion";

export const colors = {
  ink: "#11293d",
  inkSoft: "#30485a",
  paper: "#fffaf2",
  white: "#fffefa",
  teal: "#198d82",
  tealDark: "#0b6f67",
  mint: "#bfe5d8",
  mintSoft: "#eaf7f1",
  orange: "#e3684b",
  orangeSoft: "#ffe2d6",
  butter: "#fff0b8",
} as const;

export const enter = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 18, stiffness: 115, mass: 0.75 },
    durationInFrames: 30,
  });

export const fadeUp = (progress: number, distance = 42) => ({
  opacity: progress,
  transform: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
});
