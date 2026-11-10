import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { appear, BODY, clamp, DISPLAY, easeOut, N } from "./lib";

/* ---------- brand assets (cropped from the app / App Store icon) ---------- */

export const RingGlow: React.FC<{ size: number }> = ({ size }) => (
  <Img src={staticFile("ring_glow.png")} style={{ width: size, height: size, objectFit: "contain" }} />
);
export const LogoLavender: React.FC<{ size: number }> = ({ size }) => (
  <Img src={staticFile("logo_lavender.png")} style={{ width: size, height: size, objectFit: "contain" }} />
);

/* ---------- small icons drawn to match the app's outline style ---------- */

const Hamburger = () => (
  <svg width="56" height="40" viewBox="0 0 56 40">
    {[4, 20, 36].map((y) => (
      <rect key={y} x="2" y={y - 2} width="50" height="5" rx="2.5" fill="#fff" />
    ))}
  </svg>
);
const ChatStar = () => (
  <svg width="84" height="72" viewBox="0 0 84 72" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinejoin="round">
    <path d="M14 6h60a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6H52l-10 12V48" />
    <path d="M22 34l4.5 9 10 1.4-7.2 7 1.7 9.9L22 56.6l-9 4.7 1.7-9.9-7.2-7 10-1.4z" />
  </svg>
);
const Shield = () => (
  <svg width="44" height="48" viewBox="0 0 44 48" fill="none" stroke={N.green} strokeWidth="4" strokeLinejoin="round">
    <path d="M22 3l17 6v13c0 11-8 19-17 23C13 41 5 33 5 22V9z" />
    <path d="M14 24l6 6 11-12" strokeLinecap="round" />
  </svg>
);
const Mic = () => (
  <svg width="36" height="50" viewBox="0 0 36 50" fill="none" stroke="#B9B2C8" strokeWidth="4" strokeLinecap="round">
    <rect x="10" y="3" width="16" height="28" rx="8" />
    <path d="M4 24a14 14 0 0 0 28 0M18 38v9" />
  </svg>
);
const Send = ({ on }: { on: boolean }) => (
  <svg width="50" height="44" viewBox="0 0 50 44">
    <path d="M4 4l42 18L4 40l6-18z" fill={on ? "#FFFFFF" : "#6D5A86"} />
  </svg>
);
const Thumbs = () => (
  <svg width="120" height="44" viewBox="0 0 120 44" fill="none" stroke="#7B748C" strokeWidth="3.4" strokeLinejoin="round">
    <path d="M4 20h8v20H4zM12 22l8-16c5 0 6 4 5 8l-2 6h11c3 0 5 3 4 6l-4 12c-1 2-2 2-4 2H12" />
    <path d="M76 24h8V4h-8zM84 22l8 16c5 0 6-4 5-8l-2-6h11c3 0 5-3 4-6l-4-12c-1-2-2-2-4-2H84" />
  </svg>
);

/* ---------- the Naya chat screen, full-bleed like a screen recording ---------- */

type AppProps = {
  time: string;
  input?: string;
  plan?: "Free" | "Plus";
  children?: React.ReactNode;
  /** show the "Ciao, sono Naya / Come stai?" empty state */
  empty?: number; // 0..1 opacity
};

