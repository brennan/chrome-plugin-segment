// listen for messages from the content script
chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page action for the requesting tab
    chrome.pageAction.show(sender.tab.id);
  }
});

// this is where icon colors are updated

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'showBrowserAction')) {

  // set the icon
  chrome.browserAction.setIcon({ path: "app/icongreen.png" });

  }
});
