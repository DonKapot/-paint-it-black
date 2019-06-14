class Element {

  constructor(el) {
    this.inputEl = typeof el !== "undefined" ? el : document.querySelector("div");
    this.element = this.getElement(this.inputEl);
    return this.element;
  }

  getElement(el) {
    let elemPath = "";
    let parentPath = "";
    let elemStyle = {};

    let getStyle = (el) => {
      let style = getComputedStyle(el);
      return {
        'backgroundColor': style.backgroundColor,
        'color': style.color,
        'borderColor': style.borderColor,
        'visible': style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse' ? false : true 
      }
    }
  
    let getPath = (el) => {
      let elemClassName = !el.className ? '' : `.${el.className.split(' ').join('.')}`;
      let elemId = !el.id ? '' : `#${el.id}`;
      return `${el.tagName}${elemClassName}${elemId}`
    }

    parentPath = getPath(el.parentElement);
    elemPath = getPath(el);
    elemStyle = getStyle(el);

    let obj = {
      id: Symbol(),
      elemTag: el.tagName,
      elemParentPath: parentPath,
      elemPath: elemPath,
      elemFullPath: `${parentPath} ${elemPath}`,
      elemStyle: elemStyle,
      elem: this.inputEl
    };
    return obj;
  }
}

class Dom {

  constructor(_domArr) {
    this.inputDom = typeof _domArr !== "undefined" ? _domArr : document.body.children;
    this.dom = this.parseDom(this.inputDom);
  }

  parseDom(_arr, callback) {
    let inputArr = typeof _arr !== "undefined" ? _arr : this.inputDom;
    let dom = [];
    
    for (let i=0; i<inputArr.length; i++) {
      let element = inputArr[i];
      let getElem = new Element(element);
      let isValid = element.elemTag !== "SCRIPT" && element.children.length > 0;
      let isCallback = typeof callback === "function";
      let isVisible = getElem.elemStyle.visible;

      if (isValid && isVisible && !isCallback) {
        dom.push(getElem);
      }
      if (isCallback) {
        callback(mainElement);
      }
    }
    return dom;
  }
}

let el = new Element();
let DOM = new Dom();
console.dir(el);
console.dir(DOM);

// chrome.runtime.sendMessage({
//   from: 'PARSER',
//   subject: 'send.dom',
//   DOM: DOM
// });