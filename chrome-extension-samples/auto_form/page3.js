function my_set(name, val) {
  document.getElementsByName(name)[0].value = val;
}
function my_check(name, num) {
  document.getElementsByName(name)[num].checked = true;
}

// 性
document.getElementsByName('cstmr_lnm')[0].value = "tes"
// 名
document.getElementsByName('cstmr_fnm')[0].value = "tes"

// セイ
document.getElementsByName('cstmr_lkn')[0].value = "tes"

// メイ
document.getElementsByName('cstmr_fkn')[0].value = "tes"

document.getElementsByName('sex_typ')[0].checked = true; // 女性
document.getElementsByName('sex_typ')[1].checked = true; // 男性

my_set("telno1", "090");
my_set("telno2", "0202");
my_set("telno3", "0202");
my_set("ml_addr", "sample@sample.jp");
my_set("ml_addr_cnfm", "sample@sample.jp");
my_check("cmnt05", 1);
