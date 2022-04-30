import Axes from './src/Axes'
import Axes_arrow from './src/Axes_arrow'
import Curve from './src/Curve'
import Scaleplate from './src/Scaleplate'

export default class XY {
    constructor(w, h) {
        this.w = w
        this.h = h

        this.domElement = document.createElement('canvas')
        this.domElement.width = w
        this.domElement.height = h
        this.ctx = this.domElement.getContext('2d')
        this.ctx.translate(this.w / 2, this.h / 2)

        // 保存状态
        // 对象
        this.axes = null
        this.axes_arrows = []
        this.scaleplate_x = []
        this.scaleplate_y = []
        this.curves = []

        // 参数
        this.curveColor = []
        this.x_text = []
        this.y_text = []

        this.fn_title = []
        this.fn_pos = []
        this.fn_color = "purple"
        this.fn_fontfamily = 'serif'
        this.fn_fontsize = 12

        this._Irange = 0.9
        this.left = -this.w / 2 * this._Irange
        this.right = this.w / 2 * this._Irange
        this.top = this.h / 2 * this._Irange
        this.bottom = -this.h / 2 * this._Irange

        this.MAX_X = 0
        this.MIN_X = 0
        this.MAX_Y = 0
        this.MIN_Y = 0

        this.Ix = 50
        this.Iy = 50
        this.step_x = 1 / this.Ix

        this.scaleplate_fontsize = 14
        this.scaleplate_fontfamily = 'serif'
        this.scaleplate_fontcolor = "black"

        this._axes()
        this._axes_arrow()
        this.scale()
        this._update()
        this._onMousewheel()

    }

    _onMousewheel() {
        // this.domElement.addEventListener('mousewheel', (e) => {
        //     // 下
        //     if (e.wheelDelta > 0) {
        //         this.Ix += e.wheelDelta
        //         this.Iy += e.wheelDelta


        //         console.log(this)
        //         this._update()
        //     }

        // })
    }

    fn_text_info() {
        this.fn_title.forEach((title, i) => {
            let text = `(${i + 1}) y = ${title}`
            this.ctx.textAlign = "left"
            this.ctx.fillText(text, 10, 150 + i * this.fn_fontsize)
        })
    }

    scale() {

        const xs = []
        const ys = []

        for (let i = -this.w / 2; i < this.w / 2; i++) {
            if (i * this.Ix < this.w / 2 && i * this.Ix > -this.w / 2) {
                xs.push(i * this.Ix)

                if (i !== 0) {
                    this.x_text.push([i * this.Ix, i])
                }
            }

        }

        for (let i = -this.h / 2; i < this.h / 2; i++) {
            if (i * this.Iy > -this.h / 2 && i * this.Iy < this.h / 2) {
                ys.push(i * this.Iy)

                if (i !== 0) {
                    this.y_text.push([i * this.Iy, -i])
                }
            }
        }

        const scale_x = new Scaleplate('SCALEPLATE_X', xs, ys)
        const scale_y = new Scaleplate('SCALEPLATE_Y', xs, ys)

        this.scaleplate_x.push(scale_x)
        this.scaleplate_y.push(scale_y)

        this._update()
    }

    add(str) {

        this.fn_title.push(str)

        function f(x) {
            // y轴反正需要反转
            return eval(str) * (-1)
        }

        const points = []
        const p = []
        for (let i = this.left / this.Ix; i < this.right / this.Ix; i += this.step_x) {
            const x = i * this.Ix
            const y = f(i) * this.Iy

            this.MAX_X = Math.max(this.MAX_X, x)
            this.MAX_Y = Math.max(this.MAX_Y, y)
            this.MIN_X = Math.min(this.MIN_X, x)
            this.MIN_Y = Math.min(this.MIN_Y, y)


            if (y > -this.top && y < this.top) {
                points.push([x, y])
            } else {
                if (x > 0) {
                    p.push(x, y)
                }
            }
        }

        // this.Ix = this.MAX_X - this.MIN_X
        // this.Iy = this.MAX_Y - this.MIN_Y
        // console.log(([this.MAX_X, this.MAX_Y, this.MIN_X, this.MIN_Y]))

        let rightest = this.right / this.Ix
        p.push(rightest * this.Ix, f(rightest) * this.Iy)

        this.fn_pos.push(p)


        const curve = new Curve(points, this.curveColor)
        this.curves.push(curve)

        this._update()
    }

    color(c) {
        this.curveColor.push(c)
    }

    axesColor(c) {
        this.axes.color = c
        if (this.axes_arrows) {
            this.axes_arrows.forEach(x => x.color = c)
        }
        this._update()
    }

    _axes_arrow() {
        const axes_arrow_dx = 12
        const axes_arrow_dy = 4
        const axes_arrow_x = new Axes_arrow(
            "ARROW_X",
            this.w / 2,
            0,
            axes_arrow_dx,
            axes_arrow_dy,
        )
        const axes_arrow_y = new Axes_arrow(
            "ARROW_Y",
            0,
            -this.h / 2,
            axes_arrow_dx,
            axes_arrow_dy,
        )
        this.axes_arrows.push(axes_arrow_x, axes_arrow_y)
    }

    _axes() {
        const axes_x_len = this.w / 2
        const axes_y_len = this.h / 2
        const axes = new Axes(
            -axes_x_len,
            axes_x_len,
            axes_y_len,
            -axes_y_len
        )
        this.axes = axes
    }

    _render() {
        // 画出状态里的 x y坐标
        if (this.axes) {
            this.axes._draw(this.ctx)
        }

        // 画出状态里的 x y坐标箭头
        if (this.axes_arrows) {
            this.axes_arrows.forEach(x => x._draw(this.ctx))
        }

        // 画出状态里的 函数曲线
        if (this.curves) {
            this.curves.forEach(curve => curve._draw(this.ctx))
        }

        // 刻度线
        this._scalepate_text()

        // 函数名称
        this._functionName()

        this.fn_text_info()

    }

    _functionName() {
        this.ctx.fillStyle = this.fn_color

        this.ctx.textAlign = "left"
        this.ctx.font = `${this.fn_fontsize}px ${this.fn_fontfamily}`
        this.fn_title.forEach((title, i) => {
            // let text = `y=${title}`
            let text = `(${i + 1})`
            this.ctx.fillText(text, this.fn_pos[i][0], this.fn_pos[i][1])
        })
    }

    _scalepate_text() {
        if (this.scaleplate_x) {
            this.scaleplate_x.forEach(scale_x => scale_x._draw(this.ctx))
        }

        if (this.scaleplate_y) {
            this.scaleplate_y.forEach(scale_y => scale_y._draw(this.ctx))
        }

        this.ctx.fillStyle = this.scaleplate_fontcolor
        this.ctx.textAlign = "center"
        this.ctx.font = `${this.scaleplate_fontsize}px ${this.scaleplate_fontfamily} `
        this.x_text.forEach(p => {
            let [pos_x, text] = p
            this.ctx.fillText(text, pos_x, this.scaleplate_fontsize)
        })
        this.ctx.textAlign = "end"
        this.y_text.forEach(p => {
            let [pos_y, text] = p
            this.ctx.fillText(text, -this.scaleplate_fontsize / 2, pos_y + this.scaleplate_fontsize / 2)
        })

        this.ctx.fillText(0, 0, 0)
    }

    _update() {
        this.ctx.clearRect(-this.w / 2, -this.h / 2, this.w, this.h)
        this._render()
    }

}
