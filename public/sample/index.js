/* global ekiapi, autocompletize */

const process = {
  env: {
    ekiApiKey: ''/* Leave blank or Put your api key (駅すぱあと) */
  }
}

window.addEventListener('load', () => {
  for (const input of ['eki-input', 'eki-input2']) {
    const target = document.getElementById(input)
    console.log(autocompletize)
    const form = new autocompletize.Form(target)
    console.log(autocompletize)
    target.addEventListener('input', async () => {
      const res = await ekiapi.get(process.env.ekiApiKey, target)
      form.update(res)
    })
    target.addEventListener('focus', () => {
      ekiapi.get(process.env.ekiApiKey, target)
        .then((res) => form.update(res))
    })
  }
  const submit = document.getElementById('submit')
  submit.addEventListener('click', () => {
    alert(`
    Station Name: ${document.getElementById('eki-input').value || '未入力'}
    Notes: ${document.getElementsByTagName('input')[1].value || '未入力'}`
    )
  })
})
