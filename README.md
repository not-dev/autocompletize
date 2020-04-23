English / [日本語](./README_JP.md)

# autocompletize

Make autocomplete form from plain HTML text input form.

![sample](https://raw.githubusercontent.com/not-dev/autocompletize/master/res/image.png)

## Installation

Download from [Release](https://github.com/not-dev/autocompletize/releases/latest) and place in your directory.

## Usage

See the sample in the Package.zip.

* Load autocompletize~.min.js

```html
<head>
  <script src="mod/autocompletize.min.js"></script>
</head>
<body>
  <input id="input" type="text" autocomplete="off" />
</body>
```

* After loading the HTML, initialize the form with new autocompletize.Form(target: HTMLInputElement)

```javascript
/* Specify the input element to apply autocomplete */
const target = document.getElementById('input-ID')
/* Creates a autocomplete form instance */
const form = new autocompletize.Form(target)
```

* At any time, pass the data to be displayed in autocomplete with autocompletize.update(data: Array\<string>)

```javascript
const data = ['fish', 'chicken', 'beef', 'pork', 'cheese', 'patties', 'pickles']
/* Update autocomplete when the focus */
target.addEventListener('focus', () => form.update(data))
```

* For example, enter station name >> API search >> Display station name list

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
        - Form initialization
* Attributes
    + Form.changed(func:(res?: string) => void)
        - Observe form updates and execute function
    + Form.update(data:Array\<string>)
        - Update autocomplete datalist

## License

* MIT License
* This project includes open source software.
