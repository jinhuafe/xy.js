import {
    DOM_ELEMENT,
    CANVAS_WIDTH, CANVANS_HEIGHT,
    LINE_COLOR, LINE_WIDTH,
    LEFT, RIGHT, TOP, BOTTOM,
    SCALE
} from './contests.js'

import {
    styleCanvas,
    styleDomElement,
    styleSideBar,
} from './style.js'

import drawAxes from './draw_fn/drawAxes.js'
import drawXGrid from './draw_fn/drawXGrid.js'
import drawYGrid from './draw_fn/drawYGrid.js'
import drawAllFn from './draw_fn/drawAllFn.js'

import fnExpressionList from './side_bar/fnExpressionList.js'
import checkStr from './utils/checkStr.js'

export default class XY {
    constructor(options) {
        this.domElement = document.createElement('div')
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        // APIs
        // =================================================
        this.options = options

        this.width = this.options.width || CANVAS_WIDTH
        this.height = this.options.height || CANVANS_HEIGHT

        this.left = this.options.left || LEFT
        this.right = this.options.right || RIGHT
        this.top = this.options.top || TOP
        this.bottom = this.options.bottom || BOTTOM

        this.scale = this.options.scale || SCALE

        this.lineColor = this.options.lineColor || LINE_COLOR
        this.lineWidth = this.options.lineWidth || LINE_WIDTH

        this.el = this.options.el || function () {
            document.body.append(DOM_ELEMENT)
            return DOM_ELEMENT
        }()


        this.fnExpressions = []
        // ==================================================


        this.el.append(this.domElement)
        this.domElement.append(this.canvas)

        this.sideBar = document.createElement('div')
        this.domElement.append(this.sideBar)

        /**
         *  事件监听
         */

        // 滚轮缩放
        this.canvas.addEventListener('wheel', (e) => {
            const evt = e || window.event
            evt.preventDefault()

            let scaleChangeStep = e.deltaY / 1000

            if (this.scale + scaleChangeStep > 0) {
                this.scale += scaleChangeStep
            }
        })

        // 鼠标拖拽
        this.canvas.onmousedown = (ev) => {
            let e = ev || window.event
            let x1 = e.pageX
            let y1 = e.pageY

            this.canvas.onmousemove = (e) => {
                let x2 = e.pageX
                let y2 = e.pageY

                let move_x = (x2 - x1) / this.width * (this.right - this.left)
                let move_y = (y2 - y1) / this.height * (this.top - this.bottom)

                this.left -= move_x
                this.right -= move_x

                this.top += move_y
                this.bottom += move_y

                x1 = x2
                y1 = y2

            }
        }

        this.canvas.onmouseup = (e) => {
            this.canvas.onmousemove = null
        }

        // 样式布局
        styleDomElement(this.domElement)
        styleCanvas(this.canvas)
        styleSideBar(this.sideBar)

        this._tick()
    }


    _tick() {
        this._setUp()

        drawAxes(
            this.ctx,
            this.width,
            this.height,
            this.left,
            this.right,
            this.top,
            this.bottom,
            this.scale
        )

        drawXGrid(
            this.ctx,
            this.width,
            this.height,
            this.scale,
            this.left,
            this.right
        )

        drawYGrid(
            this.ctx,
            this.width,
            this.height,
            this.scale,
            this.top,
            this.bottom
        )

        drawAllFn(
            this.ctx,
            this.width,
            this.height,
            this.fnExpressions,
            this.scale,
            this.left,
            this.right,
            this.top,
            this.bottom,
            this.lineColor,
            this.lineWidth
        )

        window.requestAnimationFrame(this._tick.bind(this))
    }

    _setUp() {

        this.canvas.width = this.width
        this.canvas.height = this.height

        let offset_x = this.left / (this.right - this.left) * this.width
        let offset_y = this.top / (this.top - this.bottom) * this.height

        // 将canvas原点移到画布中心
        this.ctx.translate(-offset_x, offset_y);
        this.ctx.rotate(Math.PI);
        this.ctx.scale(-1, 1)
        this.ctx.save()
    }

    push(args) {

        for (let i = 0; i < arguments.length; i++) {
            let str = arguments[i]
            if (checkStr(str)) {
                this.fnExpressions.push(str)
            }
        }

        fnExpressionList(this.sideBar, this.fnExpressions, this.lineColor)
    }

}