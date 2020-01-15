
document.getElementById('mail').onclick = function() {
    
    localStorage['input_id'] = this.children;
}


document.getElementById('out').onclick = function() {

    document.getElementById('output').value = "te";
    document.getElementsByClassName("ArticleMainHeader__title")[0].innerHTML = localStorage['input_id'];

}