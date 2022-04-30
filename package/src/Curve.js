export default class Curve {
    constructor(points = [], colors = [], width = 1) {
        this.points = points
        this.color = colors[colors.length - 1] || "black"
        this.width = width
    }

    _draw(ctx) {
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.width
        ctx.beginPath()
        this.points.forEach(point => {
            ctx.lineTo(point[0], point[1])
        })
        ctx.stroke()
    }
}