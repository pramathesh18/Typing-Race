/**
 * Pure functions for typing calculations and race metrics.
 */

export const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Speed and accuracy determine who crosses the finish line first in this high-adrenaline typing competition.",
  "Engine revving at the starting grid, waiting for the green signal. Precise keystrokes propel your vehicle forward at maximum velocity.",
  "Victory favors the typist who maintains laser focus under pressure. Fast fingers and zero mistakes create unstoppable race champions."
];

/**
 * Calculates typing statistics given target text, typed input, total keystrokes, and elapsed time in seconds.
 */
export function calculateTypingStats(targetText, typedInput, totalKeystrokes, elapsedSeconds) {
  let correctChars = 0;
  let firstErrorIndex = -1;

  for (let i = 0; i < typedInput.length; i++) {
    if (i < targetText.length && typedInput[i] === targetText[i]) {
      if (firstErrorIndex === -1) {
        correctChars++;
      }
    } else {
      if (firstErrorIndex === -1) {
        firstErrorIndex = i;
      }
    }
  }

  // Progress percentage based on correct consecutive characters typed
  const progressPercent = Math.min(100, Math.floor((correctChars / targetText.length) * 100));

  // WPM = (Words typed / Time in minutes) where 1 word = 5 characters
  // Clamp elapsed time to a minimum of 2 seconds to prevent artificial initial WPM spikes
  const timeInSeconds = Math.max(elapsedSeconds, 2);
  const minutes = timeInSeconds / 60;
  const wordsTyped = correctChars / 5;
  const wpm = Math.round(wordsTyped / minutes);

  // Accuracy percentage = (Correct keystrokes / Total keystrokes) * 100
  const accuracy = totalKeystrokes > 0 
    ? Math.min(100, Math.max(0, Math.round((correctChars / totalKeystrokes) * 100)))
    : 100;

  const isFinished = correctChars === targetText.length;

  return {
    correctChars,
    firstErrorIndex,
    progressPercent,
    wpm,
    accuracy,
    isFinished
  };
}
