[English](./README.md) / 日本語

# autocompletize

HTMLのプレーンなinputフォームから、オートコンプリート付きのinputフォームを作成します。

![sample](https://raw.githubusercontent.com/not-dev/autocompletize/master/res/image.png)

## インストール

[Release](https://github.com/not-dev/autocompletize/releases/latest)から~min.jsまたはPackege.zipをダウンロードして、解凍して自分のプロジェクトに配置してください。

### Package.zip

* autocompletize~.min.js: プログラムの本体です
* mod/ekiapi~.min.js: サンプルに使用している、駅すぱあとAPIから駅名のリストを取得するモジュールです
* sample: サンプルHTMLです

## 使用方法

* Package.zipのサンプルも参考にしてください。

* autocompletize~.min.jsを読み込みます

```html
<head>
  <script src="mod/autocompletize.min.js"></script>
</head>
<body>
  <input id="input" type="text" autocomplete="off" />
</body>
```

* HTMLのロード後に、new autocompletize.Form(target: HTMLInputElement)でフォームの初期化をします。

```javascript
/* Specify the input element to apply autocomplete */
const target = document.getElementById('input-ID')
/* Creates a autocomplete form instance */
const form = new autocompletize.Form(target)
```

* 任意のタイミングで、autocompletize.update(data: Array\<string>)でオートコンプリートに表示するデータを渡します

```javascript
const data = ['fish', 'chicken', 'beef', 'pork', 'cheese', 'patties', 'pickles']
/* Update autocomplete when the focus */
target.addEventListener('focus', () => form.update(data))
```

* 例えば駅名入力 >> API検索 >> 駅名リストを表示だとこうなります

```javascript
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
        - フォームの初期設定
* Attributes
    + Form.changed(func:(res?: string) => void)
        - フォームの更新を監視して関数を実行
    + Form.update(data:Array\<string>)
        - オートコンプリートのデータリストを更新

## ライセンス

* MIT License
* このプロジェクトはOSSを含みます
