function doSearch() {
	var searchValue=$('#search').val().toLowerCase();
	if (searchValue.length==0){
		return;
	}
	var availableTags = returnTitles();
	var pks=[];
	var indexes=[];
	$.each(availableTags, function(i,v) {
			var title=v.title;
			var pk=v.pk;
			var data=v.data;
			var type=v.type;

			if(type=="ENDPAGE") {
				if(title.indexOf(searchValue) != -1 ||
					data.toLowerCase().indexOf(searchValue) != -1) {

					pks.push(pk);
					if(data.indexOf(searchValue) != -1) {
						indexes.push(data.indexOf(searchValue));
					}
					else {
						indexes.push(10);
					}
				}
			}
		});
	if(pks.length == 0){
		hideMenu();
		var data="No results were found";
		$('#main-data').html(data);
		setBack(1);
	}
	if(pks.length >= 1){
		showMenu();
		makeMenu(pks, 1, indexes);
	}
} 
