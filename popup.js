//Get dom field from popup.html
const timeInputDom = document.getElementById("ext_time_input");
const setTimeButtonDom = document.getElementById("ext_set_time");
const secoundLeftDom = document.getElementById("ext__secound_left");

//set into storage when someone will edit this time input field
timeInputDom.addEventListener('change', async e => {
        chrome.storage.sync.set({ sleepTime: e.target.value });        
})

//everytime get set sleeping time from storage and set in the dom field at the popup.html
chrome.storage.sync.get("sleepTime", ({ sleepTime }) => {

    if(sleepTime !== undefined){
        timeInputDom.value = sleepTime;
    }
    
});

//This function set left secound immediately when popup.htnl loaded 
setLeftSecoundWhenPopuploadedFirst()
function setLeftSecoundWhenPopuploadedFirst(){

    //Get time from chrome storage
    chrome.storage.sync.get("sleepTime", ({ sleepTime }) => {

      if(sleepTime !== undefined){

            //get array by replaing : -> ""
            const timeArray  = sleepTime.split(":");
            //set sleeping hour, minute , secounds
            const hour = typeof timeArray[0] === "string" ? timeArray[0] : "00";
            const minute = typeof timeArray[1] === "string" ? timeArray[1] : "00";
            const secound = typeof timeArray[2] === "string" ? timeArray[2] : "00";

            const now   = new Date();
            const calculatedSleepTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, secound);
            const seconds = Math.round((calculatedSleepTime.getTime() - now.getTime()) / 1000);
            secoundLeftDom.innerHTML = seconds;

      }
      
    });

}

//Set the left secounds in the popup.html white secound left section
setInterval(function() {
     
      //Get time from chrome storage
      chrome.storage.sync.get("sleepTime", ({ sleepTime }) => {
      
      if(sleepTime !== undefined){

          //get array by replaing : -> ""
          const timeArray  = sleepTime.split(":");
          //set sleeping hour, minute , secounds
          const hour = typeof timeArray[0] === "string" ? timeArray[0] : "00";
          const minute = typeof timeArray[1] === "string" ? timeArray[1] : "00";
          const secound = typeof timeArray[2] === "string" ? timeArray[2] : "00";

          const now   = new Date();
          const calculatedSleepTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, secound);
          const seconds = Math.round((calculatedSleepTime.getTime() - now.getTime()) / 1000);
          secoundLeftDom.innerHTML = seconds;

      }
});

}, 1000) 


//Create the page dome element where left secounds will show up -> Function calling
setTimeButtonDom.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if(!tab.url.includes('chrome') ){
              chrome.scripting.insertCSS({
                  target: { tabId: tab.id },
                  files: ['dragableElem.css'],
              });

              chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  files: ['dragableElem.js'],
              });
    }
});

