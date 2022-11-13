import { ingredienser } from "../data.js";

const ingrediensKnapper = document.querySelector('.ingrediens-knapper')
const figurContainer = document.querySelector('.figur-container')

export function figur() {
    const figurE = document.createElement('img')
    const randomTall = Math.ceil(Math.random() * 8)
    figurE.className = 'figur'
    setTimeout(() => {
        figurE.className = 'figur figur-inn'
    },3)
    figurE.src = `../img/figurer/figur${randomTall}.png`
    figurContainer.appendChild(figurE)
}

export function lagKnapper(lagPizza) {
    ingredienser.forEach(ingrediens => {
        const ingrKnapp = document.createElement('img')
        ingrKnapp.className = 'ingrediens-knapp'
        ingrKnapp.src = `../img/ikoner/${ingrediens}.png`
        ingrKnapp.onclick = () => lagPizza(ingrediens)
        ingrediensKnapper.appendChild(ingrKnapp)
        
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