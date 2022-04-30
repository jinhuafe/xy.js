export default class Scaleplate {
    constructor(type, xs, ys, d = 5, color = "black") {
        this.type = type
        this.xs = xs
        this.ys = ys
        this.d = d
        this.color = color
    }

    _draw(ctx) {
        ctx.strokeStyle = this.color
        if (this.type === "SCALEPLATE_X") {
            ctx.beginPath()
            this.xs.forEach(x => {
                ctx.moveTo(x, 0)
                ctx.lineTo(x, -this.d)
            })
            ctx.stroke()
        }

        if (this.type === "SCALEPLATE_Y") {
            ctx.beginPath()
            this.ys.forEach(y => {
                ctx.moveTo(0, y)
                ctx.lineTo(this.d, y)
            })
            ctx.stroke()
        }
    }
}
