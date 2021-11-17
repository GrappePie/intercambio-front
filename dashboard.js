$( document ).ready(function() {
	if(sessionStorage.getItem("token")==null) location.href = 'index.html';
    $.ajax({
        url:"https://intercambios-api.herokuapp.com/api/intercambios",
        method: 'GET',
        headers: {
            'x-access-token':sessionStorage.getItem("token")
        },
        contentType: 'application/json',
        dataType: 'json'			,
        success: function (response) {
            $.each(response, function(i,data){
                $('.inter-body').append(`<tr>
                                            <td>${data.nombre}</td>
                                            <td>${data.montoMaximo}</td>
                                            <td>${data.fechaIntercambio}</td>
                                            <td>${data.tema}</td>
                                            <td>
                                                <button class="btn borrar-btn" id="${data._id}">Borrar</button>
                                                <button class="btn editar-btn" id="${data._id}">Editar</button>
                                            </td>
                                        </tr>
            `);
            })
            $('.editar-btn').click(function(){
                $.ajax({
                    url:`https://intercambios-api.herokuapp.com/api/intercambios/${$(this).attr('id')}`,
                    method: 'GET',
                    headers: {
                        'x-access-token':sessionStorage.getItem("token")
                    },
                    contentType: 'application/json',
                    dataType: 'json'			,
                    success: function (response) {
                        console.log(response)
                        $('#nuevo-intercambio').show();
                        $('#intercambios-tab').hide();
                        $('#hamster').text("Edita tu")
                        $('#id_inter').val(response._id);
                        $('#nombre').val(response.nombre);
                        $('#montoMaximo').val(response.montoMaximo);
                        $('#fechaIntercambio').val(response.fechaIntercambio);
                        $('#tema').val(response.tema);
                    }
                })
            })


            $(".borrar-btn").click(function () {
                Swal.fire({
                    title: '¿Quieres borrar este intercambio?',
                    showCancelButton: true,
                    confirmButtonText: 'Borrar',
                    denyButtonText: `Cancelar`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        $.ajax({
                            url: `https://intercambios-api.herokuapp.com/api/intercambios/${$(this).attr("id")}`,
                            method: "DELETE",
                            headers: {
                                "x-access-token": sessionStorage.getItem("token"),
                            },
                            contentType: "application/json",
                            dataType: "json",
                            success: function (response) {

                                Swal.fire('Borrado!', '', 'success').then((result) => {location.reload();})

                            },
                        });
                    }
                })
            });


            
        }
    })

    $(".borrarParticipante").click(function(){
        $(this).parent().parent().empty()
        
    })
    
});
    var contIds = 1; 
$("#agregar").click(function(){
    console.log("agregar")
    contIds = contIds ++;
    let html = '<tr> <td><input type="text" name="nombre" /></td><td><input type="text" name="email"/></td> <td><button type="button"class="borrarParticipante">borrar</button></td><tr>'
    $("#participantes").append(html);

    $(".borrarParticipante").click(function(){
        $(this).parent().parent().empty()
           console.log("borrar")
    })
})

$('#regresar').click(function(){
    $('#nuevo-intercambio').hide();
    $('#intercambios-tab').show();
    $('#nombre').val('');
    $('#montoMaximo').val('');
    $('#fechaIntercambio').val('');
    $('#tema').val('');
    $('#id_inter').val('');
})


$('#inter').submit(function (event) {
    event.preventDefault()
    let json = {}
    let intercambio_id = ''
    $.each($(this).serializeArray(), function (i, data) {
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
        case 'tema':
          json.tema = data.value
          break
        default:
          intercambio_id = data.value
      }
    })
    if(intercambio_id){
        console.log(json)
        $.ajax({
            url:`https://intercambios-api.herokuapp.com/api/intercambios/${intercambio_id}`,
            method: 'PUT',
            data: json,
            headers: {
                'x-access-token':sessionStorage.getItem("token")
            },
            dataType: 'json',
            success: function (data) {
                location.reload();
            }
        }).fail(function (error) {
            console.log(error.responseJSON)
            Swal.fire({
                icon: 'error',
                title: 'Oops....',
                text: error.responseJSON.message
              })
          })
    }else{
        $.ajax({
            url:`https://intercambios-api.herokuapp.com/api/intercambios`,
            method: 'POST',
            data: json,
            headers: {
                'x-access-token':sessionStorage.getItem("token")
            },
            dataType: 'json',
            success: function (data) {
                location.reload();
            }
        }).fail(function (error) {
            console.log(error.responseJSON)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.responseJSON.message
              })
          })
    }
    
  })

$('#logout').click(function(){
	sessionStorage.removeItem("token");
    if(sessionStorage.getItem("token")==null) location.href = 'index.html';
})


function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    $('#hamster').text("Nuevo")
    $('#nombre').val('');
    $('#montoMaximo').val('');
    $('#fechaIntercambio').val('');
    $('#tema').val('');
    $('#id_inter').val('');
  }
