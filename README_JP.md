[英語](./README.md) / 日本語

<!-- ![](https://) -->

# autocompletize

HTMLのプレーンなinputフォームから、オートコンプリート付きのinputフォームを作成します。

## インストール

Releaseからautocompletize.zipをダウンロードして、解凍して自分のプロジェクトに配置してください。

* mod/autocomplete~.min.js: プログラムの本体です
* mod/ekiapi~.min.js: サンプルに使用している、駅すぱあとAPIから駅名のリストを取得するモジュールです
* sample_minimum: 最小構成のサンプルです
* sample: 一般的な用途を想定したサンプルです

## 使用方法

1. autocomplete~.min.jsをimportします
1. autocomplete.update({ target, data})の形でオートコンプリートに表示するデータを渡します
1. targetはHTMLInputElement, dataはArray\<string>です

```html
<head>
<script src="mod/autocomplete.min.js"></script>
</head>
<body>
  <input id="input" type="text" autocomplete="off" />
  <script>
    const target = document.getElementById('input')
    const data = ['fish', 'chicken', 'beef', 'pork', 'cheese', 'patties', 'pickles']
    target.addEventListener('focus', () => autocomplete.update({ target: target, data: data }))
  </script>
</body>
```

* データを入力に合わせて更新する場合は、フォームのinputイベントに対して、入力 >> API検索 >> 結果をautocomplete.updateで反映という流れで更新できます(sample参照)

## ライセンス

* コード: MIT License
* ロゴ: CC BY-ND
* このプロジェクトはOSSを含みます
