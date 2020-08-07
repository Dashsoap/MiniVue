# Vue 数据响应式的核心原理

## Vue 2.x 原理

这里摘取官网上的一句话
当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 `Object.defineProperty` 把这些 property 全部转为 `getter/setter`。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。
[官网原文地址](https://cn.vuejs.org/v2/guide/reactivity.html)

很显然我们得知`vue` 的响应式原理是由`Object.defineProperty` 来实现的

[MDN解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

总而言之就是:Vue通过设定对象属性的 setter/getter 方法来监听数据的变化，通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图。

## Vue 3.0 原理

使用的ES6的新特性 proxy

[MDN-Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

编码方面比`Object.defineProperty` 友好

因为`Proxy` 可以自动遍历`data`对象

且性能又浏览器优化

## 发布订阅模式 和 观察者模式

TODO

## Vue 基本响应式模拟思路

![基本结构](https://raw.githubusercontent.com/Dashsoap/PhoneBed/master/uPic/quq4IB.png)

### Vue : 把data中的成员注入到vue实例 并且把data中的成员转成getter和setter

![Vue](https://raw.githubusercontent.com/Dashsoap/PhoneBed/master/uPic/20h7Kl.png)

### Overver: 负责把data中的属性转换成响应式数据

![Oberver](https://raw.githubusercontent.com/Dashsoap/PhoneBed/master/uPic/94TKR1.png)

### Compiler: 负责编译模板,解析指令和差值表达式

![Compiler](https://raw.githubusercontent.com/Dashsoap/PhoneBed/master/uPic/42jRLw.png)

### Dep: 在getter中收集依赖 添加观察者 并且在setter中通知所有观察者

![Dep](https://raw.githubusercontent.com/Dashsoap/PhotoBed/master/uPic/5qCIyR.png)

结构:![Dep结构](https://raw.githubusercontent.com/Dashsoap/PhotoBed/master/uPic/MQPvkJ.png)

### watcher: 更新视图 把自己添加到Dep中