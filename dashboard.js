$( document ).ready(function() {
	if(sessionStorage.getItem("token")==null) location.href = 'index.html';
});

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