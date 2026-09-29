# node-native sample

This sample shows that the public API stays the same no matter which
backend executes underneath `@allpaqa/multilingual-katakana`.

- **Same API, same Safe-Failure behavior:** the code calls `toKatakana`
  exactly the same way whether the runtime ends up using a native backend
  or the pure TypeScript fallback.
- **Native binaries are not published yet:** today, a normal npm install
  still runs on the pure TypeScript backend because per-platform native
  packages are tracked separately in
  [allpaqa-org/multilingual-katakana#15](https://github.com/allpaqa-org/multilingual-katakana/issues/15).
  Once those binaries are published, this exact sample will pick them up
  automatically with no application code changes.
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
timing measurement. When native binaries become available, consumers will
not need to change this code.
