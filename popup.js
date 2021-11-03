//Get dom field from popup.html
const timeInputDom = document.getElementById("ext_time_input");
const setTimeButtonDom = document.getElementById("ext_set_time");
const secoundLeftDom = document.getElementById("ext__secound_left");

const setDragAbleStatuBtn = document.getElementById("ext__drag_elem_controll");

//set into storage when someone will edit this time input field
// timeInputDom.addEventListener("change", async (e) => {
//   chrome.storage.local.set({ sleepTime: e.target.value });
// });

//everytime get set sleeping time from storage and set in the dom field at the popup.html
chrome.storage.local.get(
  ["sleepTime", "drag_elem_showing"],
  ({ sleepTime, drag_elem_showing }) => {
    if (sleepTime !== undefined) {
      timeInputDom.value = sleepTime;
    }
    if (drag_elem_showing !== undefined) {
      if (drag_elem_showing === "showing") {
        setDragAbleStatuBtn.checked = false;
      } else {
        setDragAbleStatuBtn.checked = true;
      }
    }
  }
);

//This function set left secound immediately when popup.htnl loaded
setLeftSecoundWhenPopuploadedFirst();
function setLeftSecoundWhenPopuploadedFirst() {
  //Get time from chrome storage
  chrome.storage.local.get("sleepTime", ({ sleepTime }) => {
    if (
      sleepTime !== null ||
      sleepTime !== undefined ||
      typeof sleepTime === "string"
    ) {
      //get array by replaing : -> ""
      const timeArray = sleepTime?.split(":");

      if (!(timeArray === undefined)) {
        //set sleeping hour, minute , secounds
        const hour = typeof timeArray[0] === "string" ? timeArray[0] : "00";
        const minute = typeof timeArray[1] === "string" ? timeArray[1] : "00";
        const secound = typeof timeArray[2] === "string" ? timeArray[2] : "00";

        const now = new Date();
        const calculatedSleepTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hour,
          minute,
          secound
        );
        const seconds = Math.round(
          (calculatedSleepTime.getTime() - now.getTime()) / 1000
        );
        secoundLeftDom.innerHTML = seconds;
      }
    }
  });
}

setDragAbleStatuBtn.addEventListener("change", async (e) => {
  if (e.target.checked) {
    //Set dragable elemt showing on the stotgae false
    await chrome.storage.local.set({ drag_elem_showing: "stop_showing" });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.url.includes("chrome://")) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["dragableElem.css"],
      });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["dragableElem.js"],
      });
    }
  } else {
    //Set dragable elemt showing on the stotgae true
    await chrome.storage.local.set({ drag_elem_showing: "showing" });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.url.includes("chrome")) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["dragableElem.css"],
      });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["dragableElem.js"],
      });
    }
  }
});

//Set the left secounds in the popup.html white secound left section

setInterval(async function () {
  //Get time from chrome storage
  chrome.storage.local.get("sleepTime", ({ sleepTime }) => {
    if (
      sleepTime !== null ||
      sleepTime !== undefined ||
      typeof sleepTime !== undefined
    ) {
      //get array by replaing : -> ""
      const timeArray = sleepTime?.split(":");

      if (!(timeArray === undefined)) {
        //set sleeping hour, minute , secounds
        const hour = typeof timeArray[0] === "string" ? timeArray[0] : "00";
        const minute = typeof timeArray[1] === "string" ? timeArray[1] : "00";
        const secound = typeof timeArray[2] === "string" ? timeArray[2] : "00";

        const now = new Date();
        const calculatedSleepTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hour,
          minute,
          secound
        );
        const seconds = Math.round(
          (calculatedSleepTime.getTime() - now.getTime()) / 1000
        );
        secoundLeftDom.innerHTML = seconds;
      }
    }
  });
}, 1000);

//Create the page dome element where left secounds will show up -> Function calling
setTimeButtonDom.addEventListener("click", async () => {
  //set the dragelemnt current status showing
  await chrome.storage.local.set({ drag_elem_showing: "showing" });
  await chrome.storage.local.set({ sleepTime: timeInputDom.value });
  setDragAbleStatuBtn.checked = false;

  if (timeInputDom.value !== "") {
    //get array by replaing : -> ""
    const timeArray = timeInputDom.value.split(":");
    //set sleeping hour, minute , secounds
    const hour = typeof timeArray[0] === "string" ? timeArray[0] : "00";
    const minute = typeof timeArray[1] === "string" ? timeArray[1] : "00";
    const secound = typeof timeArray[2] === "string" ? timeArray[2] : "00";

    console.log(timeArray);

    const now = new Date();
    const calculatedSleepTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute,
      secound
    );
    const seconds = Math.round(
      (calculatedSleepTime.getTime() - now.getTime()) / 1000
    );

    console.log(seconds);

    secoundLeftDom.innerHTML = seconds;
  }

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes("chrome")) {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["dragableElem.css"],
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["dragableElem.js"],
    });
  }
});
