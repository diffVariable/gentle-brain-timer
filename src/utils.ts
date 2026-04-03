export const playDoneAlarm = () => {
  const ctx = new AudioContext();

  // Ring = rapid on/off pulses at a bell-like frequency
  const ringFreq = 1400;
  const pulseCount = 20;
  const pulseInterval = 0.17; // seconds between each pulse
  const pulseDuration = 0.12;

  for (let i = 0; i < pulseCount; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Subtle high overtone for bell texture
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.value = ringFreq;
    osc2.type = "sine";
    osc2.frequency.value = ringFreq * 2.76; // bell overtone ratio

    const start = ctx.currentTime + i * pulseInterval;
    const vol = 0.22 * (1 - i * 0.07); // gently fade out over pulses

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, start + pulseDuration);

    gain2.gain.setValueAtTime(0, start);
    gain2.gain.linearRampToValueAtTime(vol * 0.3, start + 0.008);
    gain2.gain.exponentialRampToValueAtTime(0.001, start + pulseDuration);

    osc.start(start);
    osc.stop(start + pulseDuration);
    osc2.start(start);
    osc2.stop(start + pulseDuration);
  }
};
