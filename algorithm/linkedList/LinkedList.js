import LinkedListNode from './LinkedListNode';   //node不支持import import是es6语法
// const LinkedListNode = require('./LinkedListNode');

//线性表

export default class LinkedList {
    constructor () {
        this.head = null;
        this.next = null;
    }
    append (value) {
        const newNode = new LinkedListNode(value);
        // 最后一个？
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }
        //不为空 head tail 有值

        this.tail.next = newNode;   //至关重要
        this.tail = newNode;

    }
    travel () {   //如何遍历
        const nodes = [];
        let currentNode = this.head;
        while(currentNode) {
            nodes.push(currentNode.value);
            currentNode = currentNode.next;

        }
        return nodes
    }
}

const linkedList = new LinkedList();
linkedList.append(5);
linkedList.append(2);
linkedList.append(9);
console.log(linkedList.travel());
