var div = document.createElement('div')
  
div.id = 'mydiv'
document.getElementsByTagName('body')[0].prepend(div);

var elements = 
    `<div id='spritecontainer'>
    <img src='https://www.w3schools.com/html/programming.gif' alt='Computer man' style='width:48px;height:48px;'>
    </div>
    <div id='coundowncontainer'style='float:left;'>    
    <p>Death Timer:</p>
    <p>
        <span id='countdown'></span>
        <i class="fas fa-skull-crossbones"></i>
    </p>
    </div>`; 

// <p>Death:</p>
// var elements = `
// <div id="mydivheader"></div>
// <p>Move</p>
// <p>this</p>
// <p>DIV</p>`;

// assuming elements contains string of html with your elements
div.innerHTML = elements;

div = document.getElementById("mydiv");
div.style.cssText += 'position: absolute;z-index: 9;background-color: #f1f1f1;text-align: center;border: 1px solid #d3d3d3;';

div = document.getElementById("spritecontainer");
div.style.cssText += 'float:left;padding: 10px;cursor: move;z-index: 10;background-color: #2196F3;color: #fff;';

div = document.getElementById("countdown");
div.style.cssText += 'font-size:25px';

chrome.storage.sync.get("boundingClientRect", function(boundingClientRect){

    
    div = document.getElementById("mydiv");

    console.log(boundingClientRect);

    div.style.top = (boundingClientRect.top) + "px";
    div.style.left = (boundingClientRect.left) + "px";


});

var dateElement = document.getElementById("countdown");

setInterval(function() {
    
    var now   = new Date();

    var sleepTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 45, 0);

    var seconds = Math.round((sleepTime.getTime() - now.getTime()) / 1000);

    dateElement.innerHTML = seconds;

}, 1000)



dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    chrome.storage.sync.set({ "boundingClientRect": document.getElementById("mydiv").getBoundingClientRect()}, function(){
        //  A data saved callback omg so fancy
    });
    
    document.onmouseup = null;
    document.onmousemove = null;
  }
}