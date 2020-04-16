/* global ekiapi, autocomplete */

const process = {
  env: {
    ekiApiKey: ''/* Your Api Key */
  }
}

window.addEventListener('load', () => {
  const target = document.getElementById('eki-input')
  target.addEventListener('input', (e) => ekiapi.get(process.env.ekiApiKey, target, autocomplete.update))
})
