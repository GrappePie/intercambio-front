var WEB_URI = 'https://intercambios-api.herokuapp.com'
var LOCAL_URI = 'http://26.181.53.212:3000'
var URI = LOCAL_URI
$(document).ready(function () {
  if (sessionStorage.getItem('token') == null) location.href = 'index.html'
  $.ajax({
    url: `${URI}/api/intercambios`,
    method: 'GET',
    headers: {
      'x-access-token': sessionStorage.getItem('token'),
    },
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
      $.each(response, function (i, data) {
        $('.inter-body').append(`<tr>
                                            <td>${data.nombre}</td>
                                            <td>${data.montoMaximo}</td>
                                            <td>${data.fechaIntercambio}</td>
                                            <td>${data.tema1}-${data.tema2}-${data.tema3}</td>
                                            <td>
                                                <button class="btn borrar-btn" id="${data._id}">Borrar</button>
                                                <button class="btn editar-btn" id="${data._id}">Editar</button>
                                            </td>
                                        </tr>
            `)
      })

      $('.editar-btn').click(function () {
        $.ajax({
          url: `${URI}/api/intercambios/${$(this).attr('id')}`,
          method: 'GET',
          headers: {
            'x-access-token': sessionStorage.getItem('token'),
          },
          contentType: 'application/json',
          dataType: 'json',
          success: function (response) {
            console.log(response)
            $('#nuevo-intercambio').show()
            $('#intercambios-tab').hide()
            $('#hamster').text('Edita tu')
            $('#id_inter').val(response._id)
            $('#nombre').val(response.nombre)
            $('#montoMaximo').val(response.montoMaximo)
            $('#fechaIntercambio').val(response.fechaIntercambio)
            $('#tema1').val(response.tema1)
            $('#tema2').val(response.tema2)
            $('#tema3').val(response.tema3)
            var par = ''
            $.each(response.participantes, function (x, y) {
              $.ajax({
                url: `${URI}/api/participantes/${y}`,
                method: 'GET',
                headers: {
                  'x-access-token': sessionStorage.getItem('token'),
                },
                contentType: 'application/json',
                dataType: 'json',
                success: function (r) {
                  $('#participantes').append(`<tr id="${r._id}">
                                                <td>${r.nombre}</td>
                                                <td>${r.email}</td>
                                                <td>
                                                    <button class="btn borrar-btn" onClick="$(this).parent().parent().remove();"><i class="fas fa-user-minus"></i></button>
                                                </td>
                                            </tr>`)
                },
              })
            })
          },
        })
      })

      $('.borrar-btn').click(function () {
        Swal.fire({
          title: '¿Quieres borrar este intercambio?',
          showCancelButton: true,
          confirmButtonText: 'Borrar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            $.ajax({
              url: `${URI}/api/intercambios/${$(this).attr('id')}`,
              method: 'DELETE',
              headers: {
                'x-access-token': sessionStorage.getItem('token'),
              },
              contentType: 'application/json',
              dataType: 'json',
              success: function (response) {
                Swal.fire('Borrado!', '', 'success').then((result) => {
                  location.reload()
                })
              },
            })
          }
        })
      })
    },
  })
})
var hoy = new Date()
hoy.setHours(0, 0, 0, 0)
var contIds = 1
$('#agregar').click(function () {
  let info = {}
  if ($('#agregarNombre').val().length == 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops....',
      text: 'No puedes agregar un nombre vacío',
    })
    return false
  }

  if (
    $('#agregarEmail').val().indexOf('@', 0) == -1 ||
    $('#agregarEmail').val().indexOf('.', 0) == -1
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      text: 'El formato del email es incorrecto',
    })
    return false
  }

  $('#datos-part')
    .find('input')
    .each(function (i, data) {
      data.name == 'nombreP'
        ? (info.nombreP = data.value)
        : (info.email = data.value)
    })

  $('#participantes').append(`<tr >
                                    <td>${info.nombreP}</td>
                                    <td>${info.email}</td>
                                    <td>
                                        <button class="btn borrar-btn" onClick="$(this).parent().parent().remove();"><i class="fas fa-user-minus"></i></button>
                                    </td>
                                </tr>`)

  $('#agregarNombre').val('')
  $('#agregarEmail').val('')
})

$('#regresar').click(function () {
  $('#nuevo-intercambio').hide()
  $('#intercambios-tab').show()
  $('#nombre').val('')
  $('#montoMaximo').val('')
  $('#fechaIntercambio').val('')
  $('#tema1').val('')
  $('#tema2').val('')
  $('#tema3').val('')
  $('#id_inter').val('')
  $("#participantes").empty()
})

