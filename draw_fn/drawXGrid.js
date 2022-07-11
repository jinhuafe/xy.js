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

export default function drawXGrid(ctx, w, h, s, l, r) {

    // 坐标轴的数值范围 [l, r]
    const len = (r - l) / s
    l = l / s
    r = r / s

    let step = getStep(len)[0]
    const startVal = Math.ceil(l / step) * step
    const endVal = r

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
        const px = i / len * w
        ctx.moveTo(px, -h)
        ctx.lineTo(px, h)
        ctx.stroke()
        ctx.closePath()

        countVal++
    }


    ctx.save()
    ctx.scale(1, -1)

    for (let i = startVal; i < endVal; i += step) {

        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.font = `${font_size}px ${scaler_font_family}`


        const px = i / len * w
        const py = font_pos_offset
        const text = i.toFixed(getStep(len)[1])
        if (Math.abs(text) > 0.0001) {
            ctx.fillText(text, px, py)
        }
    }

    ctx.restore()
}