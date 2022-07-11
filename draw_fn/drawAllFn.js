export default function drawAllFn(
    ctx,
    w,
    h,
    arr,
    s,
    l,
    r,
    t,
    b,
    line_color,
    line_width
) {

    const n = (r - l) / 256
    l = l / s
    r = r / s
    t = t / s
    b = b / s

    arr.forEach((str, index) => {
        if (str) {
            drawFn(str, index)
        }
    })

    function drawFn(str, index) {
        function f(x) {
            return eval(str)
        }

        if (typeof line_color === "string") {
            ctx.strokeStyle = line_color
        } else {
            if (line_color.length < 1) {
                ctx.strokeStyle = "black"
            }
            ctx.strokeStyle = line_color[index]
        }

        ctx.lineWidth = line_width

        ctx.beginPath()

        for (let i = l; i < r; i += n) {
            const vx = i
            const vy = f(i)

            const px = vx / (r - l) * w
            const py = vy / (t - b) * h
            ctx.lineTo(px, py)
        }

        ctx.stroke()
        ctx.closePath()


    }
}

