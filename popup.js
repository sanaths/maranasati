// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let dateElement = document.getElementById("datetime");

setInterval(function() {
    
    var now   = new Date();

    var sleepTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 45, 0);

    
    var seconds = Math.round((sleepTime.getTime() - now.getTime()) / 1000);


    dateElement.innerHTML = seconds;

}, 1000)


chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }