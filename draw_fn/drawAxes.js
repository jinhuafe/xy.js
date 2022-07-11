const axes_color = "black"
const axes_width = 1

export default function drawAxes(ctx, w, h, l, r, t, b, s) {
    // w = w / s
    // h = h / s

    ctx.strokeStyle = axes_color
    ctx.lineWidth = axes_width
    ctx.fillStyle = axes_color

    ctx.moveTo(l / (r - l) * w, 0)
    ctx.lineTo(r / (r - l) * w, 0)

    ctx.moveTo(0, t / (t - b) * h)
    ctx.lineTo(0, b / (t - b) * h)

    ctx.stroke()

    ctx.beginPath()
    ctx.arc(0, 0, 3, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
}