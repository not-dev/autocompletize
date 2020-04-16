import { getEkiList } from './ekiapi'

interface Response {
  target: HTMLInputElement;
  data: Array<string>;
}

export function get (apiKey: string, target:HTMLInputElement, callback:({ target, data }:Response) => void) {
  getEkiList(apiKey, target, callback)
}
