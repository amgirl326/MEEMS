function addAllLinks() {
	addLinks(/[01]?[- .]?\(?[2-9]\d{2}\)?[- .]?\d{3}[- .]?\d{4}/g, true, 7);
	addLinks(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}/gi, false, true);
	addLinks(/(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi); 
}
function addLinks(regex, doLengthFiltering, isEmail, length) {
	var data = $("#main-data").html();
	var text = data.match(regex);
	if (text == null){
		return;
	}
		for (var i=0; i<text.length; i++){
			if (text[i] == null){
				continue;
			}
			if (isEmail == true){
				var emaillink = "<a href=\"mailto:"+text[i]+"\">"+text[i]+"</a>";	
				data = data.replace(text[i], emaillink);
			}	
			else if (doLengthFiltering == true){
				if (text[i].length >= 7){
					var tellink = "<a href=\"tel:"+text[i]+"\">"+text[i]+"</a>";	
					data = data.replace(new RegExp(text[i], 'g'), tellink);
				}
			}
			else {
				var link = "<a href=\""+text[i]+"\" target=\"_blank\">"+text[i]+"</a>";	
				data = data.replace(text[i], link);
			}
		for (var j=i+1; j<text.length; j++){
			if (text[j] == text[i]){
				text[j] = null;
			}
		}
		}
	$('#main-data').html(data);
} 
