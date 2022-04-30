import XY from 'xy.js'

const _y = new XY(400, 400)

_y.add("Math.sin(x)")

_y.color('green')
_y.add("x**2")

_y.color("red")
_y.add("x")

document.body.append(_y.domElement)

console.log(XY)