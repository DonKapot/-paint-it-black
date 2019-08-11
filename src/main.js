 'use strict';
 chrome.runtime.onInstalled.addListener(function() {

  chrome.runtime.onMessage.addListener(function(msg) {
    console.log("Hello from main", msg);
    
    if ((msg.from === 'PARSER') && (msg.subject === 'send.initDom')) {
      chrome.storage.sync.set({ initDom: msg.data }, function() {
        console.log('initDom has been set');
      });
    }
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { schemes: ['http', 'https'] }
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  
});