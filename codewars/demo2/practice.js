Number.prototype.add = function generateAdd (num) {
    return this + num ;   // this指向对象 
}
Number.prototype.minus = function generateAdd (num) {
    return this - num ;   // this指向对象 
}
Number.prototype.multiply = function generateAdd (num) {
    return this * num ;   // this指向对象 
}
Number.prototype.division = function generateAdd (num) {
    return this / num ;   // this指向对象 
}
var numobj = new Number(10);
console.log((10).add(10).multiply(2).division(40));