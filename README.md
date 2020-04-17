English / [Japanese](./README_JP.md)

# autocompletize

Make autocomplete form from plain HTML text input form.

![sample](https://github.com/not-dev/autocompletize/blob/master/assets/image.png?raw=true)

## Installation

Download from release and place in your directory.

* mod/autocomplete~.min.js: This module
* mod/ekiapi~.min.js: Get a list of station names by using by 駅すぱあとAPI
* others: Sample

## Usage

See the sample in the release.

(More details in the README_JP.md)

```html
...

<script src="mod/autocomplete.min.js"></script>
<script>
  window.addEventListener('load', () => {
    const target = document.getElementById('target-id')
    const data = ['hoge','hoge']
    autocomplete.update({ target, data })
  })
</script>
...

<input id="target-id" type="text" autocomplete="off" />

...

```

## License

* Code: MIT License
* Logos: CC BY-ND
* This project includes open source software.
