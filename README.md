# xy.js
一个可以自动生成2d函数曲线的js库
![图片](https://user-images.githubusercontent.com/103297890/166099894-555efe7d-02ee-485e-838e-f25160a66b86.png)

## Documentation
### 基本使用
下载
```js
npm i xy.js
```
```js
// 引入xy.js
import XY from "xy.js"

// 初始化，并设置尺寸大小
const _y = new XY(400, 400)

// 添加函数曲线
_y.add("Math.sin(x)")

// 将canvas添加到html中去
document.body.append(_y.domElement)
```

### 添加曲线
y关于x的函数表达式以字符串形式传入

### 更改坐标轴颜色
```js
_y.setAxesColor("blue")
```
默认不设置颜色为黑色
颜色以字符串形式传入："black","rgba(255,0,0)"...

### 更改曲线的颜色
```js
_y.color("red")
_y.add("x**2")
```
默认不设置颜色为黑色
曲线颜色更改后，后面新增的曲线若不设置颜色，默认将继承此颜色;





