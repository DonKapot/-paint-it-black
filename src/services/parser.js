class Element {
  constructor(el) {
    this.inputEl = typeof el !== "undefined" ? el : document.querySelector("div");
    return this.getElement(this.inputEl);
  }

  getElement(el) {
    let getStyle = (el) => {
      let style = getComputedStyle(el);
      return {
        'backgroundColor': style.backgroundColor,
        'color': style.color,
        'borderColor': style.borderColor,
        'visible': style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse' ? false : true
      }
    }

    return {
      tag: el.tagName,
      node: this.inputEl,
      style: getStyle(el)
    };
  }
}

class Dom {
  constructor(_domArr) {
    this.inputDom = typeof _domArr !== "undefined" ? _domArr : document.body.children;
    this.dom = [];
    this.backColors = [];
    this.fontColors = [];
    if (typeof _domArr !== "object"){
      this.parseDom();
    }
  }

  getColors(arr) {
    if(typeof arr !== "undefined") {
      for (let i=0; i<arr.length; i++) {
        let element = arr[i];
      }
    }
  }

  parseDom(_arr) {
    let inputArr = typeof _arr !== "undefined" ? _arr : this.inputDom;

    for (let i=0; i<inputArr.length; i++) {
      let element = inputArr[i];
      let node = new Element(element);
      let isValid = element.elemTag !== "SCRIPT" && element.children.length > 0;
      let isVisible = node.style.visible;
      let isNodeExist = this.dom.find(el=>el.node===element);

      if (isValid && isVisible && typeof isNodeExist === "undefined") {
        this.dom.push(node);
        if (element.children.length > 0) {
          this.parseDom(element.children);
        }
      }
    }

  }
}

let DOM = new Dom();
console.dir(DOM);

// chrome.runtime.sendMessage({
//   from: 'PARSER',
//   subject: 'send.dom',
//   DOM: DOM
// });