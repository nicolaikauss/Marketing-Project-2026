import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Hi, NayaApp, NayaText, Notification, StoreCard, UserBubble } from "../components";
import { clamp, typed } from "../lib";
import { interpolate } from "remotion";

const REPLY = "Passato. 26!";

/** 17–22s: the next day, Naya checks in and remembers the exam */
export const S5Morning: React.FC = () => {
  const frame = useCurrentFrame();
  const app = 38;
  const bannerIn = app + 8;
  const typeStart = app + 56;
  const sent = typeStart + Math.ceil(REPLY.length * 1.5) + 3;
  return (
    <AbsoluteFill>
      <Sequence from={bannerIn} durationInFrames={36}>
        <Audio src={staticFile("audio/chime.wav")} />
      </Sequence>
      <Sequence from={typeStart} durationInFrames={sent - typeStart - 3}>
        <Audio src={staticFile("audio/typing.wav")} />
      </Sequence>
      <Sequence from={sent} durationInFrames={10}>
        <Audio src={staticFile("audio/click.wav")} />
      </Sequence>
      <NayaApp time="12:40" input={frame < sent ? typed(REPLY, frame, typeStart, 1.5) : ""}>
        <NayaText at={bannerIn + 26}>Com’è andato l’esame di Diritto privato?</NayaText>
        <UserBubble at={sent}>{REPLY}</UserBubble>
        <NayaText at={sent + 16} text="Te lo sei guadagnato. Com’è stato arrivare con un piano?">
          Te lo sei guadagnato.
        </NayaText>
      </NayaApp>
      <Notification from={bannerIn} hold={26} text="Com’è andato l’esame?" />
      <AbsoluteFill style={{ opacity: interpolate(frame, [app - 8, app], [1, 0], clamp) }}>
        <StoreCard
          lines={
            <>
              Il giorno
              <br />
              <Hi>dopo.</Hi>
            </>
          }
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
