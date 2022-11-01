import {ingredienser} from './ingredienser.js'

const startKnapp = document.querySelector('#start-spill')
const timer = document.querySelector('.timer-text')
const timerBar = document.querySelector('.timer-bar')
const poeng = document.querySelector('.poeng')
const spillContainer = document.querySelector('.spill-container')
const kundePizzaE = document.querySelector('#kundePizza')
const ingrediensKnapper = document.querySelector('.ingrediens-knapper')
const spillRes = document.querySelector('#spillRes')
const pizza = document.querySelector('#pizza')
startKnapp.addEventListener('click', startSpill)

ingredienser.forEach(ingrediens => {
    const ingrKnapp = document.createElement('img')
    ingrKnapp.setAttribute('class', 'ingrediens-knapp')
    ingrKnapp.src = `../img/ikoner/${ingrediens}.png`
    ingrKnapp.addEventListener('click', () => lagPizza(ingrediens))
    ingrediensKnapper.appendChild(ingrKnapp)
})

let nyPizza = []
let kundePizza = []

const startTime = 30
let time = startTime;
timer.innerHTML = time
let points = 0;
poeng.innerHTML = points

let pizzaTimeout;

function startSpill() {
    startKnapp.style.display = 'none'
    time = startTime
    nyKunde()
    const spillTimer =  setInterval( () => {
        time -= 1; 
        timer.innerHTML = time
        timerBar.style.transform = `scaleX(${time / startTime})`
        if (time === 0) {
            startKnapp.display = 'block'
            clearInterval(spillTimer)
            spillRes.innerHTML = 'Tida er ute. Du lagde '  + points + ' pizza. Trykk "Start spill" for å spille igjen.'
        }  
    }, 1000);

}

function nyKunde() {
    nyPizza = []
    kundePizza = nyttPizzaOrdre()
    console.log(kundePizza);
    kundePizzaE.innerHTML = kundePizza
    kundePizzaE.style.display = 'block'

    // pizzaTimeout = setTimeout(() => {
    //     kundePizzaE.style.display = 'none'
    // },10000)
}


function lagPizza(ingrediens) {
    if(time > 0){
        nyPizza.push(ingrediens)
        console.log(ingrediens);
        const ingr = document.createElement('img')
        ingr.setAttribute('class', 'ingrediensKnapp')
        ingr.src = `../img/ikoner/${ingrediens}.png`
        pizza.appendChild(ingr)
        if(nyPizza.length === kundePizza.length) {
            const likt = kundePizza.every((v,i) => v === nyPizza[i])
            if(likt){
                points++
                time += 3
                poeng.innerHTML = points
            }else{
                time -= 2
            }
            spillRes.innerHTML = likt? 'Du laget rett pizza' : 'Du laget feil pizza'
            nyKunde() 
            pizza.innerHTML = ''
            // clearTimeout(pizzaTimeout)
        }
    }
}

function nyttPizzaOrdre() {
    let pizzaArray = ['bunn', 'saus']
    let tempIngredienser = [...ingredienser]
    tempIngredienser.splice(0,2)
    const antallIngredienser = Math.ceil(Math.random() * (ingredienser.length-7)) + 1
    for (let i = 0; i < antallIngredienser; i++) {
        const ingrediensIndex = Math.floor(Math.random() * tempIngredienser.length)
        pizzaArray.push(tempIngredienser[ingrediensIndex])
        tempIngredienser.splice(ingrediensIndex,1)
    }
    return pizzaArray
}
