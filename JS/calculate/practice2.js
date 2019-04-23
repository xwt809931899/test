function Bounce (salary) {
    this.salary = salary;
}
Bounce.prototype.setStrategy = function (strategy) {
    this.strategy = strategy;
}
Bounce.prototype.getBounce = function () {
    return this.strategy.calculate(this.salary)
}

function PerformanceS () {

}
function PerformanceA () {

}
function PerformanceB () {
    
}

PerformanceS.prototype.calculate = function (salary) {
    return salary * 5;
}

PerformanceA.prototype.calculate = function (salary) {
    return salary * 3;
}

PerformanceB.prototype.calculate = function (salary) {
    return salary * 2;
}

var bounce = new Bounce(10000);
bounce.setStrategy(new PerformanceS);
console.log(bounce.getBounce());

var bounce2 = new Bounce(5000);
bounce2.setStrategy(new PerformanceA);
console.log(bounce2.getBounce());

var bounce3 = new Bounce(4000);
bounce3.setStrategy(new PerformanceB);
console.log(bounce3.getBounce());