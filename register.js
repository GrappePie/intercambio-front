$( document ).ready(function() {
	// if(!sessionStorage.getItem("token")) {
	// 	window.open ('index.html','_self',false)
	// }else{
	// 	window.open ('dashboard.html','_self',false)
	// }
});

$('#regresar').click(function(){
	window.open ('index.html','_self',false)
})


$('.registro').click(function(){
	let nombre = $(this).parent().find('.name').val();
	let email = $(this).parent().find('.email').val();
	let alias = $(this).parent().find('.alias').val();
	let password = $(this).parent().find('.password').val();
	let json = {"nombre": nombre, "email": email, "password": password, "alias": alias};
	console.log(JSON.stringify(json));
	$.post( "https://intercambios-api.herokuapp.com/api/auth/registrar",json, function( data ) {
		console.log(data)
		$('.login').hide();
		$('.wrapper').show();
	  });
})
