// run.mjs
// This sample uses the same public API regardless of whether the package
// ends up running on the native backend (available since v0.4.1, see
// multilingual-katakana#15) or the pure TypeScript fallback.
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

// Safe-Failure fallback check: MULTILINGUAL_KATAKANA_BACKEND=js forces the
// pure-TypeScript pipeline, while leaving it unset ("auto") lets the loader
// pick the fastest backend available on this machine. Comparing the two
// proves the public API produces identical output either way. Since v0.4.1,
// native platform packages are published for all 8 Tier 1 targets (see
// multilingual-katakana#15), so on a supported platform with the optional
// native package installed, "auto" exercises the native backend here; if
// the native package is skipped or unavailable, "auto" quietly falls back
// to pure-TS and the check still passes — so identical output alone isn't
// definitive proof of which backend ran. No changes are needed to this
// script either way, on supported or unsupported platforms.
console.log("");
console.log("=== Backend parity check (forced \"js\" vs \"auto\") ===");
const convertAll = (texts) => texts.map((text) => toKatakana(text));

process.env.MULTILINGUAL_KATAKANA_BACKEND = "js";
const jsResults = convertAll(samples);

delete process.env.MULTILINGUAL_KATAKANA_BACKEND; // back to "auto"
const autoResults = convertAll(samples);

const outputsMatch = jsResults.every((result, index) => result === autoResults[index]);
console.log(`Identical output across backends: ${outputsMatch}`);

const iterations = 1_000;
const warmupIterations = 100;

// A brief untimed warm-up absorbs first-call costs (lazy dictionary/backend
// initialization, JIT warm-up) so the measurement below reflects steady
// -state throughput rather than one-time setup work.
for (let index = 0; index < warmupIterations; index += 1) {
  for (const sample of samples) {
    toKatakana(sample);
  }
}

const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  for (const sample of samples) {
    toKatakana(sample);
  }
}

const elapsedMs = performance.now() - startedAt;
const totalConversions = iterations * samples.length;

console.log("");
console.log("=== Rough timing ===");
console.log(
  `${totalConversions.toLocaleString()} conversions in ${elapsedMs.toFixed(2)} ms`,
);
if (elapsedMs > 0) {
  const conversionsPerSecond = Math.round(totalConversions / (elapsedMs / 1_000));
  console.log(`Approx. ${conversionsPerSecond.toLocaleString()} conversions/sec`);
} else {
  console.log("Elapsed time too small to measure reliably on this machine.");
}
console.log("");
console.log(
  "Note: since v0.4.1, npm installs on a supported platform (8 Tier 1 targets) automatically use " +
    "the native backend when the optional package is installed; unsupported (or opted-out) platforms " +
    "fall back to pure-TS \u2014 no application code changes needed either way.",
);
console.log(
  "There is also no public API yet to definitively report which backend is active at runtime.",
);
