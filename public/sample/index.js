/* global ekiapi, autocompletize */

const process = {
  env: {
    ekiApiKey: ''/* Leave blank or Put your api key (駅すぱあと) */
  }
}

window.addEventListener('load', () => {
  const inputs = ['eki-from', 'eki-to']
  inputs.map((input) => {
    const target = document.getElementById(input)
    const form = new autocompletize.Form(target)
    form.changed((res) => console.log(res))
    target.addEventListener('input', () => {
      ekiapi.get(process.env.ekiApiKey, target)
        .then(res => form.update(res))
        .catch(err => console.error(err))
    })
    target.addEventListener('focus', () => {
      ekiapi.get(process.env.ekiApiKey, target)
        .then(res => form.update(res))
        .catch(err => console.error(err))
    })
  })
  const submit = document.getElementById('submit')
  submit.addEventListener('click', () => {
    alert(`
    Station From: ${document.getElementById('eki-from').value || '未入力'}
    Station To: ${document.getElementById('eki-to').value || '未入力'}
    Notes: ${document.getElementsByTagName('input')[1].value || '未入力'}`
    )
  })
})
