$(document).ready(function () {})

$('#regresar').click(function () {
  window.open('index.html', '_self', false)
})

$('#registrar').submit(function (event) {
  event.preventDefault()
  let json = {}
  $.each($(this).serializeArray(), function (i, data) {
    switch (data.name) {
      case 'nombre':
        json.nombre = data.value
        break
      case 'email':
        json.email = data.value
        break
      case 'password':
        json.password = data.value
        break
      case 'alias':
        json.alias = data.value
        break
      default:
        console.log('error')
    }
  })
  $.post(
    'https://intercambios-api.herokuapp.com/api/auth/registrar',
    json,
    function (data) {
      console.log(data)
      sessionStorage.setItem('token', data.token)
      location.href = 'dashboard.html'
    },
  ).fail(function (error) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.responseJSON.message
      })
  })
})
