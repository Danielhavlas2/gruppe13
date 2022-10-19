import {ingredienser} from './ingredienser.js'

const startKnapp = document.querySelector('#start-spill')
const spill = document.querySelector('#spill')
const kundePizzaE = document.querySelector('#kundePizza')
const spillRes = document.querySelector('#spillRes')
startKnapp.addEventListener('click', startSpill)

let nyPizza = []
let kundePizza = []

function startSpill() {
    kundePizza = nyttPizzaOrdre()
    console.log(kundePizza);
    kundePizzaE.innerHTML = kundePizza
    setTimeout(() => {
        kundePizzaE.style.display = 'none'
        ingredienser.forEach(ingrediens => {
            const ingrKnapp = document.createElement('button')
            ingrKnapp.innerHTML = ingrediens
            ingrKnapp.setAttribute('class', 'ingrediensKnapp')
            ingrKnapp.addEventListener('click', () => lagPizza(ingrediens))
            spill.appendChild(ingrKnapp)
        })
    },3000)
}

function lagPizza(ingrediens) {
    nyPizza.push(ingrediens)
    if(nyPizza.length === kundePizza.length) {
        const likt = kundePizza.every((v,i) => v === nyPizza[i])
        console.log(likt);
        spillRes.innerHTML = likt? 'Du laget rett pizza' : 'Du laget feil pizza' 
    }
}

function nyttPizzaOrdre() {
    let pizzaArray = ['pizzabunn', 'tomatsaus']
    let tempIngredienser = [...ingredienser]
    tempIngredienser.splice(0,2)
    console.log(tempIngredienser);
    const antallIngredienser = Math.ceil(Math.random() * (ingredienser.length-2)+2)
    for (let i = 0; i < antallIngredienser; i++) {
        const ingrediensIndex = Math.floor(Math.random() * tempIngredienser.length)
        pizzaArray.push(tempIngredienser[ingrediensIndex])
        tempIngredienser.splice(ingrediensIndex,1)
    }
    return pizzaArray
}

