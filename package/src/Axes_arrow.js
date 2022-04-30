export default class Axes_arrow {
    constructor(type, x, y, dx, dy, color = "black") {
        this.type = type
        this.x = x
        this.y = y
        this.color = color
        this.dx = dx
        this.dy = dy
        this.color = color
    }

    _draw(ctx) {
        if (this.type === "ARROW_X") {
            ctx.fillStyle = this.color
            ctx.beginPath()
            ctx.moveTo(this.x - this.dx, this.y - this.dy)
            ctx.lineTo(this.x, this.y)
            ctx.lineTo(this.x - this.dx, this.y + this.dy)
            ctx.fill()
        } else if (this.type === "ARROW_Y") {
            ctx.fillStyle = this.color
            ctx.beginPath()
            ctx.moveTo(this.x + this.dy, this.y + this.dx)
            ctx.lineTo(this.x, this.y)
            ctx.lineTo(this.x - this.dy, this.y + this.dx)
            ctx.fill()
        }
    }
}