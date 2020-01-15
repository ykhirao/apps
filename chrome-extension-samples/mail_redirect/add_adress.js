
var mail = "";
if (mail.length == 0) {
	alert("mailを入力してね！")
}
var is_added = document.getElementById('ctl00_objMasterPlaceHolder_lbForwardingAddressSummary').value == mail;

if (is_added) { // メールアドレスが追加されている場合
	document.getElementById('ctl00_objMasterPlaceHolder_btnNext').click()
} else {
	document.getElementById('ctl00_objMasterPlaceHolder_cbStatus').checked = true;
	document.getElementById('ctl00_objMasterPlaceHolder_txtForwardingAddress').value = mail;
	document.getElementById('ctl00_objMasterPlaceHolder_btnAdd').click();
}
