# multilingual-katakana-samples

Minimal, copy-pasteable sample scripts for
[`@allpaqa/multilingual-katakana`](https://github.com/allpaqa-org/multilingual-katakana) —
a zero-dependency, ultra-fast (<0.1ms) multilingual katakana phonetic
converter for Japanese TTS.

This repo contains **no framework, no build step, no TypeScript
compilation** — just plain Node.js ESM scripts you can run directly to see
the library in action. If you only want to see "import it, call it,
here's the output", start here.

## Quick start

```bash
git clone https://github.com/allpaqa-org/multilingual-katakana-samples.git
cd multilingual-katakana-samples
npm install
npm start                      # runs examples/01-basic.mjs
```

Or run any example directly:

```bash
node examples/01-basic.mjs
node examples/02-options.mjs
node examples/03-streaming-comment.mjs
cd node-native && npm install && npm start
```

## Examples

| File | What it shows |
|---|---|
| [`examples/01-basic.mjs`](examples/01-basic.mjs) | The simplest possible usage: `toKatakana(text)` on a handful of multilingual chat comments (English, Korean, Chinese, Russian, Spanish). |
| [`examples/02-options.mjs`](examples/02-options.mjs) | `KatakanaOptions`: disabling a language flag, and protecting URLs/@mentions from conversion with `exclude`. |
| [`examples/03-streaming-comment.mjs`](examples/03-streaming-comment.mjs) | A realistic VTuber/streaming use case: reading a live chat feed aloud, including the Safe Kanji Guard (Japanese kanji comments pass through untouched instead of being misread as Chinese pinyin). |
| [`node-native/`](node-native) | A Node.js sample for the future native backend path: the script uses the normal package API today, checks output parity across forced `js`/`auto` backend modes, and — once per-platform native packages ship (issue [#15](https://github.com/allpaqa-org/multilingual-katakana/issues/15)) — an upgrade of the dependency is enough to benefit from them, with no code changes. |

> There is currently no public backend-introspection API, so the
> `node-native/` sample demonstrates identical usage and rough timing, not
> a definitive “native vs TS” assertion. See issue
> [#18](https://github.com/allpaqa-org/multilingual-katakana/issues/18).

## Requirements

- Node.js 20+
- No other dependencies — `@allpaqa/multilingual-katakana` itself ships
  with zero runtime dependencies (see the
  [main repository](https://github.com/allpaqa-org/multilingual-katakana)
  for full docs, supported languages, and the API reference).

## License

MIT — see [`LICENSE`](LICENSE).
