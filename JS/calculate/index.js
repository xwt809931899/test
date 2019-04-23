// ali 14.6 2.6
// meituan 16 4
// 51信用卡 17 5
// S  5
// A  3
// B  2
// C  1
// D  

// level key  计算函数？

// 策略类
let stratigies =  {
    'S': function (salary) {
        return salary * 5;
    },
    'A': function (salary) {
        return salary * 3;
    },
    'B': function (salary) {
        return salary * 2;
    },
    'C': function (salary) {
        return salary * 1;
    }
}
function calculate (level, salary) {
    return stratigies[level](salary);
    // 分支？ 消除分支
    // if(level === 'S') {

    // return salary * 5;
    // }
    // else if(level === 'A') {
    // return salary * 3;
    // }
    // else if(level === 'B') {
    // return salary * 2;
    // }
    // else if(level === 'C') {
    // return salary * 1;
    // }
    // else {
    //     console.log("删库跑路");
    // }
}
console.log(calculate('S',10000));