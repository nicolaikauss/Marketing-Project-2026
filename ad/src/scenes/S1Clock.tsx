import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { appear, clamp, DISPLAY, easeOut, N } from "../lib";

/** 0–3s: the clock flips to 3:07 in a dark student room */
export const S1Clock: React.FC = () => {
  const frame = useCurrentFrame();
  const flip = 40;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 80% 45% at 50% 0%, rgba(227,170,161,0.35) 0%, rgba(127,56,112,0.35) 35%, ${N.bg} 75%)`,
        fontFamily: DISPLAY,
        justifyContent: "center",
        alignItems: "center",
        gap: 36,
      }}
    >
      <Sequence from={flip} durationInFrames={10}>
        <Audio src={staticFile("audio/tick.wav")} />
      </Sequence>
      <div style={{ position: "relative", height: 320, width: 960, overflow: "hidden" }}>
        {(["3:06", "3:07"] as const).map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              inset: 0,
              textAlign: "center",
              fontSize: 300,
              fontWeight: 800,
              letterSpacing: -8,
              color: "#F2EEF8",
              translate: `0px ${interpolate(frame, [flip, flip + 8], i === 0 ? [0, -320] : [320, 0], { ...clamp, easing: easeOut })}px`,
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 110, fontWeight: 800, color: "#F2EEF8", opacity: appear(frame, 50) }}>Le 3:07.</div>
      <div style={{ fontSize: 84, fontWeight: 800, color: N.lilac, opacity: appear(frame, 62) }}>Esame alle 9.</div>
      <div style={{ position: "absolute", bottom: 170, fontFamily: "Inter", fontSize: 40, letterSpacing: 8, color: N.thinking, opacity: 0.35 * appear(frame, 10, 30) }}>
        MANUALE DI DIRITTO PRIVATO
      </div>
    </AbsoluteFill>
  );
};
