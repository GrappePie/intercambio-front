$( document ).ready(function() {
	// if(!sessionStorage.getItem("token")) {
	// 	window.open ('index.html','_self',false)
	// }else{
	// 	window.open ('dashboard.html','_self',false)
	// }
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
	console.log(event.currentTarget)
  });