 'use strict';

function sendClientMessage(tabId, clientMsg, listenerData, responseCallback) {
  if (typeof tabId === 'number') {
    let data = {clientMsg, listenerData};
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabId, data);
    });
  }
  else {
    responseCallback(clientMsg);
    console.log("no tab id", tabId, clientMsg, listenerData);
  }
}

 chrome.runtime.onInstalled.addListener(function() {
   console.log('Main');
  chrome.runtime.onMessage.addListener(function(listenerData, sender, response) {
    let tabId = sender && sender.tab && sender.tab.id ? sender.tab.id : '';
    if (listenerData.from === 'PARSER' && listenerData.subject === 'send.initDom') {
      sendClientMessage(tabId, "Hello from main on initDom", listenerData, response);
      chrome.storage.sync.set({ initDom: listenerData.data }, function() {
        sendClientMessage(tabId, "initDom has been set", listenerData, response);
      }); 
    }
    if (listenerData.from === 'POPUP' && listenerData.subject === 'color.change') {
      sendClientMessage(tabId, "Hello from main on color.change", listenerData, response);
    }
    if (listenerData.from === 'POPUP' && listenerData.subject === 'color.reset') {
      sendClientMessage(tabId, "Hello from main on color.reset", listenerData, response);
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