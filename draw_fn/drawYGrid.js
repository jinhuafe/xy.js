import {
    main_line_color,
    sub_line_color,
    main_line_width,
    sub_line_width,
    scaler_font_family,
    font_size,
    font_pos_offset,
} from '../contests.js'

import {
    getStep,
} from '../utils/getStep.js'

export default function drawYGrid(ctx, w, h, s, t, b) {

    // 坐标轴的数值范围 [l, r]
    const len = (t - b) / s
    t = t / s
    b = b / s

    let step = getStep(len)[0]
    const startVal = Math.ceil(b / step) * step
    const endVal = t

    // 区分奇偶
    let countVal = 1

    for (let i = startVal; i < endVal; i += step / 2) {

        if (countVal % 2) {
            ctx.strokeStyle = main_line_color
            ctx.lineWidth = main_line_width
        } else {
            ctx.strokeStyle = sub_line_color
            ctx.lineWidth = sub_line_width
        }

        ctx.beginPath()
        const py = i / len * h
        ctx.moveTo(-w, py)
        ctx.lineTo(w, py)
        ctx.stroke()
        ctx.closePath()

        countVal++
    }


    ctx.save()
    ctx.scale(1, -1)

    for (let i = startVal; i < endVal; i += step) {

        ctx.textAlign = "right"
        ctx.textBaseline = "middle"
        ctx.font = `${font_size}px ${scaler_font_family}`

        const px = -font_pos_offset
        const py = -i / len * h
        const text = i.toFixed(getStep(len)[1])
        if (Math.abs(text) > 0.0001) {
            ctx.fillText(text, px, py)
        }
    }

    ctx.restore()
}