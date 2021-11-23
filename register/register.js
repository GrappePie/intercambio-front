
var WEB_URI = "https://intercambios-api.herokuapp.com"
var LOCAL_URI = "http://26.181.53.212:3000"
var LOCAL_HOST = 'http://localhost:3000'
var URI = WEB_URI
$(document).ready(function () {	if(sessionStorage.getItem("token")!=null) location.href = '../dashboard/dashboard.html';})

$('#regresar').click(function () {
  window.open('../index.html', '_self', false)
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
    `${URI}/api/auth/registrar`,
    json,
    function (data) {
      console.log(data)
      sessionStorage.setItem('token', data.token)
      location.href = '../dashboard/dashboard.html'
    },
  ).fail(function (error) {
    Swal.fire({
        icon: 'error',
        title: 'Usuario existente o campos vacíos',
        text:"Verifica tus datos"
      })
  })
})
