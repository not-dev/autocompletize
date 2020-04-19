[English](./README.md) / 日本語

<!-- ![](https://) -->

# autocompletize

HTMLのプレーンなinputフォームから、オートコンプリート付きのinputフォームを作成します。

## インストール

Releaseからautocompletize.zipをダウンロードして、解凍して自分のプロジェクトに配置してください。

* mod/autocompletize~.min.js: プログラムの本体です
* mod/ekiapi~.min.js: サンプルに使用している、駅すぱあとAPIから駅名のリストを取得するモジュールです
* sample_minimum: 最小構成のサンプルです
* sample: 一般的な用途を想定したサンプルです

## 使用方法

### オートコンプリートの内容固定の場合

1. autocompletize~.min.jsを読み込みます
1. autocompletize.update({ target, data})の形でオートコンプリートに表示するデータを渡します
1. targetはHTMLInputElement, dataはArray\<string>です

```html
<head>
<script src="mod/autocompletize.min.js"></script>
</head>
<body>
  <input id="input" type="text" autocomplete="off" />
  <script>
    const target = document.getElementById('input')
    const data = ['fish', 'chicken', 'beef', 'pork', 'cheese', 'patties', 'pickles']
    target.addEventListener('focus', () => autocompletize.update({ target: target, data: data }))
  </script>
</body>
```

### 入力に合わせてデータを更新したい場合

1. フォームのinputイベントに対して、入力を取得します
1. 取得した入力から表示したいデータを生成します(例えば入力 >> API検索 >> 結果のリストを表示)
1. autocompletize.update({ target, data})の形でオートコンプリートを更新します

```javascript
const target = document.getElementById('input')
axios.get(url, data)
  .then(res => {
    const obj = JSON.parse((JSON.stringify(res.data)))
    autocompletize.update({ target: target, data: obj.hoge })
  })
```

## ライセンス

* コード: MIT License
* ロゴ: CC BY-ND
* このプロジェクトはOSSを含みます
