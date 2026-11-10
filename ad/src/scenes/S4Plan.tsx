import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { NayaApp, NayaText, UserBubble } from "../components";
import { appear, clamp, DISPLAY, N } from "../lib";

const PLAN = "Facciamo un piano piccolo per domattina:\n1. Venti minuti di ripasso, non di più\n2. Una colazione vera\n3. Arrivare quindici minuti prima";

/** 13–17s: one small plan for the morning, then lights off */
export const S4Plan: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [80, 96], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <NayaApp time="3:16">
        <UserBubble at={2}>L’esame. Ho paura di non ricordare niente.</UserBubble>
        <NayaText at={16} text={PLAN} charsPerFrame={2.6}>
          {PLAN}
        </NayaText>
      </NayaApp>
      <AbsoluteFill style={{ background: "#07050D", opacity: dim, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 20, fontFamily: DISPLAY }}>
        <div style={{ fontSize: 170, fontWeight: 800, color: "#F2EEF8", letterSpacing: -3, opacity: appear(frame, 92, 14) }}>Parlane.</div>
        <div style={{ fontSize: 90, fontWeight: 800, color: N.lilac, opacity: appear(frame, 102, 14) }}>Anche alle 3.</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
