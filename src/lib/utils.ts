export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function random(max: number) {
  return Math.floor(Math.random() * max);
}
