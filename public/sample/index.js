/* global ekiapi, autocompletize */

const process = {
  env: {
    ekiApiKey: ''/* Leave blank or Put your api key (駅すぱあと) */
  }
}

/* input changed event => api called => autocompletize updated */
window.addEventListener('load', () => {
  const target = document.getElementById('eki-input')
  const submit = document.getElementById('submit')
  target.addEventListener('input', () => ekiapi.get(process.env.ekiApiKey, target, autocompletize.update))
  target.addEventListener('focus', () => ekiapi.get(process.env.ekiApiKey, target, autocompletize.update))
  submit.addEventListener('click', () => {
    alert(`
    Station Name: ${target.value || '未入力'}
    Notes: ${document.getElementsByTagName('input')[1].value || '未入力'}`
    )
  })
})
