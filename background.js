console.log("background running");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(changeInfo, tabId);

    if(changeInfo.status === "complete"){
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
