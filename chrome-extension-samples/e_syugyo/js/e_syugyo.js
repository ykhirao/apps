var dakoku = (function() {
  var frames = window.frames;
  var doc = frames[1].document;

  var start = doc.getElementsByTagName('tr')[28].children[1].innerHTML.trim();
  var end   = doc.getElementsByTagName('tr')[28].children[3].innerHTML.trim();

  start_hour = parseInt(start.split(":")[0]);
  start_min = parseInt(start.split(":")[1]);
  end_hour = parseInt(end.split(":")[0]);
  end_min = parseInt(end.split(":")[1]);

  doc.getElementsByName('EZZINHR01 ')[0].children[start_hour].selected = true;
  doc.getElementsByName('EZZINMN01')[0].children[start_min].selected = true;
  doc.getElementsByName('EZZINHR02 ')[0].children[end_hour].selected = true;
  doc.getElementsByName('EZZINMN02')[0].children[end_min].selected = true;
  doc.getElementsByName('EEDGGT101 ')[0].value = "1.00";
}());

var input = [];
var command = [68, 65, 75, 79, 75, 85, 13];


window.onkeyup = keyup;
function keyup(e) {
  
    // console.log(e.keyCode);
    input.push(e.keyCode);

    if (input.toString().indexOf(command) >= 0) {
      dakoku();
      input = [];
    }

    if (e.keyCode == 13) {
        input = [];
    }

}



