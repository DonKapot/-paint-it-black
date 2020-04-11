 'use strict';
 let changeColor = document.getElementById('changeColor');
 let resetColor = document.getElementById('resetColor');
 let buttons = document.querySelectorAll('button');
 let initDom;
 let isInitDomSet;

 executeClientScript('src/services/parser.js');

 function sendClientMessage(data) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, data);
  });
 }
 function sendBackMessage(subject, inputData) {
  let data = {from: 'POPUP', subject, data: inputData};
  chrome.runtime.sendMessage(data, function(msg) {
    sendClientMessage(data);
  });
 }
 function getFunctionBody(f) {
  let fString = f.toString();
  return fString
  .substring(
    fString.indexOf("{") + 1,
    fString.lastIndexOf("}")
  )
  .trim()
 }

 function executeClientScript(callBack) {
  if (typeof callBack === 'string') {
    chrome.tabs.executeScript({
      file: callBack
    });
  }
  else {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, { code: getFunctionBody(callBack) });
    });
  }
 }

chrome.storage.sync.get('initDom', function(data) {
  console.log("Hello from popup", data);
  initDom = data;
  isInitDomSet = initDom && !Object.is(initDom, {}) ? true : false;
});
  
   changeColor.addEventListener('click', (e) => {
    sendBackMessage('color.change');
    executeClientScript(function() {
      {
        if (!document.body.classList.value.match(' pib-theme')) {
          document.body.setAttribute('class', document.body.classList.value + ' pib-theme');
        }
      }
    });
   });
  
   resetColor.addEventListener('click', (e) => {
      sendBackMessage('color.reset');
      executeClientScript(function() {
        {
          document.body.setAttribute('class', document.body.classList.value.replace(' pib-theme', ''))
        }
      });
   });
