$( document ).ready(function() {
	
});

$('#registrar').click(function(){
	window.open ('register.html','_self',false)
})

$( "#login" ).submit(function( event ) {
	event.preventDefault();
	let json = {}
	$.each($(this).serializeArray(),function(i,data){
		data.name == 'email'?json.email = data.value : json.password = data.value
	})
	$.post( "https://intercambios-api.herokuapp.com/api/auth/ingresar",json, function( data ) {
		sessionStorage.setItem( "token", data.token)
		location.href = 'dashboard.html';
	});
});