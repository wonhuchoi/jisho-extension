
// adds jquery
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var cr= [];

text = "";
res = "Loading..."
console.log("Creating Hover block");
let hoverBlock = document.createElement("div");
hoverBlock.setAttribute("id", "hoverPopup");
hoverBlock.style.position = "absolute";
hoverBlock.style.color = "white";
hoverBlock.style.background = "#666";
hoverBlock.style.padding = "0.5em";
hoverBlock.style.display = "none";
document.body.appendChild(hoverBlock);

const mouseUpHandler = () => {
    cr= window.getSelection().getRangeAt(0).getClientRects();
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        } else {
            callback(null);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Access-Control-Allow-Origin", '*');
    xmlHttp.send(null);
}

const formatText = (result) => {
    console.log("res", JSON.parse(result));
    let json = JSON.parse(result);
    const regex = /\"english_definitions\":\[[^\]*]*\]/;
    let matches = result.match(regex);
    // console.log("matches", matches);
    return json.data[0].japanese[0].word + "(" +
            json.data[0].japanese[0].reading + ")" + ":" + 
            matches[0].replace('"english_definitions"', "");
}

const handleJishoGet = (result) => {
    if(result == null) {
        res = ""
        hoverBlock.style.display = "none";
        return;
    } else {
        res = formatText(result);
    }
    // console.log(result);
    $('#hoverPopup')
    .text(res)
    .css({
        top: cr[0].top-$('#hoverPopup').outerHeight(),
        left: cr[0].left
    })
    .show();
}

const mouseMoveHandler = (ev) => {
    for(var i = 0 ; i < cr.length ; i++) {
        $('#popup').text('').hide();
        if(ev.pageX >= cr[i].left && ev.pageX <= cr[i].right &&
            ev.pageY >= cr[i].top  && ev.pageY <= cr[i].bottom
            ) {
                console.log("hover", cr[0].top, cr[0].left);
                if(text != window.getSelection().toString()){
                    text = window.getSelection().toString();
                    httpGetAsync("https://jisho.org/api/v1/search/words?keyword=" + window.getSelection().toString(), handleJishoGet);
                    // res = "Loading..."
                    // $('#hoverPopup')
                    // .text(res)
                    // .css({
                    //     top: cr[0].top-$('#hoverPopup').outerHeight(),
                    //     left: cr[0].left
                    // })
                    // .show();
                }
                return;
        }
    }
    text = "";
    res = "Loading...";
    hoverBlock.style.display = "none";
}

const addListeners = () => {
    console.log("I am in listeners");
    document.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
}

addListeners();