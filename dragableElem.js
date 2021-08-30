console.log("ok")

//Get sleeping time
chrome.storage.sync.get("sleepTime", async({ sleepTime }) => {

              
                //Set dragable elemt showing on the stotgae true
                await chrome.storage.sync.set({drag_elem_showing: "showing"});

                //get array by replaing : -> ""
                const timeArray  = sleepTime.split(":");

                //set sleeping hour, minute , secounds
                const hour = typeof timeArray[0] === "string" ? timeArray[0] : "00";
                const minute = typeof timeArray[1] === "string" ? timeArray[1] : "00";
                const secound = typeof timeArray[2] === "string" ? timeArray[2] : "00";
                const now   = new Date();
                const calculatedSleepTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, secound);
                const seconds = Math.round((calculatedSleepTime.getTime() - now.getTime()) / 1000);               
                
                //create the element which will load to the every page when loaded
                const dragable_main_container = document.createElement('div');
                dragable_main_container.className = "ext__dragable_main_container";
                dragable_main_container.setAttribute("id", "ext__dragable_main_container");
                

                const timerArea = document.createElement('h1');
                timerArea.setAttribute("id", "ext_timer_area_seconds");
                timerArea.className = "timer_area";
                timerArea.innerText = seconds;

                const iconImage = document.createElement('img');
                iconImage.setAttribute("src", "https://maranasati.s3.amazonaws.com/yama.gif");
                iconImage.className = "icon_image";

                dragable_main_container.appendChild(iconImage);
                dragable_main_container.appendChild(timerArea);

                

                document.querySelector('body').appendChild(dragable_main_container);

                dragElement(document.getElementById("ext__dragable_main_container"));

                function dragElement(elmnt) {
                var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

                /* otherwise, move the DIV from anywhere inside the DIV:*/
                elmnt.onmousedown = dragMouseDown;


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
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
                }

});

//Set the left secounds in the dragable element secound left section
setInterval(async function() {
     
      //Get time from chrome storage
      await chrome.storage.sync.get("sleepTime", ({ sleepTime }) => {

                //get current dragable element from the loaded page
            const dragable_elm_secoundLeftDom = document.getElementById('ext_timer_area_seconds');

            //get array by replaing : -> ""
            const timeArray  = sleepTime.split(":");
            //set sleeping hour, minute , secounds
            const hour = typeof timeArray[0] === "string" ? timeArray[0] : "00";
            const minute = typeof timeArray[1] === "string" ? timeArray[1] : "00";
            const secound = typeof timeArray[2] === "string" ? timeArray[2] : "00";

            const now   = new Date();
            const calculatedSleepTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, secound);
            const seconds = Math.round((calculatedSleepTime.getTime() - now.getTime()) / 1000);
            dragable_elm_secoundLeftDom.innerHTML = seconds;
    });

}, 1000) 


