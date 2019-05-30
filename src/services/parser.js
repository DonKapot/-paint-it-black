console.dir(document.body);

let dom = [];

function getStyle(el) {
    let style = getComputedStyle(el);
    return {
        'backgroundColor': style.backgroundColor,
        'color': style.color,
        'borderColor': style.borderColor
    }
}

// function getChildren(el) {
//     let count = 0;
//     if (el.children.length > 0 && count <= 2) {
//         count++;
//         getChildren(el);
//     } else {
//         return [];
//     }
// }

function getPath(el) {
    let elemClassName = !el.className ? '' : `.${el.className.split(' ').join('.')}`;
    let elemId = !el.id ? '' : `#${el.id}`;
    return `${el.tagName}${elemClassName}${elemId}`
}

function getElement(el) {

    return {
        id: Symbol(),
        elemTag: el.tagName,
        elemPath: getPath(el),
        elemParentPath: getPath(el.parentElement),
        elemStyle: getStyle(el),
        elemChildrens: []
    };
}

for (element of document.body.children) {
    let mainElement = getElement(element);

    if (mainElement.elemTag !== "SCRIPT") {
        dom.push(getElement(element));
    }
}

chrome.runtime.sendMessage({
    from: 'PARSER',
    subject: 'send.dom',
    DOM: dom
});

var DOM = dom;

console.dir(DOM);