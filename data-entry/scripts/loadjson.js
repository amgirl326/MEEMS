function loadFile(filename){
	window.jsondata=[];
	data = [];

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
			return;
		}
	});

	for(var i=0;i<data.length;i++){
		window.jsondata[data[i].pk]=data[i]; 
	}
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

function getItems(type){
	loadFile('../data.json');
	items = [];
	for(var i in window.jsondata){
		if(window.jsondata[i].type == type){
			items[window.jsondata[i].pk]=window.jsondata[i];
		}
	}
	return items.sort(compare);
}

function compare(a,b) {
  if (a.title < b.title)
     return -1;
  if (a.title > b.title)
    return 1;
  return 0;
}