$('#inter').submit(function (event) {
  event.preventDefault()
  let json = {}
  let intercambio_id = ''
  if (!validar()) {
    console.log('validaciones false')
    return false
  }
  $.each($(this).serializeArray(), function (i, data) {
    console.log(data.name, data.value)
    switch (data.name) {
      case 'nombre':
        json.nombre = data.value
        break
      case 'montoMaximo':
        json.montoMaximo = data.value
        break
      case 'fechaIntercambio':
        json.fechaIntercambio = data.value
        break
      case 'tema1':
        json.tema1 = data.value
        break
        break
      case 'tema2':
        json.tema2 = data.value
        break
        break
      case 'tema3':
        json.tema3 = data.value
        break
      case 'id_inter':
        intercambio_id = data.value
        break
      default:
        console.log('error')
    }
  })
  if (intercambio_id) {
    ///EDITAR
    $.ajax({
      url: `${URI}/api/intercambios/${intercambio_id}`,
      method: 'PUT',
      data: json,
      headers: {
        'x-access-token': sessionStorage.getItem('token'),
      },
      dataType: 'json',
      success: function (interc) {
        $.each($('#participantes tr'), function (i, data) {
            let participante = `{"intercambio":"${
              interc._id
            }","estatus": 1,"nombre":"${data.innerText
              .replace('\t', '","email":"')
              .replace('\t', '"}')}`
              console.log("JSOOOOOOOOOOOOOOOOOOON:",JSON.parse(participante))
            $.ajax({
              url: `${URI}/api/participantes`,
              method: 'POST',
              data: JSON.parse(participante),
              headers: {
                'x-access-token': sessionStorage.getItem('token'),
              },
              dataType: 'json',
              success: function (parti) {
                console.log(parti)
              },
            })
          })
        Swal.fire('Editado!', '', 'success').then((result) => {
          location.reload()
        })
      },
    }).fail(function (error) {
      console.log(error.responseJSON)
      Swal.fire({
        icon: 'error',
        title: 'Oops....',
        text: error.responseJSON.message,
      })
    })
  } else {
    //GUARDAR
    $.ajax({
      url: `${URI}/api/intercambios`,
      method: 'POST',
      data: json,
      headers: {
        'x-access-token': sessionStorage.getItem('token'),
      },
      dataType: 'json',
      success: function (interc) {
        console.log(interc._id)
        $.each($('#participantes tr'), function (i, data) {
          let participante = `{"intercambio":"${
            interc._id
          }","estatus": 1,"nombre":"${data.innerText
            .replace('\t', '","email":"')
            .replace('\t', '"}')}`
          $.ajax({
            url: `${URI}/api/participantes`,
            method: 'POST',
            data: JSON.parse(participante),
            headers: {
              'x-access-token': sessionStorage.getItem('token'),
            },
            dataType: 'json',
            success: function (parti) {
              console.log(parti)
            },
          })
        })
        Swal.fire('Guardado!', '', 'success').then((result) => {
          location.reload()
        })
      },
    }).fail(function (error) {
      console.log(error.responseJSON)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.responseJSON.message,
      })
    })
  }
})

$('#dateman').click(function () {
  if ($('#fechaIntercambio').val().length != 0) {
    let fechaFormulario = new Date($('#fechaIntercambio').val())

    if (hoy <= fechaFormulario) {
      console.log('Fecha a partir de hoy')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Fecha pasada',
        text: 'No puedes cambiar el pasado',
      })
      return false
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Fecha vacia',
      text: 'Ingresa una fecha ',
    })
    return false
  }
})
function validar() {
  let err = 0
  if ($('#nombre').val().length == 0) {
    Swal.fire({
      icon: 'error',
      title: 'Intercambio sin nombre',
      text: 'No puedes cambiar el pasado',
    })
    err++
  }
  if ($('#montoMaximo').val().length == 0) {
    Swal.fire({
      icon: 'error',
      title: 'Intercambio sin nombre',
      text: 'No puedes cambiar el pasado',
    })
    err++
  }

  if ($('#fechaIntercambio').val().length != 0) {
    let fechaFormulario = new Date($('#fechaIntercambio').val())

    if (hoy <= fechaFormulario) {
      console.log('Fecha a partir de hoy')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Fecha pasada',
        text: 'No puedes cambiar el pasado',
      })
      err++
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Fecha vacia',
      text: 'Ingresa una fecha ',
    })
    err++
  }

  if (err > 0) return false
  else return true
}
$('#logout').click(function () {
  sessionStorage.removeItem('token')
  if (sessionStorage.getItem('token') == null) location.href = 'index.html'
})

function openTab(evt, tabName) {
  var i, tabcontent, tablinks
  tabcontent = document.getElementsByClassName('tabcontent')
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
  }
  tablinks = document.getElementsByClassName('tablinks')
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '')
  }
  document.getElementById(tabName).style.display = 'block'
  evt.currentTarget.className += ' active'
  $('#hamster').text('Nuevo')
  $('#nombre').val('')
  $('#montoMaximo').val('')
  $('#fechaIntercambio').val('')
  $('#tema1').val('')
  $('#tema2').val('')
  $('#tema3').val('')
  $('#id_inter').val('')
  $("#participantes").empty()
}

//prueba para logica de intercambio

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

function dont_match(array1, array2) {
  let cont = 0
  do {
    array1 = shuffle(array1)
    array2 = shuffle(array2)
    result = array1.map(function (item, i) {
      return item == array2[i]
    })
    cont++
  } while (result.includes(true))
  console.log(array1)
  console.log(array2, `Numero de intentos: ${cont}`)
}

dont_match([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8])
