 'use strict';
 let changeColor = document.getElementById('changeColor');
 let resetColor = document.getElementById('resetColor');
 let buttons = document.querySelectorAll('button');
 let initDom;
 let isInitDomSet;

 function sendClientMessage(msg = "Hello from popup", obj) {
  let data = {msg, obj};
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    data.tabId = tabs;
    chrome.tabs.sendMessage(tabs[0].id, data);
  });
 }
 function sendBackMessage(subject) {
  let data = {from: 'POPUP', subject};
  chrome.runtime.sendMessage(data, function(msg) {
    sendClientMessage(msg)
  });
 }

 function executeClientScript(callBack) {
  if (typeof callBack === 'string') {
    chrome.tabs.executeScript({
      file: callBack
    });
  }
  else {
    // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    //   chrome.tabs.executeScript(tabs[0].id, { code: 'document.body.style.backgroundColor = "' + color + '";' });
    // });
  }
 }

chrome.storage.sync.get('initDom', function(data) {
  console.log("Hello from popup", data);
  initDom = data;
  isInitDomSet = initDom && !Object.is(initDom, {}) ? true : false;
});
  
   changeColor.addEventListener('click', (e) => {
    executeClientScript('src/services/parser.js');

    sendClientMessage("changeColor", initDom);

    sendBackMessage('color.change');
    
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, {msg: "changeColor", obj: isInitDomSet});
    // });
  
    // document.body.style.backgroundColor = "red";
  
    // let color = e.target.value;
  
    //  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    //      chrome.tabs.executeScript(
    //          tabs[0].id, { code: 'document.body.style.backgroundColor = "' + color + '";' });
    //  });

    //  chrome.tabs.executeScript(tab.id, {code:
    //   "document.body.appendChild(document.createElement('link')).href = 'https://example.com/script.js';"
    // });
   });
  
   resetColor.addEventListener('click', (e) => {
    executeClientScript('src/services/parser.js');

    sendClientMessage("resetColor", initDom);

    sendBackMessage('color.reset');
   });
