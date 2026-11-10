import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Caption, Hi, NayaApp, NayaText, StoreCard } from "../components";
import { appear, clamp, DISPLAY, N } from "../lib";

const OFFER = "In questi giorni mi hai parlato spesso della pressione. Ti andrebbe di parlarne anche con una persona?";

/** 22–27s: a week later, Naya offers a person — the university counselling service (roadmap feature, shown as concept) */
export const S6Bridge: React.FC = () => {
  const frame = useCurrentFrame();
  const app = 36;
  const card = app + 44;
  const tap = card + 22;
  const booked = frame >= tap + 6;
  return (
    <AbsoluteFill>
      <Sequence from={tap} durationInFrames={10}>
        <Audio src={staticFile("audio/click.wav")} />
      </Sequence>
      <AbsoluteFill style={{ translate: `0px ${interpolate(frame, [tap + 10, tap + 24], [0, -330], clamp)}px` }}>
        <NayaApp time="18:05">
          <NayaText at={app + 4} text={OFFER} charsPerFrame={3}>
            {OFFER}
          </NayaText>
          {frame >= card ? (
            <div
              style={{
                alignSelf: "stretch",
                background: N.input,
                border: "2px solid #3A2A4F",
                borderRadius: 36,
                padding: "34px 38px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                opacity: appear(frame, card),
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: 3, color: N.lilac }}>IL TUO ATENEO</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 50, fontWeight: 800, color: "#F2EEF8" }}>Servizio di counselling</div>
              <div style={{ fontSize: 38, color: N.thinking }}>Colloqui gratuiti con psicologi per studenti</div>
              <div
                style={{
                  marginTop: 14,
                  alignSelf: "flex-start",
                  background: booked ? N.greenBg : `linear-gradient(135deg, ${N.purpleHi}, ${N.purple})`,
                  border: booked ? `2px solid ${N.greenLine}` : "2px solid transparent",
                  color: booked ? N.green : "#fff",
                  fontFamily: DISPLAY,
                  fontSize: 42,
                  fontWeight: 700,
                  padding: "22px 40px",
                  borderRadius: 40,
                  scale: interpolate(frame, [tap, tap + 3, tap + 8], [1, 0.94, 1], clamp),
                }}
              >
                {booked ? "Richiesta inviata" : "Prenota un colloquio"}
              </div>
            </div>
          ) : null}
        </NayaApp>
      </AbsoluteFill>
      <Caption at={tap + 14} size={64}>
        Quando serve una persona,
        <br />
        Naya ti aiuta a trovarla.
      </Caption>
      <AbsoluteFill style={{ opacity: interpolate(frame, [app - 8, app], [1, 0], clamp) }}>
        <StoreCard
          lines={
            <>
              Una settimana
              <br />
              <Hi>dopo.</Hi>
            </>
          }
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
