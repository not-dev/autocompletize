import autocomplete from './autocomplete'

interface AutocompleteDatalist {
  target: HTMLInputElement;
  data: Array<string>;
}

export function update ({ target, data }:AutocompleteDatalist) {
  autocomplete.update({ target, data })
}
