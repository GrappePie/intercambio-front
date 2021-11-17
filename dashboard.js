$(document).ready(function () {
  if (sessionStorage.getItem("token") == null) location.href = "index.html";
  $.ajax({
    url: "https://intercambios-api.herokuapp.com/api/intercambios",
    method: "GET",
    headers: {
      "x-access-token": sessionStorage.getItem("token"),
    },
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      $.each(response, function (i, data) {
        $("tbody").append(`<tr>
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
      });


	  $("#montoMax").on({
		"focus": function (event) {
			$(event.target).select();
		},
		"keyup": function (event) {
			$(event.target).val(function (index, value ) {
				return value.replace(/\D/g, "")
							.replace(/([0-9])([0-9]{2})$/, '$1.$2')
							.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
			});
		}
	});
      $(".editar-btn").click(function () {
        $.ajax({
          url: `https://intercambios-api.herokuapp.com/api/intercambios/${$(
            this
          ).attr("id")}`,
          method: "GET",
          headers: {
            "x-access-token": sessionStorage.getItem("token"),
          },
          contentType: "application/json",
          dataType: "json",
          success: function (response) {
            console.log(response);
            $("#nuevo-intercambio").show();
            $("#intercambios-tab").hide();
            $("#hamster").text("Edita tu");
            $("#nombre").val(response.nombre);
            $("#montoMaximo").val(response.montoMaximo);
            $("#fechaIntercambio").val(response.fechaIntercambio);
            $("#tema").val(response.tema);
          },
        });
      });

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
					url: `https://intercambios-api.herokuapp.com/api/intercambios/${$(
					  this
					).attr("id")}`,
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

	  var contIds = 1;

$("#agregar").click(function(){
contIds = contIds ++;
let html = '<label>Nombre</label> <input type="text" name="nombre" id="n'+contIds+'" required/> <label>Email</label><input type="text" name="email" id="e'+contIds+'" required/>'
$("#participantes").append(html);

})
    },
  });
});

$("#regresar").click(function () {
  $("#nuevo-intercambio").hide();
  $("#intercambios-tab").show();
  $("#nombre").val("");
  $("#montoMaximo").val("");
  $("#fechaIntercambio").val("");
  $("#tema").val("");
});

$("#inter").submit(function (event) {
  event.preventDefault();
  let json = {};
  $.each($(this).serializeArray(), function (i, data) {
    switch (data.name) {
      case "nombre":
        json.nombre = data.value;
        break;
      case "montoMaximo":
        json.montoMaximo = data.value;
        break;
      case "fechaIntercambio":
        json.fechaIntercambio = data.value;
        break;
      case "tema":
        json.tema = data.value;
        break;
      default:
        console.log("error");
    }
  });
  console.log(JSON.stringify(json));
  $.ajax({
    url: `https://intercambios-api.herokuapp.com/api/intercambios`,
    method: "POST",
    data: json,
    headers: {
      "x-access-token": sessionStorage.getItem("token"),
    },
    dataType: "json",
    success: function (data) {
      location.reload();
    },
  }).fail(function (error) {
    console.log(error.responseJSON);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.responseJSON.message,
    });
  });
});

$("#logout").click(function () {
  sessionStorage.removeItem("token");
  if (sessionStorage.getItem("token") == null) location.href = "index.html";
});

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
  $("#hamster").text("Nuevo");
  $("#nombre").val("");
  $("#montoMaximo").val("");
  $("#fechaIntercambio").val("");
  $("#tema").val("");
}

/*
$('#intercambioNuevo').click(function(){
	
	console.log(validarInputsIntercambio);
	if(!validarInputsIntercambio){

		Swal.fire({
			title: 'Faltan datos por llenar',
			icon: 'warning',
			showCancelButton: false,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Aceptar',
		})
		return false;

	}

	
	let nombre = $("#nombre").val();
	let montoMaximo = $('#montoMaximo').val();
	let fechaIntercambio = $('#fechaIntercambio').val();
	let tema = $('#tema').val();
	let json = {"nombre": nombre,"estatus": 1, "montoMaximo": montoMaximo, "fechaMax": fechaMax, "fechaIntercambio": fechaIntercambio, "tema": tema}
	console.log(json)
	guardarIntercambio(json)
	
})
    $token = sessionStorage.getItem("token");
	function guardarIntercambio(json){
		
		$.ajax({
		url:"https://intercambios-api.herokuapp.com/api/intercambios",
        method: 'POST',
        headers: {
			'x-access-token':sessionStorage.getItem("token")
        },
        contentType: 'application/json',
        dataType: 'json',
		data: JSON.stringify(json),
		})
	}
	function peticionIntercambios(){
		$.ajax({
			url:"https://intercambios-api.herokuapp.com/api/intercambios",
			method: 'GET',
			headers: {
				'x-access-token':sessionStorage.getItem("token")
			},
			contentType: 'application/json',
			dataType: 'json'			,
			success: function (response) {console.log(response)}
			})

	}



	function validarInputsIntercambio(){
		let nombre = $("#nombre").val();
		let montoMaximo = $('#montoMaximo').val();
		let fechaIntercambio = $('#fechaIntercambio').val();
		

		if(nombre.length==0)
		return false;

		if(montoMaximo<=0)
		return false;

		if(fechaMax.length==0)
		return false;

		if(fechaIntercambio.length==0)
		return false;

return true;
	}
console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});
*/
