// 02-options.mjs
// KatakanaOptions: toggle languages on/off, normalize punctuation, and
// protect substrings (URLs, mentions, emote codes) with `exclude`.
import { toKatakana } from "@allpaqa/multilingual-katakana";

const text = "check https://example.com/live and say hi to @moderator lol";

// Default: every language is enabled.
console.log("default   ->", toKatakana(text));

// Disable English romanization if you only want CJK/Cyrillic/Spanish, etc.
console.log("no-english->", toKatakana(text, { enableEnglish: false }));

// Protect URLs and @mentions from being katakana-ized.
console.log(
  "exclude   ->",
  toKatakana(text, { exclude: [/https?:\/\/\S+/g, /@\w+/g] }),
);
