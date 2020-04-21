English / [日本語](./README_JP.md)

# autocompletize

Make autocomplete form from plain HTML text input form.

![sample](https://github.com/not-dev/autocompletize/blob/master/assets/image.png?raw=true)

## Installation

Download from release and place in your directory.

* autocompletize~.min.js: This module
* mod/ekiapi~.min.js: Get a list of station names by using by 駅すぱあとAPI (for sample)
* others: Samples

## Usage

See the sample in the release.

(More details in the [Japanese](README_JP.md))

* Simple Usage

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

* Update on input

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

## License

* Code: MIT License
* Logos: CC BY-ND
* This project includes open source software.
