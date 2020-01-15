$('#e_syugyo').click(function(){
	alert('test');
	var start = document.getElementsByTagName('tr')[28].children[1].innerHTML.trim();
	var end = document.getElementsByTagName('tr')[28].children[3].innerHTML.trim();

	start_hour = parseInt(start.split(":")[0]);
	start_min = parseInt(start.split(":")[1]);
	end_hour = parseInt(end.split(":")[0]);
	end_min = parseInt(end.split(":")[1]);

	document.getElementsByName('EZZINHR01 ')[0].children[start_hour].selected = true;
	document.getElementsByName('EZZINMN01')[0].children[start_min].selected = true;
	document.getElementsByName('EZZINHR02 ')[0].children[end_hour].selected = true;
	document.getElementsByName('EZZINMN02')[0].children[end_min].selected = true;
	document.getElementsByName('EEDGGT101 ')[0].value = "1.00";
}());

