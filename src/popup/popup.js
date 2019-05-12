'use strict';

let changeColor = document.getElementById('changeColor');
let resetColor = document.getElementById('resetColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.addEventListener('click', (e) => {
  console.log("aaaaa");
  document.body.style.backgroundColor = "red";

  let color = e.target.value;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });

});

resetColor.addEventListener('click', (e) => {
  console.log("ooooo");
});

