// 01-basic.mjs
// The simplest possible usage: import, convert, print.
import { toKatakana } from "@allpaqa/multilingual-katakana";

const comments = [
  "GG! that was amazing",
  "니 목소리 진짜 좋다",
  "太厉害了吧",
  "Спасибо за стрим!",
  "que lindo streamer",
];

for (const comment of comments) {
  console.log(`${comment}  ->  ${toKatakana(comment)}`);
}
