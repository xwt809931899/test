//有个链表
import LinkedList from './linked_list.js'
const partition = (head, x) => {
    let cur = head,
    next,preHead,preTail,afterHead,afterTail
    if(head === null) {
        return null
    }
    while(cur){
        //相应结点进入对应链表
        next = cur.next  //先拿到next
        cur.next = null //因为拿到了，断掉之前的关系
        if(cur.val < x){
            //小于链
            if(!preHead){
                preHead = cur
                preTail = cur
            }else{
                preTail.next = cur
                preTail = cur
            }
        }
        else {
            if(!afterHead){
                afterHead = cur
                afterTail = cur
            }else{
                afterTail.next = cur
                afterTail = cur
            }
        }
        cur = next
    }
    if(preTail){
        preTail.next = afterHead
        return preHead
    }else{
        return afterHead
    }
}

//链表里有head属性 tail属性
const linkedList = new LinkedList();
linkedList
    .append(1)
    .append(4)
    .append(3)
    .append(2)
    .append(5)
    .append(2)
console.log(linkedList.toString())

const newHead = partition(linkedList.head,3)
let currentNode = newHead
while(currentNode){
    console.log(currentNode.val)
    currentNode = currentNode.next
}