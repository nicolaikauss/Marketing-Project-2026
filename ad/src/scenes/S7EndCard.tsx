import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Hi, LogoLavender, Spiro } from "../components";
import { appear, BODY, clamp, DISPLAY, easeOut, N } from "../lib";

/** 26–30s: App-Store-style end card — tagline, access line, guardrail disclaimer */
export const S7EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: N.paper, overflow: "hidden" }}>
      <Spiro rotate={frame * 0.2} opacity={0.6} />
      <div style={{ position: "absolute", left: 100, right: 100, top: 330, display: "flex", flexDirection: "column", gap: 40 }}>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 48,
            background: "#120D1C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: interpolate(frame, [0, 16], [0.7, 1], { ...clamp, easing: easeOut }),
            opacity: appear(frame, 0, 10),
            boxShadow: "0 20px 50px rgba(24,16,31,0.25)",
          }}
        >
          <LogoLavender size={150} />
        </div>
        <div style={{ fontFamily: DISPLAY, fontSize: 140, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, color: N.ink, opacity: appear(frame, 8) }}>
          Il primo passo.
          <br />
          <Hi>Non l’unico.</Hi>
        </div>
        <div style={{ fontFamily: BODY, fontSize: 50, lineHeight: 1.35, color: N.inkSoft, opacity: appear(frame, 24) }}>
          Naya, gratis con il tuo ateneo.
          <br />
          Attiva con il codice del tuo gruppo.
        </div>
      </div>
      <div style={{ position: "absolute", left: 100, right: 100, bottom: 110, fontFamily: BODY, fontSize: 32, lineHeight: 1.4, color: N.inkSoft, opacity: appear(frame, 34) }}>
        Naya è un assistente AI, non è terapia né un servizio di emergenza. In caso di emergenza chiama il 112.
      </div>
    </AbsoluteFill>
  );
};
