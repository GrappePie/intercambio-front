$( document ).ready(function() {
	
});

$('#registrar').click(function(){
	window.open ('register.html','_self',false)
})

$('#ingreso').click(function(){
	let email = $('#username').val();
	let password = $('#password').val();
	let json = { "email": email, "password": password }
	$.post( "https://intercambios-api.herokuapp.com/api/auth/ingresar",json, function( data ) {
		console.log(data)
		
		sessionStorage.setItem( "token", data.token)
		$('.login').hide();
		$('.wrapper').show();
	});
})

$( "#login" ).submit(function( event ) {
	event.preventDefault();
	let json = {}
	$.each($(this).serializeArray(),function(i,data){
		data.name == 'email'?json.email = data.value : json.password = data.value
	})
	/*$.post( "https://intercambios-api.herokuapp.com/api/auth/ingresar",json, function( data ) {
		
		console.log(data);
		sessionStorage.setItem( "token", data.token)
		location.href = 'dashboard.html';
		error: function(e) {
  		  console.log(e);}
	});*/

	$.ajax({
		type: "POST",
		url: "https://intercambios-api.herokuapp.com/api/auth/ingresar",
		data: json,
		success: function(data){
			console.log(data);
			sessionStorage.setItem( "token", data.token)
			location.href = 'dashboard.html';

		},	error: function(e) {
			Swal.fire({
				icon: "error",
				title: "Usuario o contraseña incorrectos",
				text: "asegurate de que ingresaste credenciales válidas",
				confirmButtonText: "Aceptar",
			  });
  		}
		
	  });

});