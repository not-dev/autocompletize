/* global ekiapi, autocompletize */
/* global $ */

const process = {
  env: {
    ekiApiKey: ''/* Leave blank or Put your api key (駅すぱあと) */
  }
}

/* input changed event => api called => autocompletize updated */
window.addEventListener('load', () => {
  const target = document.getElementById('eki-input')
  target.addEventListener('input', () => ekiapi.get(process.env.ekiApiKey, target, autocompletize.update))
})

/* with jquery sample */
const id = 'eki-input'
$(window).on('load', () => {
  $('.loading-wrapper').hide()
  $('#submit').on('click', () => {
    $('.loading-wrapper').show()
    setTimeout(() => {
      $('.loading-wrapper').fadeOut('fast', () => alert(
        `\
        ${$(`label[for=${id}]`).text()}: ${$(`#${id}`).val() || '未入力'}
        ${$('form label:eq(1)').text()}: ${$('form input:eq(1)').val() || '未入力'}`
      ))
    }, 1200)
  })
})
