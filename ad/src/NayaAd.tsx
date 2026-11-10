import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill, staticFile } from "remotion";
import { S1Clock } from "./scenes/S1Clock";
import { S2Silence } from "./scenes/S2Silence";
import { S3Naya } from "./scenes/S3Naya";
import { S4Plan } from "./scenes/S4Plan";
import { S5Morning } from "./scenes/S5Morning";
import { S6Bridge } from "./scenes/S6Bridge";
import { S7EndCard } from "./scenes/S7EndCard";

const T = 10; // crossfade length in frames

/** "Le 3:07" — 30s vertical ad. Scene durations include the 10-frame overlaps (sum 960 − 6×10 = 900). */
export const NayaAd: React.FC = () => (
  <AbsoluteFill style={{ background: "#0E0A19" }}>
    <Audio src={staticFile("audio/pad.wav")} volume={0.9} />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={100} name="1 · 3:07">
        <S1Clock />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={125} name="2 · Silenzio">
        <S2Silence />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={175} name="3 · Naya">
        <S3Naya />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={130} name="4 · Il piano">
        <S4Plan />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={160} name="5 · Il giorno dopo">
        <S5Morning />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={150} name="6 · Il ponte">
        <S6Bridge />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={120} name="7 · End card">
        <S7EndCard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