export const NayaApp: React.FC<AppProps> = ({ time, input = "", plan = "Plus", children, empty = 0 }) => (
  <AbsoluteFill style={{ background: N.bg, fontFamily: BODY }}>
    {/* header: peach glow → purple, rounded bottom */}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 360,
        borderBottomLeftRadius: 44,
        borderBottomRightRadius: 44,
        background: `radial-gradient(ellipse 70% 55% at 50% 0%, ${N.headerTop} 0%, rgba(227,170,161,0) 70%), linear-gradient(180deg, ${N.headerMid} 0%, ${N.headerLow} 45%, ${N.headerEnd} 80%, ${N.bg} 100%)`,
      }}
    >
      <div style={{ position: "absolute", left: 110, top: 52, fontSize: 50, fontWeight: 600, color: "#fff" }}>{time}</div>
      <div style={{ position: "absolute", right: 90, top: 58, display: "flex", gap: 14, alignItems: "flex-end" }}>
        {[16, 24, 32, 40].map((h, i) => (
          <div key={h} style={{ width: 11, height: h, borderRadius: 3, background: i < 2 ? "#fff" : "rgba(255,255,255,0.45)" }} />
        ))}
        <div style={{ width: 70, height: 34, borderRadius: 11, border: "3px solid #fff", marginLeft: 14, padding: 4 }}>
          <div style={{ width: "58%", height: "100%", borderRadius: 6, background: "#fff" }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 60, top: 208 }}>
        <Hamburger />
      </div>
      <div style={{ position: "absolute", left: 158, top: 170, display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: DISPLAY, fontSize: 78, fontWeight: 800, color: "#fff", lineHeight: 1 }}>Naya</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10 }}>
          <span style={{ fontSize: 40, color: N.subtitle }}>New Chat</span>
          <div style={{ width: 3, height: 32, background: N.subtitle, rotate: "40deg" }} />
        </div>
      </div>
      <div style={{ position: "absolute", right: 60, top: 196 }}>
        <ChatStar />
      </div>
    </div>

    {/* empty state */}
    {empty > 0 ? (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: empty, top: -60 }}>
        <RingGlow size={300} />
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.12,
            color: "#F2EEF8",
            textAlign: "center",
            marginTop: 30,
            letterSpacing: -1,
          }}
        >
          Ciao, sono Naya
          <br />
          Come stai?
        </div>
      </AbsoluteFill>
    ) : null}

    {/* messages, bottom-aligned above the footer */}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 380,
        bottom: 470,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: 34,
        padding: "0 44px",
        overflow: "hidden",
      }}
    >
      {children}
    </div>

    {/* footer: disclaimer, group-access pill, input row */}
    <div style={{ position: "absolute", left: 40, right: 40, bottom: 60, display: "flex", flexDirection: "column", gap: 26 }}>
      <div style={{ fontSize: 32, lineHeight: 1.3, color: N.muted, textAlign: "center" }}>
        Naya è un assistente AI e può commettere errori.
        <br />
        In caso di emergenza chiama il 112.
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          background: N.greenBg,
          border: `2px solid ${N.greenLine}`,
          borderRadius: 30,
          padding: "22px 34px",
        }}
      >
        <Shield />
        <span style={{ fontFamily: DISPLAY, fontSize: 40, fontWeight: 700, color: N.green }}>Accesso di gruppo attivo · {plan}</span>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <div
          style={{
            flex: 1,
            background: N.input,
            borderRadius: 60,
            padding: "0 40px",
            height: 116,
            display: "flex",
            alignItems: "center",
            fontSize: 42,
            color: input ? N.text : N.muted,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {input || "Scrivi qualcosa..."}
          {input ? <span style={{ color: "#5B8CFF", marginLeft: 2 }}>|</span> : null}
        </div>
        <div style={{ width: 116, height: 116, borderRadius: 58, background: N.inputDeep, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Mic />
        </div>
        <div
          style={{
            width: 116,
            height: 116,
            borderRadius: 58,
            background: input ? `linear-gradient(135deg, ${N.purpleHi}, ${N.purple})` : "#3A2352",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Send on={!!input} />
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

/** Right-aligned purple gradient bubble, as in the app */
export const UserBubble: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div
      style={{
        alignSelf: "flex-end",
        maxWidth: 780,
        background: `linear-gradient(160deg, ${N.purpleHi} 0%, ${N.purple} 100%)`,
        color: "#fff",
        fontSize: 44,
        lineHeight: 1.32,
        padding: "30px 40px",
        borderRadius: 44,
        borderBottomRightRadius: 12,
        opacity: appear(frame, at, 8),
        translate: `0px ${interpolate(frame, [at, at + 10], [26, 0], clamp)}px`,
      }}
    >
      {children}
    </div>
  );
};

/** Naya replies are plain text on the background, with feedback icons underneath */
export const NayaText: React.FC<{ at: number; children: React.ReactNode; charsPerFrame?: number; text?: string }> = ({
  at,
  children,
  text,
  charsPerFrame = 2.2,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const streamed = text ? text.slice(0, Math.floor((frame - at) * charsPerFrame)) : null;
  const done = !text || streamed!.length >= text.length;
  return (
    <div style={{ alignSelf: "flex-start", maxWidth: 940, display: "flex", flexDirection: "column", gap: 20, opacity: appear(frame, at, 6) }}>
      <div style={{ fontSize: 44, lineHeight: 1.42, color: N.text, whiteSpace: "pre-line" }}>{streamed ?? children}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 28, opacity: done ? 1 : 0 }}>
        <Thumbs />
        <span style={{ fontSize: 40, color: "#7B748C", letterSpacing: 10 }}>···</span>
      </div>
    </div>
  );
};

/** "Sto leggendo quello che hai condiviso..." + three pulsing purple dots */
export const Thinking: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return (
    <div style={{ alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: 20 }}>
      <span style={{ fontSize: 36, color: N.thinking }}>Sto leggendo quello che hai condiviso...</span>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {[34, 26, 18].map((s, i) => (
          <div
            key={s}
            style={{
              width: s,
              height: s,
              borderRadius: s / 2,
              background: N.lilac,
              translate: `0px ${-8 * Math.abs(Math.sin((frame - from) / 6 + i * 0.8))}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/** iOS-style notification banner with the Naya app icon */
export const Notification: React.FC<{ from: number; hold: number; text: string }> = ({ from, hold, text }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        top: 70,
        background: "rgba(40,32,52,0.92)",
        borderRadius: 50,
        padding: "30px 34px",
        display: "flex",
        alignItems: "center",
        gap: 28,
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        fontFamily: BODY,
        translate: `0px ${interpolate(frame, [from, from + 12, from + hold, from + hold + 12], [-460, 0, 0, -460], { ...clamp, easing: easeOut })}px`,
      }}
    >
      <div style={{ width: 110, height: 110, borderRadius: 26, background: "#120D1C", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #2A2238" }}>
        <LogoLavender size={80} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 38, fontWeight: 600, color: "#fff" }}>Naya</span>
          <span style={{ fontSize: 32, color: "#A8A1B6" }}>adesso</span>
        </div>
        <span style={{ fontSize: 40, color: "#E9E4F1" }}>{text}</span>
      </div>
    </div>
  );
};

/** Lavender spirograph lines, as on the App Store screenshots */
export const Spiro: React.FC<{ opacity?: number; rotate?: number }> = ({ opacity = 0.55, rotate = 0 }) => (
  <svg width="1400" height="1400" viewBox="-700 -700 1400 1400" style={{ position: "absolute", right: -420, bottom: -380, opacity, rotate: `${rotate}deg` }}>
    {Array.from({ length: 34 }, (_, i) => (
      <ellipse key={i} cx={0} cy={0} rx={560 - i * 5} ry={250 + i * 4} fill="none" stroke="#C9A8F2" strokeWidth="2" transform={`rotate(${i * 5.3})`} />
    ))}
  </svg>
);

/** Light App-Store-style title card: dark heavy headline, one word in purple */
export const StoreCard: React.FC<{ lines: React.ReactNode; sub?: string }> = ({ lines, sub }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: N.paper, overflow: "hidden" }}>
      <Spiro rotate={frame * 0.15} />
      <div style={{ position: "absolute", left: 100, right: 100, top: 560, display: "flex", flexDirection: "column", gap: 34 }}>
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: 132,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -2,
            color: N.ink,
            opacity: appear(frame, 0, 10),
            translate: `0px ${interpolate(frame, [0, 14], [40, 0], { ...clamp, easing: easeOut })}px`,
          }}
        >
          {lines}
        </div>
        {sub ? <div style={{ fontFamily: BODY, fontSize: 48, color: N.inkSoft, opacity: appear(frame, 8, 12) }}>{sub}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

export const Hi: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: N.violet }}>{children}</span>;

/** Large on-screen line over a soft scrim at the bottom of the frame */
export const Caption: React.FC<{ at: number; children: React.ReactNode; size?: number; italic?: boolean }> = ({ at, children, size = 62, italic }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", pointerEvents: "none" }}>
      <div style={{ background: "linear-gradient(to top, rgba(14,10,25,0.97) 60%, rgba(14,10,25,0))", padding: "220px 90px 150px", opacity: appear(frame, at, 14) }}>
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: size,
            fontWeight: 800,
            fontStyle: italic ? "italic" : "normal",
            lineHeight: 1.18,
            color: "#F2EEF8",
            textAlign: "center",
            translate: `0px ${interpolate(frame, [at, at + 14], [24, 0], clamp)}px`,
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- a neutral, non-Naya messenger (for the group chat / mum scene) ---------- */

export const Messenger: React.FC<{ time: string; title: string; subtitle: string; initial: string; color: string; input?: string; children?: React.ReactNode }> = ({
  time,
  title,
  subtitle,
  initial,
  color,
  input = "",
  children,
}) => (
  <AbsoluteFill style={{ background: "#111214", fontFamily: BODY }}>
    <div style={{ height: 330, background: "#1B1C1F", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 60px 36px" }}>
      <span style={{ fontSize: 50, fontWeight: 600, color: "#fff", paddingLeft: 50 }}>{time}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ width: 110, height: 110, borderRadius: 55, background: color, color: "#fff", fontSize: 52, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {initial}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 54, fontWeight: 600, color: "#fff" }}>{title}</span>
          <span style={{ fontSize: 36, color: "#9A9CA3" }}>{subtitle}</span>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 340, bottom: 230, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 26, padding: "0 44px" }}>
      {children}
    </div>
    <div style={{ position: "absolute", left: 40, right: 40, bottom: 70, height: 116, borderRadius: 60, background: "#222328", display: "flex", alignItems: "center", padding: "0 40px", fontSize: 44, color: input ? "#fff" : "#6F7178" }}>
      {input || "Messaggio"}
      {input ? <span style={{ color: "#5B8CFF" }}>|</span> : null}
    </div>
  </AbsoluteFill>
);

export const GreyBubble: React.FC<{ name?: string; children: React.ReactNode }> = ({ name, children }) => (
  <div style={{ alignSelf: "flex-start", maxWidth: 800, background: "#26282D", color: "#EDEEF0", fontSize: 44, lineHeight: 1.32, padding: "26px 36px", borderRadius: 40, borderBottomLeftRadius: 12 }}>
    {name ? <div style={{ fontSize: 34, fontWeight: 600, color: "#7FB0FF", marginBottom: 6 }}>{name}</div> : null}
    {children}
  </div>
);
