#!/usr/bin/env node
// Runs every sample script and asserts both that it starts up successfully
// (no crash / no ERR_MODULE_NOT_FOUND-style install regressions) and that
// its output has the expected shape. This intentionally avoids pinning the
// exact katakana strings for every example (which would make CI brittle
// against future library improvements) and instead checks the structural
// guarantees each sample is meant to demonstrate.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

function run(relativeScriptPath, { cwd = repoRoot } = {}) {
  return execFileSync(process.execPath, [relativeScriptPath], {
    cwd,
    encoding: "utf8",
  });
}

function check(name, fn) {
  try {
    fn();
    console.log(`ok   - ${name}`);
  } catch (error) {
    console.error(`FAIL - ${name}`);
    console.error(error);
    process.exitCode = 1;
  }
}

const KATAKANA_PATTERN = /[\u30A0-\u30FF]/;

check("examples/01-basic.mjs runs and converts every sample line", () => {
  const output = run("examples/01-basic.mjs");
  const lines = output.trim().split("\n");
  assert.equal(lines.length, 5, "expected exactly 5 output lines");
  for (const line of lines) {
    const [original, converted] = line.split("  ->  ");
    assert.ok(converted, `line missing "-> <output>": ${line}`);
    assert.notEqual(
      converted,
      original,
      `line was not actually converted (output equals input): ${line}`,
    );
    assert.match(
      converted,
      KATAKANA_PATTERN,
      `expected converted output to contain katakana: ${line}`,
    );
  }
});

check("examples/02-options.mjs demonstrates enableEnglish and exclude", () => {
  const output = run("examples/02-options.mjs");
  const [defaultLine, noEnglishLine, excludeLine] = output.trim().split("\n");

  assert.ok(defaultLine.startsWith("default"), "missing default line");
  assert.ok(
    !defaultLine.includes("check"),
    "default output should katakana-ize the English word 'check'",
  );

  assert.ok(noEnglishLine.startsWith("no-english"), "missing no-english line");
  assert.ok(
    noEnglishLine.includes("check https://example.com/live and say hi to @moderator"),
    "enableEnglish: false should leave English words untouched",
  );

  assert.ok(excludeLine.startsWith("exclude"), "missing exclude line");
  assert.ok(
    excludeLine.includes("https://example.com/live") && excludeLine.includes("@moderator"),
    "exclude option should preserve the URL and @mention verbatim",
  );
  assert.ok(
    !excludeLine.includes("check"),
    "exclude output should still katakana-ize non-excluded English words",
  );
});

check("examples/03-streaming-comment.mjs applies the Safe Kanji Guard", () => {
  const output = run("examples/03-streaming-comment.mjs");
  const lines = output.trim().split("\n");
  assert.equal(lines[0], "=== TTS-ready katakana feed ===");
  assert.equal(lines.length, 6, "expected a header line plus 5 converted lines");
  assert.equal(
    lines[1],
    "了解です！",
    "Japanese kanji input must pass through unchanged, not be mistaken for Chinese pinyin",
  );
});

check("node-native/run.mjs installs on ^0.4.0 and reports backend parity", () => {
  const nodeNativeDir = new URL("../node-native/", import.meta.url);
  execFileSync("npm", ["install", "--no-audit", "--no-fund"], {
    cwd: nodeNativeDir,
    stdio: "inherit",
  });
  const output = run("run.mjs", { cwd: nodeNativeDir });
  assert.match(output, /=== Sample outputs ===/);
  assert.match(output, /Identical output across backends: true/);
  assert.match(output, /=== Rough timing ===/);
});

if (process.exitCode) {
  console.error("\nOne or more example checks failed.");
  process.exit(process.exitCode);
}
console.log("\nAll example checks passed.");
