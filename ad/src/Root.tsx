import "./index.css";
import { Composition, Folder } from "remotion";
import { NayaAd } from "./NayaAd";
import { S1Clock } from "./scenes/S1Clock";
import { S2Silence } from "./scenes/S2Silence";
import { S3Naya } from "./scenes/S3Naya";
import { S4Plan } from "./scenes/S4Plan";
import { S5Morning } from "./scenes/S5Morning";
import { S6Bridge } from "./scenes/S6Bridge";
import { S7EndCard } from "./scenes/S7EndCard";

const V = { fps: 30, width: 1080, height: 1920 } as const;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="NayaAd-Le307" component={NayaAd} durationInFrames={900} {...V} />
    <Folder name="Scenes">
      <Composition id="S1-Clock" component={S1Clock} durationInFrames={100} {...V} />
      <Composition id="S2-Silence" component={S2Silence} durationInFrames={125} {...V} />
      <Composition id="S3-Naya" component={S3Naya} durationInFrames={175} {...V} />
      <Composition id="S4-Plan" component={S4Plan} durationInFrames={130} {...V} />
      <Composition id="S5-Morning" component={S5Morning} durationInFrames={160} {...V} />
      <Composition id="S6-Bridge" component={S6Bridge} durationInFrames={150} {...V} />
      <Composition id="S7-EndCard" component={S7EndCard} durationInFrames={120} {...V} />
    </Folder>
  </>
);
