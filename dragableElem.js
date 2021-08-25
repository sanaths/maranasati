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
                
                const dragable_main_container = document.createElement('div');
                dragable_main_container.className = "ext__dragable_main_container";
                

                const timerArea = document.createElement('h1');
                timerArea.setAttribute("id", "ext_timer_area_seconds");
                timerArea.className = "timer_area";
                timerArea.innerText = seconds;
                dragable_main_container.appendChild(timerArea);

                document.querySelector('body').appendChild(dragable_main_container);

                console.log("ok");

});

//Set the left secounds in the dragable element secound left section
setInterval(function() {
     
      //Get time from chrome storage
      chrome.storage.sync.get("sleepTime", ({ sleepTime }) => {

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