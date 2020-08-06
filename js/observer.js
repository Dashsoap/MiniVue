class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        //判断data是否为对象
        if (!data || typeof data !== 'object') {
            return
        }
        //遍历data中的所有属性
        Object.keys(data).forEach(
            key => {
                this.defineReactive(data, key, data[key])
            }
        )
    }
    defineReactive(obj, key, val) {//这里 其实可以使用obj[key] 获得val  但是这样就会触发死循环
        this.walk(val)// 这里判断val是不是一个对象 如果是 将其内部也转换成响应式数据 递归调用
        let _this = this
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                return val
            },
            set(newValue) {
                if (newValue === val) {
                    return
                }
                val = newValue
                _this.walk(newValue)// 新的属性如果是对象也对其进行内部响应式
            }
        })
    }
}