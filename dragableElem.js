
//Get sleeping time
chrome.storage.local.get(["sleepTime", "currentPosition", "isCollupsed", "drag_elem_showing"], async({ sleepTime, currentPosition, isCollupsed, drag_elem_showing }) => {

        //check if the current status is hidden or not

            console.log("Fired", drag_elem_showing)

            if(drag_elem_showing !== undefined && drag_elem_showing === "showing"){

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
                
                if(currentPosition !== undefined){

                        dragable_main_container.style.top =  currentPosition.top + "px";
                        dragable_main_container.style.left = currentPosition.left + "px";
                        dragable_main_container.style.bottom = currentPosition.bottom + "px";
                        dragable_main_container.style.right = currentPosition.right + "px";

                }else{
                        dragable_main_container.style.right = "10px";
                        dragable_main_container.style.bottom = "10px";
                }

                const timerArea = document.createElement('h1');
                timerArea.setAttribute("id", "ext_timer_area_seconds");
                timerArea.className = "timer_area";
                timerArea.innerText = seconds;

                const iconImage = document.createElement('img');
                iconImage.setAttribute("src", "https://maranasati.s3.amazonaws.com/yama.gif");
                iconImage.className = "icon_image";
                iconImage.setAttribute("id", "image_toggle_button");

                if(isCollupsed !== undefined && isCollupsed) {

                        timerArea.className = "d_none";
                        dragable_main_container.style.backgroundColor = "transparent";

                }


                		let dragImg = false;
                        iconImage.addEventListener(
                            'mousedown', () => dragImg = false);
                    
                        iconImage.addEventListener(
                            'mousemove', () => dragImg = true);
                    
                        iconImage.addEventListener(
                            'mouseup', () => {

                                if(dragImg){
                                    // NO ACTION SHOULD BE TAKEN AS IT IS DRAGGING NOW
                                }else{

                                    if(timerArea.classList.contains("d_none")){

                                        timerArea.classList.remove("d_none");
                                        timerArea.classList.add("timer_area");
                                        dragable_main_container.style.backgroundColor = "rgb(219, 216, 216)";

                                        chrome.storage.local.set({isCollupsed: false});

                                    }else{

                                        timerArea.className = "d_none";
                                        dragable_main_container.style.backgroundColor = "transparent";
                                        chrome.storage.local.set({isCollupsed: true});

                                    }

                                }

                            });

                dragable_main_container.appendChild(iconImage);
                dragable_main_container.appendChild(timerArea);

                

                document.querySelector('body').appendChild(dragable_main_container);

                const dragElem = document.getElementById("ext__dragable_main_container");

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

                    async function closeDragElement() {
                        /* stop moving when mouse button is released:*/
                        document.onmouseup = null;
                        document.onmousemove = null;

                        const currentPositionFromDrag = elmnt.getBoundingClientRect();

                        await chrome.storage.local.set({currentPosition: {bottom: currentPositionFromDrag.bottom, left: currentPositionFromDrag.left, right: currentPositionFromDrag.right, top:currentPositionFromDrag.top }});
                        
                    }
                }

        }else{

            const dragElem = document.getElementById("ext__dragable_main_container");

            if(dragElem !== null){
                dragElem.remove();
            }
        }
                    
});

//Set the left secounds in the dragable element secound left section
     
      //Get time from chrome storage
       chrome.storage.local.get("sleepTime", ({ sleepTime }) => {

            setInterval(function() {

            //get current dragable element from the loaded page
            const dragable_elm_secoundLeftDom = document.getElementById('ext_timer_area_seconds');

            if(dragable_elm_secoundLeftDom !== null){

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
                
            }

            }, 1000) 
    });




