var getJsonUrl = 'http://www.alannochenson.com/475/getJSON.php';

function loadFile(filename){
	window.jsondata=[];
	data = [];
	window.titles=[];
	window.data=[];
	
	$.ajax({
		type:'GET',
		async: false,
		url:filename,
		dataType:'jsonp',
		jsonpCallback: "fname", 
		success:function(data){
			for(var i=0;i<data.length;i++){
				window.jsondata[data[i].pk]=data[i]; 
				if(data[i].type=="ENDPAGE"){
				window.titles[i]=data[i].title;
				}
			}
			makeBaseMenu();
		},
		error: function (jq, text, ethrown) {
		console.log(jq);
		console.log(text);
		console.log(ethrown);
		throw 'Error: '+text;
		return ;
		}
	});
}
function returnTitles() {
	if(typeof window.titles==='undefined'){
		loadFile(getJsonUrl);
	}
	return data;
}

function getEntryFromFile(primarykey, filename) {
	if(typeof filename === 'undefined') {
		filename = getJsonUrl;
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

	return window.jsondata[primarykey];
}
