import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import { GreyBubble, Messenger } from "../components";
import { appear } from "../lib";

/** 3–7s: the group chat is asleep; she starts typing to mum, then deletes it (a neutral messenger, not Naya) */
export const S2Silence: React.FC = () => {
  const frame = useCurrentFrame();
  const word = "mamma…";
  const typeStart = 66;
  const delStart = 94;
  let shown = "";
  if (frame >= typeStart && frame < delStart) shown = word.slice(0, Math.floor((frame - typeStart) / 3));
  if (frame >= delStart) shown = word.slice(0, Math.max(0, word.length - Math.floor((frame - delStart) / 2)));
  return (
    <AbsoluteFill>
      <Sequence from={typeStart} durationInFrames={18}>
        <Audio src={staticFile("audio/typing.wav")} />
      </Sequence>
      <Sequence from={delStart} durationInFrames={12}>
        <Audio src={staticFile("audio/typing.wav")} trimBefore={30} />
      </Sequence>
      {frame < 56 ? (
        <Messenger time="3:07" title="Diritto Privato 1B" subtitle="Marco, Sara, Luca e altri 41" initial="D" color="#3D6FD1">
          <GreyBubble name="Sara">Qualcuno ha gli appunti del capitolo 7?</GreyBubble>
          <GreyBubble name="Marco">Buonanotte raga, a domani</GreyBubble>
          <div style={{ alignSelf: "center", fontSize: 34, color: "#8A8C93", opacity: appear(frame, 12) }}>Ultimo messaggio alle 23:40</div>
        </Messenger>
      ) : (
        <Messenger time="3:07" title="Mamma" subtitle="ultimo accesso ieri alle 22:15" initial="M" color="#C9719A" input={shown}>
          <GreyBubble>In bocca al lupo per domani! Dormi, eh ❤</GreyBubble>
        </Messenger>
      )}
    </AbsoluteFill>
  );
};
