export default class Axes {
    constructor(l, r, t, b, color = "black") {
        this.l = l
        this.r = r
        this.t = t
        this.b = b
        this.color = color
    }

    _draw(ctx) {
        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.moveTo(this.l, 0)
        ctx.lineTo(this.r, 0)
        ctx.moveTo(0, this.t)
        ctx.lineTo(0, this.b)
        ctx.stroke()
    }
}
