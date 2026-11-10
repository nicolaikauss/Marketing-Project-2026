import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Caption, NayaApp, NayaText, Thinking, UserBubble } from "../components";
import { typed } from "../lib";

export const FIRST_MSG = "Non riesco a dormire, ho la testa piena.";
export const FIRST_REPLY = "Sono qui. Mi racconti cosa ti gira in testa stanotte?";

/** 7–13s: she opens Naya ("Ciao, sono Naya / Come stai?") and writes the first message */
export const S3Naya: React.FC = () => {
  const frame = useCurrentFrame();
  const typeStart = 18;
  const typeEnd = typeStart + Math.ceil(FIRST_MSG.length * 1.3);
  const sent = typeEnd + 5;
  const reply = sent + 34;
  return (
    <AbsoluteFill>
      <Sequence from={typeStart} durationInFrames={typeEnd - typeStart}>
        <Audio src={staticFile("audio/typing.wav")} />
      </Sequence>
      <Sequence from={sent} durationInFrames={10}>
        <Audio src={staticFile("audio/click.wav")} />
      </Sequence>
      <NayaApp time="3:08" input={frame < sent ? typed(FIRST_MSG, frame, typeStart, 1.3) : ""} empty={frame < sent ? 1 : 0}>
        <UserBubble at={sent}>{FIRST_MSG}</UserBubble>
        <Thinking from={sent + 8} to={reply} />
        <NayaText at={reply} text={FIRST_REPLY}>
          {FIRST_REPLY}
        </NayaText>
      </NayaApp>
      <Caption at={reply + 30} italic>
        “Non volevo svegliare nessuno.”
      </Caption>
    </AbsoluteFill>
  );
};
