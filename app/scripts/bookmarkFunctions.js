function loadBookmarks() {
	var bookmarkData = readCookie('bookmarkData');

	if(!bookmarkData) {
		window.bookmarks = [];
	}
	else {
		window.bookmarks = JSON.parse(bookmarkData);
	}
}

function addBookmark(endpagePK) {
	window.bookmarks.push(endpagePK);
}

function removeBookmark(endpagePK) {
	window.bookmarks.splice(window.bookmarks.indexOf(endpagePK), 1);
}

function saveBookmarks() {
	createCookie('bookmarkData', JSON.stringify(window.bookmarks), 365);
}

function toggleBookmark(endpagePK) {
	loadBookmarks();

	if(typeof endpagePK === 'undefined') {
		endpagePK = window.currentPK;
	}

	if(window.bookmarks.indexOf(endpagePK) != -1) {
		removeBookmark(endpagePK);
	}
	else {
		addBookmark(endpagePK);
	}

	saveBookmarks();
	showToggleButton();
}

function showBookmarks() {
	if(!window.bookmarks) {
		loadBookmarks();
	}

	$('#bookmarks-button').hide();
	$('#add-bookmark-button').hide();

	showMenu();
	makeMenu(window.bookmarks, 0, true);

	setBack(window.currentPK);
	setTitle('Bookmarks');
}

function showToggleButton() {
	if(typeof window.bookmarks == 'undefined') {
		loadBookmarks();
	}
	if(window.bookmarks.indexOf(window.currentPK) != -1) {
		$('#remove-bookmark-button').show();
		$('#add-bookmark-button').hide();
	}
	else{
		$('#add-bookmark-button').show();
		$('#remove-bookmark-button').hide();
	}
}

