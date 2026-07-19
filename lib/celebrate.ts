import confetti from "canvas-confetti";

export function celebrateGoal() {
  // Bottom left
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    startVelocity: 55,
    origin: {
      x: 0,
      y: 1,
    },
  });

  // Bottom right
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    startVelocity: 55,
    origin: {
      x: 1,
      y: 1,
    },
  });
}