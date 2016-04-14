// script is injected into javascript of the current active tab

var url = window.location.href;

var segmentEnabled = false;

// match script src tag with substring

var scripts = document.getElementsByTagName('script');
var url = "cdn.segment." // omit .com as to not exclude .io snippets

// TODO: look up this pattern: https://d2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/jyumwga/analytics.min.js

for (var i = 0; i < scripts.length; i++) {

  var thisScript = scripts[i].src;

  if ( thisScript.indexOf(url) > -1 ) {
    segmentEnabled = true;

    // Inform the background page that this should result in a browser action
    chrome.runtime.sendMessage({
      from:    'content',
      subject: 'showBrowserAction'
    });

    break;
  }
}

// once returns "true," send variable to background.js to update icon color
// send message to popup.js to the DOM of the plugin tab

// Inform the background page that
// this tab should have a page action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

    // Directly respond to the sender (popup),
    // through the specified callback */
    response(segmentEnabled); // pass the value of the variable here
  }
});
