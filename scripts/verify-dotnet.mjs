#!/usr/bin/env node
// Runs the .NET sample and asserts that it runs successfully
// and that its output has the expected shape.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

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

check("dotnet-native runs and produces expected shape", () => {
  const output = execFileSync("dotnet", ["run", "--project", "dotnet-native"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  const oneCallHeader = "=== One call ===";
  const reusableHeader = "=== Reusable converter with options ===";

  const oneCallIndex = output.indexOf(oneCallHeader);
  const reusableIndex = output.indexOf(reusableHeader);

  assert.ok(oneCallIndex !== -1, "expected '=== One call ===' section header");
  assert.ok(
    reusableIndex !== -1,
    "expected '=== Reusable converter with options ===' section header",
  );
  assert.ok(oneCallIndex < reusableIndex, "section headers must appear in order");

  // Extract lines under "=== One call ===" up to "=== Reusable converter with options ==="
  const oneCallSection = output.slice(oneCallIndex + oneCallHeader.length, reusableIndex);
  const oneCallLines = oneCallSection
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  assert.equal(oneCallLines.length, 3, "expected exactly 3 lines under 'One call'");

  for (const line of oneCallLines) {
    const parts = line.split("  ->  ");
    assert.equal(parts.length, 2, `line missing '  ->  ': ${line}`);
    const [original, converted] = parts;
    assert.notEqual(
      converted,
      original,
      `output should differ from input: ${line}`,
    );
    assert.match(
      converted,
      KATAKANA_PATTERN,
      `expected converted output to contain katakana: ${line}`,
    );
  }

  // Extract lines under "=== Reusable converter with options ==="
  const reusableSection = output.slice(reusableIndex + reusableHeader.length);
  const reusableLines = reusableSection
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  assert.ok(reusableLines.length >= 1, "expected at least one line under 'Reusable converter'");
  const reusableLine = reusableLines[0];
  const reusableParts = reusableLine.split("  ->  ");
  assert.equal(reusableParts.length, 2, `line missing '  ->  ': ${reusableLine}`);
  const [, reusableConverted] = reusableParts;
  assert.ok(
    reusableConverted.includes("你好"),
    `expected reusable output to still contain '你好': ${reusableLine}`,
  );
  assert.match(
    reusableConverted,
    KATAKANA_PATTERN,
    `expected reusable output to contain katakana: ${reusableLine}`,
  );
});

if (process.exitCode) {
  console.error("\nOne or more .NET sample checks failed.");
  process.exit(process.exitCode);
}
console.log("\nAll .NET sample checks passed.");
