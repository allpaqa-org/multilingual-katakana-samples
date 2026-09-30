# node-native sample

This sample shows that the public API stays the same no matter which
backend executes underneath `@allpaqa/multilingual-katakana`.

- **Same API, same Safe-Failure behavior:** the code calls `toKatakana`
  exactly the same way whether the runtime ends up using a native backend
  or the pure TypeScript fallback.
- **Native binaries are published as of v0.4.1:** per-platform native
  packages for all 8 Tier 1 targets
  (`darwin-arm64`, `darwin-x64`, `linux-x64-gnu`, `linux-arm64-gnu`,
  `linux-x64-musl`, `linux-arm64-musl`, `win32-x64-msvc`, `win32-arm64-msvc`)
  now ship automatically via `optionalDependencies`, see
  [allpaqa-org/multilingual-katakana#15](https://github.com/allpaqa-org/multilingual-katakana/issues/15).
  A normal `npm install` on a supported platform now pulls in the matching
  native binary with no application code changes; unsupported platforms
  still fall back to the pure TypeScript backend automatically.
- **Backend parity check:** the script forces `MULTILINGUAL_KATAKANA_BACKEND=js`
  for one pass and leaves it unset ("auto") for another, then confirms both
  produce identical output. On a supported platform with the optional native
  package installed, "auto" exercises the native backend, so this check
  compares native vs. pure-TS output; if the native package is skipped (e.g.
  `--omit=optional`) or unavailable, "auto" quietly falls back to pure-TS and
  the check still passes, so identical output alone does not prove which
  backend actually ran (see the note below).
- **No public backend introspection API yet:** there is currently no
  supported `getBackend()`-style API to definitively tell which backend is
  active at runtime; that is tracked in
  [allpaqa-org/multilingual-katakana#18](https://github.com/allpaqa-org/multilingual-katakana/issues/18).
  Because of that, this sample demonstrates behavior and rough timing only,
  not a definitive “native vs TS” assertion.

## Run

```bash
cd node-native
npm install
npm start
```

The script prints a few multilingual conversions and a small repeated-loop
timing measurement. Now that native binaries are available (v0.4.1+),
consumers don't need to change any code to benefit from them.
