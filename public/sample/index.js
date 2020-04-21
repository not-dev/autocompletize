/* global ekiapi, autocompletize */

const process = {
  env: {
    ekiApiKey: ''/* Leave blank or Put your api key (駅すぱあと) */
  }
}

window.addEventListener('load', () => {
  const inputs = ['eki-from', 'eki-to']
  inputs.map((input) => {
    /* Specify the input element to apply autocomplete */
    const target = document.getElementById(input)
    /* Creates a autocomplete form instance */
    const form = new autocompletize.Form(target)
    /*
      Observe the input of changes and execute the function
      First argument is form value
    */
    // form.changed((res) => console.log(res))
    /* addEventListener */
    const handleEvent = () => {
      /* In this example we get a list of station names */
      ekiapi.get(process.env.ekiApiKey, target)
        /* Then update form */
        .then(res => form.update(res))
        .catch(err => console.error(err))
    }
    target.addEventListener('input', handleEvent)
    target.addEventListener('focus', handleEvent)
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
