var WEB_URI = "https://intercambios-api.herokuapp.com"
var LOCAL_HOST = 'http://localhost:3000'
var URI = WEB_URI
$( document ).ready(function() {
	if(sessionStorage.getItem("token")!=null) location.href = './dashboard/dashboard.html';
});

$('#registrar').click(function(){
	window.open ('./register/register.html','_self',false)
})

$( "#login" ).submit(function( event ) {
	event.preventDefault();
	let json = {}
	$.each($(this).serializeArray(),function(i,data){
		data.name == 'email'?json.email = data.value : json.password = data.value
	})
	$.post( `${URI}/api/auth/ingresar`,json, function( data ) {
		sessionStorage.setItem( "token", data.token)
		location.href = './dashboard/dashboard.html';
		
	
	}).fail(function(e){

		Swal.fire({
			icon: 'error',
			title: 'Usuario inválido',
			text: "verifica tus datos",
		  })
	});
});