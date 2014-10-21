ajax.send({url:"/json", json: true}, function (data) {
	var elm = document.getElementById('issue');
	for (var i = 0; i < data.length; i++) {
		elm.innerHTML += "<h4>" + data[i].title + "</h4>";
		for (var x = 0; x < data[i].comments.length; x++) {
			elm.innerHTML += "<p>" + data[i].comments[x].body + "</p>";
		}
	}
});