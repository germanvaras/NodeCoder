let numbers = new Map()
let getRandomNumbers = () => Math.floor(Math.random()*20 + 1)
for(let i = 0; i < 10000; i++){
    let number = getRandomNumbers()
    if(numbers.get(number)){
        numbers.set(number, numbers.get(number) + 1 )
    }
    else{
        numbers.set(number, 1)
    }
}
console.log(numbers)
