 'use strict';
 let changeColor = document.getElementById('changeColor');
 let resetColor = document.getElementById('resetColor');
 let buttons = document.querySelectorAll('button');
 let initDom = {};


// chrome.tabs.executeScript({
//       file: 'src/services/parser.js'
// });

//  chrome.tabs.executeScript(tab.id, {code:
//   "document.body.appendChild(document.createElement('link')).href = 'https://example.com/script.js';"
// });

 chrome.storage.sync.get('initDom', function(data) {
  console.log("Hello from popup", data);
  initDom = data;
 });

  // for (let btn of buttons) {
  //     btn.addEventListener('click', (e) => {
  //         console.log("***");
  //         chrome.tabs.executeScript({
  //             file: 'src/services/parser.js'
  //         });
  //     });
  // }

 changeColor.addEventListener('click', (e) => {

  console.log("aaaaa");
  chrome.runtime.sendMessage({
    from: 'POPUP',
    subject: 'send.msg',
    msg: "changeColor from popup"
  });

  // document.body.style.backgroundColor = "red";

  // let color = e.target.value;

     //  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
     //      chrome.tabs.executeScript(
     //          tabs[0].id, { code: 'document.body.style.backgroundColor = "' + color + '";' });
     //  });
 });

 resetColor.addEventListener('click', (e) => {
  console.log("aaaaa");
  chrome.runtime.sendMessage({
    from: 'POPUP',
    subject: 'send.msg',
    msg: "resetColor from popup"
  });
 });