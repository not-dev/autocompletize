/* global ekiapi, autocompletize */

const process = {
  env: {
    ekiApiKey: ''/* Leave blank or Put your api key (駅すぱあと) */
  }
}

window.addEventListener('load', () => {
  const forms = {}
  for (const input of ['eki-input', 'eki-input2']) {
    const target = document.getElementById(input)
    forms[input] = new autocompletize.Form(target)
    // form.changed((res) => console.log(res))
    target.addEventListener('input', async () => {
      const res = await ekiapi.get(process.env.ekiApiKey, target)
      forms[input].update(res)
      console.log(forms)
    })
    target.addEventListener('focus', () => {
      ekiapi.get(process.env.ekiApiKey, target)
        .then((res) => forms[input].update(res))
    })
  }
  const submit = document.getElementById('submit')
  submit.addEventListener('click', () => {
    alert(`
    Station Name: ${document.getElementById('eki-input').value || '未入力'}
    Notes: ${document.getElementsByTagName('input')[1].value || '未入力'}`
    )
    console.log(forms)
  })
})
