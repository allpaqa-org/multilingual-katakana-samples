// 03-streaming-comment.mjs
// A realistic use case: reading a stream chat feed aloud in Japanese TTS.
// Kanji-containing Japanese comments must pass through untouched (Safe
// Kanji Guard), while foreign-language comments get katakana-ized so a
// Japanese TTS voice can read them naturally.
import { toKatakana } from "@allpaqa/multilingual-katakana";

const chatFeed = [
  "了解です！", // Japanese kanji: must NOT be mistaken for Chinese pinyin
  "hello from the US, big fan!",
  "정말 재밌어요 ㅋㅋㅋ",
  "666666 牛逼",
  "жиза, го дальше",
];

console.log("=== TTS-ready katakana feed ===");
for (const line of chatFeed) {
  console.log(toKatakana(line));
}
