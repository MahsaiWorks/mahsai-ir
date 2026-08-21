import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
  AbsoluteFill,
  Html5Audio,
  interpolate,
  staticFile,
  useVideoConfig,
} from "remotion";
import { InstallScene } from "./scenes/InstallScene";
import { MatchScene } from "./scenes/MatchScene";
import { ProblemScene } from "./scenes/ProblemScene";

const transitionTiming = linearTiming({ durationInFrames: 18 });

export const MetrazhSiteStory: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Html5Audio
        src={staticFile("metrazh-theme.mp3")}
        trimBefore={12.9 * fps}
        volume={(frame) =>
          interpolate(frame, [0, 6, 336, 359], [0, 0.85, 0.85, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={138}>
          <ProblemScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={transitionTiming}
        />
        <TransitionSeries.Sequence durationInFrames={138}>
          <MatchScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={transitionTiming}
        />
        <TransitionSeries.Sequence durationInFrames={120}>
          <InstallScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
