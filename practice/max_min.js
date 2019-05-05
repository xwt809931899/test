function getMaxAndMin (string) {
    // return (Math.max(...string.split(' ')),Math.min(...string.split(' ')))
    const a = Math.max(...string.split(' '))
    const b = Math.min(...string.split(' '))
    return `"${a} ${b}"`
}



console.log(getMaxAndMin('1 2 3 4 5'));

console.log(getMaxAndMin('1 2 -3 4 5'));

console.log(getMaxAndMin('1 9 3 4 -5'));