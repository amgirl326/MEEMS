function loadFile(filename){
	window.jsondata=[];
	data = [];
	window.titles=[];
	window.data=[];
	
	$.ajax({
		url: filename,
		async: false,
		dataType: 'json',
		success: function(d) { data = d; },
		error: function (jq, text, ethrown) {
			console.log(jq);
			console.log(text);
			console.log(ethrown);
			throw 'Error: '+text;
			return ;
		}
	});

	for(var i=0;i<data.length;i++){
		window.jsondata[data[i].pk]=data[i]; 
		if(data[i].type=="ENDPAGE"){
		window.titles[i]=data[i].title;
		}
	}
}
function returnTitles(){
if(typeof window.titles==='undefined'){
loadFile('../data.json');
}
return data;
}

function getEntryFromFile(primarykey, filename) {
	if(typeof filename === 'undefined') {
		filename = '../data.json';
	}

	if(typeof window.jsondata === "undefined"){
		loadFile(filename);
	}
	return getEntry(primarykey);
}

function getEntry(primarykey){
	var entry = null; //the element from the JSON file
	if(primarykey in window.jsondata){
		entry = window.jsondata[primarykey];
	}
	if(!entry) {
		throw "Can't find an entry with primary key "+primarykey;
		return;
	}

	if(entry.type=="ENDPAGE"){
		//do some bookmark stuff?
	}

	return window.jsondata[primarykey];
}
