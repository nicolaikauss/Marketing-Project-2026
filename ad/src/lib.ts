import { loadFont } from "@remotion/fonts";
import { Easing, interpolate, staticFile } from "remotion";

/** Display face ≈ the app's heavy geometric headings; body ≈ iOS system text */
export const DISPLAY = "Figtree";
export const BODY = "Inter";
export const FONT = BODY;

const faces: [string, string, string, string][] = [
  [DISPLAY, "figtree-latin-500-normal.woff2", "500", "normal"],
  [DISPLAY, "figtree-latin-700-normal.woff2", "700", "normal"],
  [DISPLAY, "figtree-latin-800-normal.woff2", "800", "normal"],
  [BODY, "inter-latin-400-normal.woff2", "400", "normal"],
  [BODY, "inter-latin-500-normal.woff2", "500", "normal"],
  [BODY, "inter-latin-600-normal.woff2", "600", "normal"],
  [BODY, "inter-latin-400-italic.woff2", "400", "italic"],
];
for (const [family, file, weight, style] of faces) {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight, style });
}

/** Colours sampled from the Naya app and its App Store screenshots */
export const N = {
  bg: "#0E0A19", // chat background
  text: "#EFEBF6", // Naya reply text
  muted: "#6E6880", // disclaimer, placeholder
  thinking: "#BDB6CC",
  purple: "#9E4EE3", // user bubble / send
  purpleHi: "#B874F5",
  violet: "#A855F7", // marketing highlight
  lilac: "#C77DFF",
  headerTop: "#E3AAA1", // peach glow at the top of the header
  headerMid: "#7F3870",
  headerLow: "#4A0E78",
  headerEnd: "#2A0648",
  subtitle: "#C9B8E0",
  input: "#1E1528",
  inputDeep: "#171120",
  green: "#4ADE80",
  greenBg: "#0B1A12",
  greenLine: "#2F6B3A",
  paper: "#F9F6FD", // App Store card background
  ink: "#18101F", // App Store headline
  inkSoft: "#4A4458",
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

/** 0→1 over [start, start+dur] with ease-out */
export const appear = (frame: number, start: number, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing: easeOut });

/** Characters of `text` visible when typing from `start`, `perChar` frames per character */
export const typed = (text: string, frame: number, start: number, perChar = 1.4) =>
  text.slice(0, Math.max(0, Math.floor((frame - start) / perChar)));
