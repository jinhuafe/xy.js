import {
    styleColorInfo,
    styleList,
    styleButton,
    styleSpan,
    styleUl,
    styleForm,
    styleFormInput,
    styleFormButton,
    styleDeleteButton
} from './styleSideBar.js'

import changeStr from '../utils/changeStr.js'
import colorToHex from '../utils/colorToHex.js'

export default function fnExpressionList(dom, list, color) {
    dom.innerHTML = null

    const listCopy = [...list]
    const isHiddenState = new Array(list.length).fill(0)

    // 添加函数的表单
    const form = document.createElement('form')
    const beforeInput = document.createElement('span')
    const input = document.createElement('input')
    const submit = document.createElement('button')
    styleForm(form)
    styleFormInput(input)
    styleFormButton(submit)

    let inputVal

    input.onchange = (e => {
        inputVal = e.target.value
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        list.push(inputVal)

        input.value = ''
        inputVal = ''

        fnExpressionList(dom, list, color)
    })

    beforeInput.textContent = "f(x) = "
    submit.type = "submit"
    submit.textContent = "添加"


    form.append(beforeInput)
    form.append(input)
    form.append(submit)
    dom.append(form)

    const ul = document.createElement('ul')
    styleUl(ul)

    list.forEach((item, index) => {

        const li = document.createElement('li')
        styleList(li)

        // 颜色指示
        const color_info = document.createElement('input')
        color_info.type = "color"
        /**
         * 颜色需要转成hex  --> 可以自己写一个各种颜色转换的库，参考color.js
         */
        color_info.value = colorToHex(color[index])
        styleColorInfo(color_info)

        color_info.onchange = (e) => {
            color[index] = e.target.value
        }

        // 函数名称
        const span = document.createElement('span')
        const text = `f(x) = ${changeStr(item)}`
        span.textContent = text
        styleSpan(span)

        // 显示、隐藏按钮
        const btn = document.createElement('button')
        btn.textContent = "显示"
        styleButton(btn)

        btn.addEventListener('click', () => {
            isHiddenState[index] = isHiddenState[index] === 0 ? 1 : 0

            if (isHiddenState[index]) {
                // 隐藏
                list[index] = null
                btn.textContent = "隐藏"
            } else {
                // 显示
                list[index] = listCopy[index]
                btn.textContent = "显示"
            }
        })

        // 删除按钮
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = " x "
        styleDeleteButton(deleteBtn)

        deleteBtn.addEventListener('click', () => {
            list.splice(index, 1)

            fnExpressionList(dom, list, color)
        })

        li.append(color_info, span, btn, deleteBtn)
        ul.append(li)
    })

    dom.append(ul)


    const btns = document.querySelectorAll('button')
    btns.forEach(btn => {
        btn.style.padding = "0.2rem"
        btn.style.border = "1px solid #ccc"
        btn.style.borderRadius = "4px"
    })




}