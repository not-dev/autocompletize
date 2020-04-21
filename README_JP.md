[English](./README.md) / 日本語

<!-- ![](https://) -->

# autocompletize

HTMLのプレーンなinputフォームから、オートコンプリート付きのinputフォームを作成します。

## インストール

ReleaseからPackege.zipをダウンロードして、解凍して自分のプロジェクトに配置してください。

* autocompletize~.min.js: プログラムの本体です
* mod/ekiapi~.min.js: サンプルに使用している、駅すぱあとAPIから駅名のリストを取得するモジュールです
* sample: サンプルHTMLです

## 使用方法

### オートコンプリートの内容固定の場合

1. autocompletize~.min.jsを読み込みます
1. new autocompletize.Form(target: HTMLInputElement)でフォームの初期化をします。
1. autocompletize.update(data: Array\<string>)の形でオートコンプリートに表示するデータを渡します

```html
<head>
<script src="mod/autocompletize.min.js"></script>
</head>
<body>
  <input id="input" type="text" autocomplete="off" />
  <script>
    /* Specify the input element to apply autocomplete */
    const target = document.getElementById('input')
    /* Creates a autocomplete form instance */
    const form = new autocompletize.Form(target)
    /* Prepare an array of data */
    const data = ['fish', 'chicken', 'beef', 'pork', 'cheese', 'patties', 'pickles']
    /* Update autocomplete when the focus */
    target.addEventListener('focus', () => form.update(data))
  </script>
</body>
```

### 入力に合わせてデータを更新したい場合

1. フォームのinputイベントに対して、入力を取得します
1. 取得した入力から表示したいデータを生成します(例えば入力 >> API検索 >> 結果のリストを表示)
1. autocompletize.update(data: Array\<string>)の形でオートコンプリートを更新します
1. リアルタイムで変更を監視したい場合、changed()を使用してください
1. changed()は入力更新時に、入力値を渡して引数の関数を実行します。

```javascript
/* Specify the input element to apply autocomplete */
const target = document.getElementById(input)
/* Creates a autocomplete form instance */
const form = new autocompletize.Form(target)
/*
  Observe the input of changes and execute the function
  First argument is form value
*/
form.changed((res) => console.log(res))
/* addEventListener */
target.addEventListener('input', () => {
  /* In this example we get a list of station names */
  ekiapi.get(process.env.ekiApiKey, target)
  /* Then update form */
  .then(res => form.update(res))
  .catch(err => console.error(err))
})
```

## API

* Constructor
    + autocompletize.Form(target: HTMLInputElement)
        - Form initialization
* Attributes
    + Form.changed(func:(res?: string) => void)
        - Observe form updates and execute function
    + Form.update(data:Array\<string>)
        - Update autocomplete datalist

## ライセンス

* コード: MIT License
* ロゴ: CC BY-ND
* このプロジェクトはOSSを含みます
