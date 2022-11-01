import {ingredienser} from './ingredienser.js'

const startKnapp = document.querySelector('#start-spill')
const timer = document.querySelector('#timer')
const poeng = document.querySelector('#poeng')
const spill = document.querySelector('#spill')
const kundePizzaE = document.querySelector('#kundePizza')
const spillRes = document.querySelector('#spillRes')
const pizza = document.querySelector('#pizza')
startKnapp.addEventListener('click', startSpill)

ingredienser.forEach(ingrediens => {
    const ingrKnapp = document.createElement('img')
    ingrKnapp.setAttribute('class', 'ingrediensKnapp')
    ingrKnapp.src = `../img/ikoner/${ingrediens}.png`
    ingrKnapp.addEventListener('click', () => lagPizza(ingrediens))
    spill.appendChild(ingrKnapp)
})

let nyPizza = []
let kundePizza = []

let time = 30;
timer.innerHTML = time
let points = 0;
poeng.innerHTML = points

let pizzaTimeout;

let lydWin = new sound("../lyd/points.mp3");
let lydFail = new sound("../lyd/fail.mp3");
let lydTimeOut = new sound("../lyd/wrong.mp3");

function startSpill() {
    startKnapp.style.display = 'none'
    time = 30
    nyKunde()
    const spillTimer =  setInterval( () => {
        time -= 1; 
        timer.innerHTML = time
        if (time === 0) {
            startKnapp.display = 'block'
            clearInterval(spillTimer)
            lydTimeOut.play();
            spillRes.innerHTML = 'Tida er ute. Du lagde '  + points + ' pizza. Trykk "Start spill" for å spille igjen.'
        }  
    }, 1000);
    

}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
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
                lydWin.play();
            }else{
                time -= 2
                lydFail.play();
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
