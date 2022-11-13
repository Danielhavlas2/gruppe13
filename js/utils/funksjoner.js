import { ingredienser } from "../data.js";

const ingredienContainer = document.querySelector('.ingrediens-container')
const figurContainer = document.querySelector('.figur-container')

export function figur() {
    const figurSnakkebobble = document.createElement('div')
    figurSnakkebobble.className = 'figur-snakkebobble'
    const figurE = document.createElement('img')
    const randomTall = Math.ceil(Math.random() * 8)
    figurE.src = `../img/figurer/figur${randomTall}.png`
    const snakkebobble = document.createElement('div')
    snakkebobble.className = 'snakkebobble'
    figurE.className = 'figur'
    setTimeout(() => {
        snakkebobble.className = 'snakkebobble snakkebobble-inn'
        figurSnakkebobble.className = 'figur-snakkebobble figur-inn'
    },3)
    figurSnakkebobble.appendChild(snakkebobble)
    figurSnakkebobble.appendChild(figurE)
    figurContainer.appendChild(figurSnakkebobble)
    return snakkebobble
}

export function nyKunde() {
    const kundePizza = nyttPizzaOrdre()
    const snakkebobble = figur()
    kundePizza.forEach(ingrediens => {
        const ingr = document.createElement('img')
        ingr.className = 'ingrediens-knapp'
        ingr.src = `../img/ikoner/${ingrediens}.png`
        snakkebobble.appendChild(ingr)
    })
    return kundePizza
}

export function lagKnapper(lagPizza) {
    ingredienser.forEach(ingrediens => {
        const ingrKnapp = document.createElement('img')
        ingrKnapp.className = 'ingrediens-knapp'
        ingrKnapp.src = `../img/ikoner/${ingrediens}.png`
        ingrKnapp.onclick = () => lagPizza(ingrediens)
        ingredienContainer?.appendChild(ingrKnapp)
    })
}

export function nyttPizzaOrdre() {
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
