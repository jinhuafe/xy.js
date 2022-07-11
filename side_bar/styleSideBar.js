const SIDEBAR_HEIGHT = 400
// const SIDEBAR_WIDTH = 200
const RADIUS = '4px'
const BORDER_OUTSIDE_COLOR = "#000"
const BORDER_INSIDE_COLOR = "#222"

function style(dom, property, str) {
    dom.style[property] = str
}

export function styleForm(dom) {
    style(dom, "height", SIDEBAR_HEIGHT * 0.2 + 'px')
    style(dom, "margin-bottom", SIDEBAR_HEIGHT * 0.03 + 'px')
    style(dom, "display", "flex")
    style(dom, "align-items", "center")
    style(dom, "justify-content", "space-between")
    style(dom, "background", "#ccc")
    style(dom, "padding", "0 1rem")
    style(dom, "font-size", "1.5rem")
    style(dom, "border-radius", RADIUS)
}
export function styleFormInput(dom) {
    style(dom, "height", "2rem")
    style(dom, "border-radius", RADIUS)
    style(dom, "border", "none")
    dom.placeholder = "请输入函数表达式"
    style(dom, "width", "50%")
    style(dom, "padding-left", "1rem")
}

export function styleFormButton(dom) {
    style(dom, "height", "2rem")
    style(dom, "border-radius", RADIUS)
}

export function styleUl(dom) {
    style(dom, "height", SIDEBAR_HEIGHT * 0.77 + 'px')
    style(dom, "border-radius", RADIUS)
    style(dom, "border", "1px solid " + BORDER_INSIDE_COLOR)
    style(dom, "padding", "0 1rem")
    style(dom, "overflow", "auto")
}

export function styleList(dom) {
    style(dom, "border-bottom", "1px solid #ccc")
    style(dom, "padding", "1rem 0")

    style(dom, "list-style", "none")
    style(dom, "align-items", "center")
    style(dom, "display", "flex")
    style(dom, "justify-content", "space-between")
}

export function styleColorInfo(dom) {
    style(dom, "width", "1rem")
    style(dom, "height", "1rem")
    style(dom, "margin-right", "0.5rem")
    style(dom, "border", 0)
    style(dom, "padding", 0)
}

export function styleSpan(dom) {
    style(dom, "width", "70%")
}

export function styleButton(dom) {
    // style(dom, "align-self", "auto")
}

export function styleDeleteButton(dom) {
    // style(dom, "width", "1rem")
}

