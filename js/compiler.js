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
    compileElement(Node) {

    }//编译文本节点
    compileText(node) {
        // console.dir(node)
        //{{  msg   }}
        let reg = /\{\{(.+?)\}\}/
        if(reg.test(value)){
            let key = RegExp.$1.trim()
            node.textContent  = value.replace(reg,this.vm[key])
        }
    }
    //判断元素是否为指令
    isDirective(attrName) {
        return attrName.startWith('v-')
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