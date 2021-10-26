console.log("background running");

chrome.runtime.onInstalled.addListener(function (details) {
  console.log("Installex");

  chrome.storage.local.set({ sleepTime: undefined });
});

//Append the dragable timer element when a new tab opened and page load/url loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //Get draggable showing status
  chrome.storage.local.get("drag_elem_showing", ({ drag_elem_showing }) => {
    if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
      if (drag_elem_showing === "showing") {
        chrome.scripting.insertCSS({
          target: { tabId: tabId },
          files: ["dragableElem.css"],
        });

        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["dragableElem.js"],
        });
      } else {
        console.log("Showing is off");
      }
    }
  });
});

//Append the dragable timer element when a new tab opened and page load/url loaded
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.status === "complete" && /^http/.test(tab.url)) {
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
