let strategies = {
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
    return strategies[level](salary);

}
console.log(calculate('S', 10000));
console.log(calculate('A', 5000));
console.log(calculate('B', 4000));
console.log(calculate('C', 3000));
