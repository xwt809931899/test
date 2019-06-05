import LinkedListNode from './linked_list_node.js'
class LinkedList {
    constructor () {
        this.head = null
        this.tail = null
        //是一个空链表
    }
    append(val) {
        // let node = new LinkedListNode(val)
        // tail.next = node
        const newNode = new LinkedListNode(val)
        if(!this.head) { //空链表
            this.head = newNode
            this.tail = newNode
            return this  //用return来减少else
        }
        //非空
        this.tail.next = newNode
        this.tail = newNode
        return this     
    }
    toArray () {
        const nodes = []
        let currentNode = this.head

        while (currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next

        }
        return nodes
    }
    toString() {
        return this.toArray().map(node => node.val)
    }
} //被index.js里引用
export default LinkedList