import { Composition } from "remotion";
import { MetrazhSiteStory } from "./MetrazhSiteStory";

export const MetrazhSiteStoryComposition: React.FC = () => {
  return (
    <Composition
      id="MetrazhSiteStory"
      component={MetrazhSiteStory}
      durationInFrames={360}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
