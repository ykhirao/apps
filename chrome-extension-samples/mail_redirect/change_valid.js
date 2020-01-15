var trs = document.getElementById('ctl00_objMasterPlaceHolder_tblFullEmail').firstElementChild.children

for (var i = 1; i < trs.length; i++) {

	var status = trs[i].children[1].innerHTML
	if (status == "有効") {
		trs[i].children[1].innerHTML = "OK";
	} else {
		trs[i].children[2].children[0].click();
	}
}

// location.href= "https://cp.rentalserver.jp/Home.aspx";