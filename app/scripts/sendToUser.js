function showMailerButton(){
	var data = $("#main-data").html();
	$('#email-button').show();
	$('#email-button').attr("href", "mailto:?subject="+encodeURIComponent(document.title)+"&body=" + encodeURIComponent(data));
} 
