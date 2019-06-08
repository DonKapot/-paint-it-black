function parseDom(_domArr, callback) {

  let inputDom = _domArr !== "undefined" ? _domArr : document.body.children;

  function getStyle(el) {
    let style = getComputedStyle(el);
    return {
      'backgroundColor': style.backgroundColor,
      'color': style.color,
      'borderColor': style.borderColor
    }
  }

  function getPath(el) {
    let elemClassName = !el.className ? '' : `.${el.className.split(' ').join('.')}`;
    let elemId = !el.id ? '' : `#${el.id}`;
    return `${el.tagName}${elemClassName}${elemId}`
  }

  function getElement(el) {
    return {
      id: Symbol(),
      elemTag: el.tagName,
      elemParentPath: getPath(el.parentElement),
      elemPath: getPath(el),
      elemStyle: getStyle(el),
      elemChildrens: []
    };
  }

  function parse(arr) {
    let dom = [];
    for (let i=0; i<arr.length; i++) {
      let element = arr[i];
      let mainElement = getElement(element);
      let check = mainElement.elemTag !== "SCRIPT" && element.children.length > 0;
      if (check) {
        // let counter = 0;
        // let fullBranch = true;
        // while(counter < 5) {
        //   counter++;
        // }
        dom.push(getElement(element));
        // console.log(element);
      }
      if (typeof callback === "function") {
        callback(element);
      }
    }
    return dom;
  }
  return parse(inputDom);
}

let DOM = parseDom(document.body.children);

console.dir(DOM);

// chrome.runtime.sendMessage({
//   from: 'PARSER',
//   subject: 'send.dom',
//   DOM: DOM
// });