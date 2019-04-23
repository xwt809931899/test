var Bounce = function (salary) {
    this.salary = salary;
}

// 面向对象的世界， 创建很多对象， 策略对象
// 实现了同样的接口， caculate  所以可以互换使用  策略模式
function PerformanceS () {
    
}

function PerformanceA () {
    
}

function PerformanceB () {
    
}

function PerformanceC () {
    
}

PerformanceS.prototype.caculate = function (salary) {
    return salary * 5;
}
PerformanceA.prototype.caculate = function (salary) {
    return salary * 3;
}
PerformanceB.prototype.caculate = function (salary) {
    return salary * 2;
}
PerformanceC.prototype.caculate = function (salary) {
    return salary * 1;
}

Bounce.prototype.setStrategy = function (strategy) {
    this.strategy = strategy;
}
Bounce.prototype.getBounce = function () {
    return this.strategy.caculate(this.salary);
}

const bounce = new Bounce(10000);
bounce.setStrategy(new PerformanceS());
console.log(bounce.getBounce());

const bounce2 = new Bounce(5000);
bounce2.setStrategy(new PerformanceA);
console.log(bounce2.getBounce());

const bounce3 = new Bounce(4000);
bounce3.setStrategy(new PerformanceB);
console.log(bounce3.getBounce());

const bounce4 = new Bounce(3000);
bounce4.setStrategy(new PerformanceC);
console.log(bounce4.getBounce());



