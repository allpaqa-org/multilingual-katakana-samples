# multilingual-katakana-samples

[`@allpaqa/multilingual-katakana`](https://github.com/allpaqa-org/multilingual-katakana)
（日本語TTS向けの、依存ゼロ・超高速（<0.1ms）多言語カタカナ変換ライブラリ）の、
最小構成でそのままコピペできるサンプルスクリプト集です。

このリポジトリには**フレームワークもビルド手順もTypeScriptのコンパイルも
ありません**。プレーンなNode.js ESMスクリプトをそのまま実行するだけで、
ライブラリの動作を確認できます。「とにかくimportして呼び出すだけ」を
体験したい方はこちらからどうぞ。

## クイックスタート

```bash
git clone https://github.com/allpaqa-org/multilingual-katakana-samples.git
cd multilingual-katakana-samples
npm install
npm start                      # examples/01-basic.mjs を実行
```

各サンプルは個別にも実行できます:

```bash
node examples/01-basic.mjs
node examples/02-options.mjs
node examples/03-streaming-comment.mjs
```

## サンプル一覧

| ファイル | 内容 |
|---|---|
| [`examples/01-basic.mjs`](examples/01-basic.mjs) | 最もシンプルな使い方。英語・韓国語・中国語・ロシア語・スペイン語の配信コメントに `toKatakana(text)` を適用。 |
| [`examples/02-options.mjs`](examples/02-options.mjs) | `KatakanaOptions` の使い方。言語フラグの無効化や、`exclude` によるURL/メンションの変換保護。 |
| [`examples/03-streaming-comment.mjs`](examples/03-streaming-comment.mjs) | VTuber/配信での実用例。ライブチャットの読み上げと、Safe Kanji Guard（日本語の漢字コメントを中国語ピンインと誤認せずそのまま維持する仕組み）のデモ。 |

## 必要環境

- Node.js 20以上
- 追加の依存関係は不要です。`@allpaqa/multilingual-katakana` 自体が
  ランタイム依存ゼロで動作します（対応言語一覧やAPIリファレンスの詳細は
  [本体リポジトリ](https://github.com/allpaqa-org/multilingual-katakana) を
  参照してください）。

## ライセンス

MIT — [`LICENSE`](LICENSE) を参照してください。
