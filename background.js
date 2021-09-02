console.log("background running");

//Append the dragable timer element when a new tab opened and page load/url loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {


        //Get draggable showing status
       chrome.storage.local.get("drag_elem_showing", ({ drag_elem_showing }) => {

                if(changeInfo.status === "complete" && /^http/.test(tab.url)){
                    if(drag_elem_showing === "showing"){


                                    chrome.scripting.insertCSS({
                                        target: { tabId: tabId },
                                        files: ['dragableElem.css'],
                                    });

                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId },
                                        files: ['dragableElem.js'],
                                    });   
                            }else{

                                console.log("Showing is off");
                            }

                }

       })
})
