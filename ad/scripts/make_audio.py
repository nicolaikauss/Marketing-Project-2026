"""Synthesise the soundtrack assets for the Naya ad (no external audio needed).

Outputs to public/audio/: pad.wav (30s music bed), typing.wav, chime.wav, click.wav, tick.wav
"""
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter
from pathlib import Path

SR = 44100
OUT = Path(__file__).resolve().parent.parent / "public" / "audio"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(7)


def write(name, x, peak=0.8):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    wavfile.write(OUT / name, SR, (x * 32767).astype(np.int16))


def lowpass(x, hz):
    b, a = butter(2, hz / (SR / 2))
    return lfilter(b, a, x)


def env(n, attack, release):
    e = np.ones(n)
    a, r = int(attack * SR), int(release * SR)
    e[:a] = np.linspace(0, 1, a)
    e[-r:] = np.linspace(1, 0, r)
    return e


def voice(freq, dur, detune=0.003):
    t = np.arange(int(dur * SR)) / SR
    s = sum(np.sin(2 * np.pi * freq * (1 + d) * t) for d in (-detune, 0, detune)) / 3
    s += 0.18 * np.sin(2 * np.pi * freq * 2 * t)
    return s


def chord(freqs, dur, attack=1.5, release=1.5, gain=1.0):
    x = sum(voice(f, dur) for f in freqs) / len(freqs)
    return x * env(len(x), attack, release) * gain


def place(track, x, start):
    i = int(start * SR)
    track[i:i + len(x)] += x[: len(track) - i]


DUR = 30.0
bed = np.zeros(int(DUR * SR))
# Night (0-17s): hushed A minor add9, slow breathing
place(bed, chord([110.0, 164.81, 246.94, 261.63], 9.5, 2.5, 2.0, 0.55), 0.0)
place(bed, chord([87.31, 130.81, 196.0, 261.63], 9.0, 2.0, 2.5, 0.55), 8.0)  # Fmaj7-ish
# Morning lift (17-26s): brighter F -> C with arpeggio
place(bed, chord([174.61, 220.0, 261.63, 329.63], 5.5, 0.6, 1.5, 0.7), 16.8)
place(bed, chord([130.81, 196.0, 329.63, 392.0], 9.0, 1.0, 3.0, 0.7), 21.5)
bed = lowpass(bed, 2200)

arp = np.zeros_like(bed)
notes = [523.25, 659.25, 783.99, 659.25, 698.46, 880.0, 783.99, 659.25]
beat = 60 / 92 / 2
t0 = 17.2
k = 0
while t0 < 27.5:
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = notes[k % len(notes)]
    pl = np.sin(2 * np.pi * f * t) * np.exp(-t * 7) + 0.3 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 12)
    place(arp, pl * 0.22, t0)
    t0 += beat
    k += 1
mix = bed + arp
mix *= env(len(mix), 0.8, 2.0)
write("pad.wav", mix, 0.55)

# Typing: 4s of soft key taps, ~11 per second with jitter
typing = np.zeros(int(4 * SR))
t = 0.02
while t < 3.9:
    n = int(0.03 * SR)
    burst = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 180)
    burst = lowpass(burst, 3500) * rng.uniform(0.6, 1.0)
    place(typing, burst, t)
    t += rng.uniform(0.07, 0.11)
write("typing.wav", typing, 0.35)

# Notification chime: two soft bells
ch = np.zeros(int(1.2 * SR))
for f, st in ((1318.5, 0.0), (1975.5, 0.12)):
    n = int(1.0 * SR)
    tt = np.arange(n) / SR
    place(ch, np.sin(2 * np.pi * f * tt) * np.exp(-tt * 5), st)
write("chime.wav", ch, 0.4)

# UI click
n = int(0.05 * SR)
tt = np.arange(n) / SR
write("click.wav", np.sin(2 * np.pi * 900 * tt) * np.exp(-tt * 90), 0.35)

# Clock tick
n = int(0.04 * SR)
write("tick.wav", lowpass(rng.standard_normal(n), 5000) * np.exp(-np.arange(n) / SR * 150), 0.3)
print("audio written to", OUT)
