class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    //编译模板 处理文本节点和元素节点
    compile(el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(
            node => {
                //处理文本节点
                if (this.isTextNode(node)) {
                    this.compileText(node)
                } else if (this.isElementNode(node)) {
                    //处理元素节点
                    this.compileElement(node)
                }
                //判断是否node有子节点 有则递归调用处理
                if (node.childNodes && node.childNodes.length) {
                    this.compile(node)
                }

            }
        )
    }
    //编译元素节点 处理指令
    compileElement(node) {
        //遍历所有的属性节点
        Array.from(node.attributes).forEach(attr => {
            //判断是否是指令
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                //v-text ==>text ...
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node, key, attrName)
            }
        })
    }
    update(node, key, attrName) {
        let updateFn = this[attrName + 'Updater']
        updateFn && updateFn(node, this.vm[key])
    }



    //处理v-text指令
    textUpdater(node, value) {
        node.textContent = value
    }
    // 处理v-modle
    modelUpdater(node, value) {
        node.value = value
    }


    //编译文本节点
    compileText(node) {
        // console.dir(node)
        //{{  msg   }}
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
        }
    }
    //判断元素是否为指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    //判断节点是否为文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }
    //判断是否为元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
}