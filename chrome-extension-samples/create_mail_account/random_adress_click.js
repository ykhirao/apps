function rand_name(){
    var l = 5;
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    var cl = c.length;
    var r = "";
    for(var i=0; i<l; i++){
      r += c[Math.floor(Math.random()*cl)];
    }
    return r
    // test
}

document.getElementById('ctl00_objMasterPlaceHolder_txtEmailAcount').value = rand_name();
setTimeout(document.getElementById('ctl00_objMasterPlaceHolder_btnNext').click(), 200);