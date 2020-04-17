English / [日本語](./README_JP.md)

# autocompletize

Make autocomplete form from plain HTML text input form.

![sample](https://github.com/not-dev/autocompletize/blob/master/assets/image.png?raw=true)

## Installation

Download from release and place in your directory.

* mod/autocompletize~.min.js: This module
* mod/ekiapi~.min.js: Get a list of station names by using by 駅すぱあとAPI (for sample)
* others: Samples

## Usage

See the sample in the release.

(More details in the [Japanese](README_JP.md))

```html
<head>
<script src="mod/autocompletize.min.js"></script>
</head>
<body>
  <input id="input" type="text" autocompletize="off" />
  <script>
    const target = document.getElementById('input')
    const data = ['fish', 'chicken', 'beef', 'pork', 'cheese', 'patties', 'pickles']
    target.addEventListener('focus', () => autocompletize.update({ target: target, data: data }))
  </script>
</body>
```

## License

* Code: MIT License
* Logos: CC BY-ND
* This project includes open source software.
