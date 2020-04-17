import autocompletize from './main'

interface autocompletizeDatalist {
  target: HTMLInputElement;
  data: Array<string>;
}

export function update ({ target, data }:autocompletizeDatalist) {
  autocompletize.update({ target, data })
}
