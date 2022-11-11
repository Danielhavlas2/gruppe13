import {musikk, eastereggmusikk, lydWin, lydFail, lydTimeOut} from './utils/lyd.js'
import {nyKunde, lagKnapper} from './utils/funksjoner.js'
import { brukernavn } from "./home.js";
import { uploadScore } from './utils/firebase.js';

const startKnapp = document.querySelector('#start-spill')
const restartKnapp = document.querySelector('#restart-spill')
const timer = document.querySelector('.timer-text')
const timerBar = document.querySelector('.timer-bar')
const poeng = document.querySelector('.poeng')
const spillContainer = document.querySelector('.spill-container')
const figurContainer = document.querySelector('.figur-container')
const kundePizzaE = document.querySelector('#kundePizza')
const gameOverModal = document.querySelector('.game-over')
const spillRes = document.querySelector('#spill-res')
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

let valgtMusikk

let paused = false

function startSpill() {
    points = 0;
    totalPizza = 0;
    const musikkNum = Math.random()*100
    valgtMusikk = musikkNum < 1? eastereggmusikk : musikk;
    valgtMusikk.play()
    figurContainer.innerHTML = ''
    startKnapp.style.display = 'none'
    time = startTime
    nyPizza = []
    kundePizza = nyKunde()
    const spillTimer =  setInterval( () => {
        console.log(paused);
        if(!paused){
            time -= 1; 
        }
        timer.innerHTML = time

        timerBar.style.transform = `scaleX(${time === 0? 0 : (time / startTime)-1/30})`
        if (time <= 0) {
            valgtMusikk.stop()
            if(figurContainer.childNodes.length === 0){
                figurContainer.firstChild.className = 'figur-snakkebobble figur-ut'
                figurContainer.firstChild.firstChild.firstChild.className = 'snakkebobble snakkebobble-ut'
            }else{
                figurContainer.childNodes[totalPizza-1].className = 'figur-snakkebobble figur-ut'
                figurContainer.childNodes[totalPizza-1].childNodes[0].className = 'snakkebobble snakkebobble-ut'
            }
            // gameOverModal.style.display = 'block'
            let navn = brukernavn
            gameOverModal.className = 'game-over game-over-inn'
            if(!brukernavn ){
                const randNum = Math.ceil(Math.random() * 100) 
                navn = `Big_Chungus${randNum}`
            }
            uploadScore(navn, points)
            restartKnapp.onclick = () => {
                gameOverModal.className = 'game-over'
                startSpill()
            }
            clearInterval(spillTimer)
            spillRes.innerHTML = `Tida er ute. Du lagde ${points} pizza.`
            lydTimeOut.play()
        }  
    }, 1000);

}




function lagPizza(ingrediens) {
    if(time > 0 && !paused){
        nyPizza.push(ingrediens)

        // const ingr = document.createElement('img')
        // ingr.setAttribute('class', 'ingrediensKnapp')
        // ingr.src = `../img/ikoner/${ingrediens}.png`
        // pizza.appendChild(ingr)

        if(nyPizza.length === kundePizza.length) {
            totalPizza++;
            const likt = kundePizza.every((v,i) => v === nyPizza[i])
            if(likt){
                points++    
                time += 3
                poeng.innerHTML = points
                lydWin.play();
            }else{
                poeng < 10? time - 2 <= 0? 0 : time -= 2 : time - 5 <= 0? 0 : time -= 5
                lydFail.play();
            }
            if(figurContainer.childNodes.length === 0){
                figurContainer.firstChild.className = 'figur-snakkebobble figur-ut'
                figurContainer.firstChild.firstChild.firstChild.className = 'snakkebobble snakkebobble-ut'
            }else{
                figurContainer.childNodes[totalPizza-1].className = 'figur-snakkebobble figur-ut'
                figurContainer.childNodes[totalPizza-1].childNodes[0].className = 'snakkebobble snakkebobble-ut'
            }
            // spillRes.innerHTML = likt? 'Du laget rett pizza' : 'Du laget feil pizza'
            nyPizza = []
            kundePizza = nyKunde() 
            pizza.innerHTML = ''
            // clearTimeout(pizzaTimeout)
        }
    }
}

var playKnapp, muteKnapp;
function initAudioPlayer(){

    playKnapp = document.getElementById("pause");
    muteKnapp = document.getElementById("mute");

    playKnapp.addEventListener("click",playPause);
    muteKnapp.addEventListener("click",mute);

    function playPause (){
     if(paused){
        musikk.play();
        paused = false;
        playKnapp.className = "ri-pause-circle-fill spill-knapp"
    } else  {
        musikk.pause();
        paused = true;
        playKnapp.className = "ri-play-fill spill-knapp"
     }

    }
    function mute (){
        if (musikk.muted){
            musikk.muted = false;
            musikk.play()
            muteKnapp.className = 'ri-volume-up-fill spill-knapp'
        } else {
            musikk.pause()
            musikk.muted = true;
            muteKnapp.className = 'ri-volume-mute-fill spill-knapp'
        } 
    }

}
window.addEventListener("load", initAudioPlayer);
