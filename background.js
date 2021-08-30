console.log("background running");

//Append the dragable timer element when a new tab opened and page load/url loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    console.log(tab)

    if(changeInfo.status === "complete" && /^http/.test(tab.url)){
             chrome.scripting.insertCSS({
                  target: { tabId: tabId },
                  files: ['dragableElem.css'],
              });

              chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  files: ['dragableElem.js'],
              });   
    }
})
