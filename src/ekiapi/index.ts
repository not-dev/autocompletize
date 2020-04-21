import { getEkiList } from './main'

export function get (apiKey: string, target:HTMLInputElement) {
  return getEkiList(apiKey, target)
}
