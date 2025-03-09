function ham1(n:number): number {
    return  n*(n+1)/2
}
console.log(ham1(5))

function ham2(n:number): number {
    let sum: number = 0
    for (let i = 0; i <= n; i++) {
        sum += i
    }
    return sum
}
console.log(ham2(5))

function ham3(n:number): number {
    if (n === 1) {
        return 1
    }
    return n + ham3(n-1)
}

console.log(ham3(5));
