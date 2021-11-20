var WEB_URI = 'https://intercambios-api.herokuapp.com'
var LOCAL_URI = 'http://26.181.53.212:3000'
var URI = WEB_URI
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
    
     

      console.log(response.intercambios)
      let cont= 0;
      let estatus = "";
      $.each(response.intercambios, function (i, data) {

        switch(data.estatus){
          case 0 :
            estatus ="en curso"
            break;

            case 1 :
            estatus ="Pendiente"
            break;

            case 2 :
            estatus ="por concretar"
            break;


        }
        console.log(data);
        let tema1 = temas(data.tema1)
        let tema2 = temas(data.tema2)
        let tema3 = temas(data.tema3)
        if(data.tema1 == 0 ){
          $('.inter-body').append(`<tr>
          <td>${data.nombre}</td>
          <td>${data.montoMaximo}</td>
          <td>${data.fechaIntercambio}</td>
          <td>${tema1}</td>
          <td>
              <button class="btn eliminar borrar-btn" id="${data._id}">Borrar</button>
              <button class="btn editar-btn" id="${data._id}">Editar</button>
              <button class="btn ver-btn" id="${data._id}">Ver</button>
          </td>
          <td>${estatus}</td>
      </tr>`)
        }else{

          switch(data.estatus){
            case 0 :
              estatus ="en curso"
              break;
  
              case 1 :
              estatus ="Pendiente"
              break;
  
              case 2 :
              estatus ="por concretar"
              break;}
  
          $('.inter-body').append(`<tr>
        <td>${data.nombre}</td>
        <td>${data.montoMaximo}</td>
        <td>${data.fechaIntercambio}</td>
        <td>${tema1} ${tema2} ${tema3}</td>
        <td>
            <button class="btn eliminar borrar-btn" id="${data._id}">Borrar</button>
            <button class="btn editar-btn" id="${data._id}">Editar</button>
            <button class="btn ver-btn" id="${data._id}">Ver</button>
        </td>
        <td>${estatus}</td>
    </tr>`)}   
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
            $('#nombre').attr("disabled")

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
                  console.log(r)
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

      $('.ver-btn').click(function () {
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
            $('#hamster').text('Ver')
            $('#id_inter').val(response._id)
            $('#nombre').val(response.nombre)
            $('#montoMaximo').val(response.montoMaximo)
            $('#fechaIntercambio').val(response.fechaIntercambio)   
            $('#tema1').val(response.tema1)  
            $('#tema2').val(response.tema2) 
            $('#tema3').val(response.tema3)
            $('#nombre').attr("disabled" ,"true")
            $('#montoMaximo').attr("disabled" ,"true")
            $('#fechaIntercambio').attr("disabled" ,"true")
            $('#tema1').attr("disabled" ,"true")
            $('#tema3').attr("disabled" ,"true")
            $('#tema2').attr("disabled" ,"true")
            $("#datos-part").hide();
            


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
                  console.log(r)
                  $('#participantes').append(`<tr id="${r._id}">
                                                <td>${r.nombre}</td>
                                                <td>${r.email}</td>
                                              
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

  $('#participantes').append(`<tr>
                                    <td>${info.nombreP}</td>
                                    <td>${info.email}</td>
                                    
                                    <td>
                                        <button class="btn borrar-btn" onClick="$(this).parent().parent().remove();"><i class="fas fa-user-minus"></i></button>
                                    </td>
                                </tr>`)

  $('#agregarNombre').val('')
  $('#agregarEmail').val('')
})

/*
$(".editar-btn").click(function () {
  console.log("EDITAR")
  $(this).parent().parent().find(".name").hide()
  $(this).parent().parent().find(".email").hide()
  $(this).parent().parent().find(".editNombre").show();
  $(this).parent().parent().find(".editEmail").show();
  $(this).addClass("aceptar-btn");
  $(this).removeClass("editar-btn"); 

})
$(".aceptar-btn").click(function name() {
  $(this).parent().parent().find(".name").text("");
  $(this).parent().parent().find(".name").text($(this).parent().parent().find(".editNombre").val());  
  $(this).parent().parent().find(".name").show()


  $(this).parent().parent().find(".email").text("")
  $(this).parent().parent().find(".email").text($(this).parent().parent().find(".editNombre").val());
  $(this).parent().parent().find(".email").show()

  $(this).parent().parent().find(".editNombre").hide();
  $(this).parent().parent().find(".editEmail").hide();
  
  $(this).addClass("aceptar-btn");
  $(this).removeClass("editar-btn"); 

})*/


function  temas(tema) {

  switch(tema) {
    case 0:
      return "Libre"
     break;
    case 1:
      return "Calzones"
     break;
    case 2:
      return "Tazas"
     break;
    case 3:
      return "Libros"
     break;
    case 4:
      return "Videojuegos"
     break;
    case 5:
      return "Cuadernos"
     break;
    case 6:
      return "Fierro"
     break;
    case 7:
      return "Peluches"
     break;
    case 8:
      return "Laptops"
     break;
     case 9:
      return "Camisas"
     break;
     
     default:
       return "libre";
    

  } 
}

$('#regresar').click(function () {
  console.log("regresar")
  $("#nombre").removeAttr("disabled")
  $('#montoMaximo').removeAttr("disabled")
  $('#fechaIntercambio').removeAttr("disabled")
  $('#tema3').removeAttr("disabled")
  $('#tema2').removeAttr("disabled")
  $("#datos-part").show();
  
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
  json.estatus = 1
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
  $("#nombre").removeAttr("disabled")
  $('#montoMaximo').removeAttr("disabled")
  $('#fechaIntercambio').removeAttr("disabled")
  $('#tema3').removeAttr("disabled")
  $('#tema2').removeAttr("disabled")
  $("#datos-part").show();
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
