import {musikk, eastereggmusikk, lydWin, lydFail, lydTimeOut} from './utils/lyd.js'
import {figur, lagKnapper, nyttPizzaOrdre} from './utils/funksjoner.js'

const startKnapp = document.querySelector('#start-spill')
const timer = document.querySelector('.timer-text')
const timerBar = document.querySelector('.timer-bar')
const poeng = document.querySelector('.poeng')
const spillContainer = document.querySelector('.spill-container')
const figurContainer = document.querySelector('.figur-container')
const kundePizzaE = document.querySelector('#kundePizza')
const spillRes = document.querySelector('#spillRes')
const pizza = document.querySelector('#pizza')

lagKnapper(lagPizza)

startKnapp.onclick = startSpill

let nyPizza = []
let kundePizza = []

const startTime = 30
let time = startTime;
timer.innerHTML = time

let points = 0;
let totalPizza = 0;
poeng.innerHTML = points

let pizzaTimeout;
let valgtMusikk

function startSpill() {

    const musikkNum = Math.random()*100
    valgtMusikk = musikkNum < 1? eastereggmusikk : musikk;
    valgtMusikk.play()
    figurContainer.innerHTML = ''
    startKnapp.style.display = 'none'
    time = startTime
    nyKunde()
    const spillTimer =  setInterval( () => {
        time -= 1; 
        timer.innerHTML = time

        timerBar.style.transform = `scaleX(${time === 0? 0 : (time / startTime)-1/30})`
        if (time <= 0) {
            valgtMusikk.stop()
            figurContainer.firstElementChild.className = 'figur figur-ut'
            startKnapp.style.display = 'block'
            clearInterval(spillTimer)
            spillRes.innerHTML = 'Tida er ute. Du lagde '  + points + ' pizza. Trykk "Start spill" for å spille igjen.'
            lydTimeOut.play()
        }  
    }, 1000);

}

function nyKunde() {
    nyPizza = []
    kundePizza = nyttPizzaOrdre()
    console.log(kundePizza);
    kundePizzaE.innerHTML = kundePizza
    kundePizzaE.style.display = 'block'
    figur()
    // pizzaTimeout = setTimeout(() => {
    //     kundePizzaE.style.display = 'none'
    // },10000)
}


function lagPizza(ingrediens) {
    if(time > 0){
        nyPizza.push(ingrediens)

        const ingr = document.createElement('img')
        ingr.setAttribute('class', 'ingrediensKnapp')
        ingr.src = `../img/ikoner/${ingrediens}.png`
        pizza.appendChild(ingr)

        if(nyPizza.length === kundePizza.length) {
            totalPizza++;
            const likt = kundePizza.every((v,i) => v === nyPizza[i])
            if(likt){
                points++
                time += 3
                poeng.innerHTML = points
                lydWin.play();
            }else{
                poeng < 10? time - 2 <= 0? 0 : time -= 2 : time - 2 <= 0? 0 : time -= 5
                lydFail.play();
            }
            
            figurContainer.childNodes[totalPizza-1].className = 'figur figur-ut'
            spillRes.innerHTML = likt? 'Du laget rett pizza' : 'Du laget feil pizza'
            nyKunde() 
            pizza.innerHTML = ''
            // clearTimeout(pizzaTimeout)
        }
    }
}


