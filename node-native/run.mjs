// run.mjs
// This sample uses the same public API regardless of whether the package
// ends up running on a future native backend or today's pure TypeScript
// fallback.
import { toKatakana } from "@allpaqa/multilingual-katakana";

const samples = [
  "GG! that was amazing",
  "니 목소리 진짜 좋다",
  "太厉害了吧",
  "Спасибо за стрим!",
  "que lindo streamer",
];

console.log("=== Sample outputs ===");
for (const sample of samples) {
  console.log(`${sample}  ->  ${toKatakana(sample)}`);
}

const iterations = 1_000;
const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  for (const sample of samples) {
    toKatakana(sample);
  }
}

const elapsedMs = performance.now() - startedAt;
const totalConversions = iterations * samples.length;
const conversionsPerSecond = Math.round(
  totalConversions / (elapsedMs / 1_000 || 1),
);

console.log("");
console.log("=== Rough timing ===");
console.log(
  `${totalConversions.toLocaleString()} conversions in ${elapsedMs.toFixed(2)} ms`,
);
console.log(
  `Approx. ${conversionsPerSecond.toLocaleString()} conversions/sec`,
);
console.log("");
console.log(
  "Note: native binaries are not published yet, so npm installs currently use the pure-TS fallback.",
);
console.log(
  "Once per-platform native packages ship, this same script will pick them up automatically with no code changes.",
);
console.log(
  "There is also no public API yet to definitively report which backend is active at runtime.",
);
