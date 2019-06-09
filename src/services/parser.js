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
        'borderColor': style.borderColor
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
      elemChildrens: []
    };
    return obj;
  }
}

class Dom {
  constructor(_domArr) {
    this.inputDom = typeof _domArr !== "undefined" ? _domArr : document.body.children;
    this.dom = this.parse(this.inputDom);
  }

  parse(_arr, callback) {
    let inputArr = typeof _arr !== "undefined" ? _arr : this.inputDom;
    let dom = [];
    for (let i=0; i<inputArr.length; i++) {
      let element = inputArr[i];
      let check = element.elemTag !== "SCRIPT" && element.children.length > 0;
      if (check) {
        dom.push(new Element(element));
      }
      if (typeof callback === "function") {
        callback(mainElement);
      }
    }
    return dom;
  }
}


// function parseDom(_domArr, callback) {

//   let inputDom = typeof _domArr !== "undefined" ? _domArr : document.body.children;

//   function getStyle(el) {
//     let style = getComputedStyle(el);
//     return {
//       'backgroundColor': style.backgroundColor,
//       'color': style.color,
//       'borderColor': style.borderColor
//     }
//   }

//   function getPath(el) {
//     let elemClassName = !el.className ? '' : `.${el.className.split(' ').join('.')}`;
//     let elemId = !el.id ? '' : `#${el.id}`;
//     return `${el.tagName}${elemClassName}${elemId}`
//   }

//   function getElement(el) {
//     return {
//       id: Symbol(),
//       elemTag: el.tagName,
//       elemParentPath: getPath(el.parentElement),
//       elemPath: getPath(el),
//       elemStyle: getStyle(el),
//       elemChildrens: []
//     };
//   }

//   function parse(arr) {
//     let dom = [];
//     for (let i=0; i<arr.length; i++) {
//       let element = arr[i];
//       let mainElement = getElement(element);
//       let check = mainElement.elemTag !== "SCRIPT" && element.children.length > 0;
//       if (check) {
//         // let counter = 0;
//         // let fullBranch = true;
//         // while(counter < 5) {
//         //   counter++;
//         // }
//         dom.push(getElement(element));
//         // console.log(element);
//       }
//       if (typeof callback === "function") {
//         callback(element);
//       }
//     }
//     return dom;
//   }
//   return parse(inputDom);
// }

// let DOM = parseDom(document.body.children);

let div = document.querySelector("div");
let el = new Element(div);
let DOM = new Dom();
console.dir(el);
console.dir(DOM);

// chrome.runtime.sendMessage({
//   from: 'PARSER',
//   subject: 'send.dom',
//   DOM: DOM
// });