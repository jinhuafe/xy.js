const RADIUS = '4px'
const BORDER_OUTSIDE_COLOR = "#000"
const BORDER_INSIDE_COLOR = "#222"

function style(dom, property, str) {
    dom.style[property] = str
}

export function styleDomElement(dom) {
    style(dom.parentNode, "display", "flex")
    style(dom.parentNode, "justify-content", "center")


    style(dom, "border", "2px solid " + BORDER_OUTSIDE_COLOR)
    style(dom, "border-radius", RADIUS)
    style(dom, "padding", "10px")
    style(dom, "margin", "10px")
    style(dom, "display", "flex")
}

export function styleCanvas(dom) {
    style(dom, "display", "block")
    style(dom, "border", "1px solid " + BORDER_INSIDE_COLOR)
    style(dom, "border-radius", RADIUS)
}

export function styleSideBar(dom) {
    // style(dom, "width", "200px")
    style(dom, "height", "400px")
    // style(dom, "border", "1px solid " + BORDER_INSIDE_COLOR)
    style(dom, "margin-left", "10px")
    // style(dom, "padding", "1rem")
    // style(dom, "border-radius", RADIUS)
}
