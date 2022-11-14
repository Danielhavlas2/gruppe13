import {musikk, lydWin, lydFail, lydTimeOut} from './utils/lyd.js';
import {nyKunde, lagKnapper} from './utils/funksjoner.js';
import { uploadScore } from './utils/firebase.js';
;
const startKnapp = document.querySelector('#start-spill');
const restartKnapp = document.querySelector('#restart-spill');
const timer = document.querySelector('.timer-text');
const timerBar = document.querySelector('.timer-bar');
const poeng = document.querySelector('.poeng');
const spillContainer = document.querySelector('.spill-container');
const figurContainer = document.querySelector('.figur-container');
const kundePizzaE = document.querySelector('#kundePizza');
const gameOverModal = document.querySelector('.game-over');
const spillRes = document.querySelector('#spill-res');
const pizza = document.querySelector('#pizza');
;
lagKnapper(lagPizza);
startKnapp.onclick = startSpill;
;
let nyPizza = [];
let kundePizza = [];
;
const startTime = 30;
let time = startTime;
timer.innerHTML = time;
;
let brukernavn = localStorage.getItem('brukernavn');
let points = 0;
let totalPizza = 0;
poeng.innerHTML = points;
;
let paused = false;

function startSpill() {
    points = 0;
    totalPizza = 0;
    if(!musikk.muted){
        musikk.play();
    }
    figurContainer.innerHTML = '';
    startKnapp.style.display = 'none';
    time = startTime;
    nyPizza = [];
    kundePizza = nyKunde();
    const spillTimer =  setInterval( () => {
        console.log(paused);
        if(!paused){
            time -= 1; 
        }
        timer.innerHTML = time;

        timerBar.style.transform = `scaleX(${time === 0? 0 : (time / startTime)-1/30})`;

        if (time <= 0) {
            clearInterval(spillTimer);
            musikk.stop();
            if(figurContainer.childNodes.length === 0){
                figurContainer.firstChild.className = 'figur-snakkebobble figur-ut';
                figurContainer.firstChild.firstChild.firstChild.className = 'snakkebobble snakkebobble-ut';
            }else{
                figurContainer.childNodes[totalPizza-1].className = 'figur-snakkebobble figur-ut';
                figurContainer.childNodes[totalPizza-1].childNodes[0].className = 'snakkebobble snakkebobble-ut';
            }
            gameOverModal.className = 'game-over game-over-inn';
            if(!brukernavn ){
                const randNum = Math.ceil(Math.random() * 100);
                brukernavn = `Big_Chungus${randNum}`;
            }
            uploadScore(brukernavn, points)
            restartKnapp.onclick = () => {
                gameOverModal.className = 'game-over';
                startSpill();
            }
            spillRes.innerHTML = `Tida er ute. Du lagde ${points} pizza.`;
            lydTimeOut.play()
        }  
    }, 1000);

}


function lagPizza(ingrediens) {
    if(time > 0 && !paused){
        nyPizza.push(ingrediens);

        if(nyPizza.length === kundePizza.length) {
            totalPizza++;
            const likt = kundePizza.every((v,i) => v === nyPizza[i])
            if(likt){
                points++;
                time += 3;
                poeng.innerHTML = points;
                lydWin.play();
            }else{
                points < 10? time - 2 <= 0? 0 : time -= 2 : time - 5 <= 0? 0 : time -= 5;
                lydFail.play();
            }
            if(figurContainer.childNodes.length === 0){
                figurContainer.firstChild.className = 'figur-snakkebobble figur-ut';
                figurContainer.firstChild.firstChild.firstChild.className = 'snakkebobble snakkebobble-ut';
            }else{
                figurContainer.childNodes[totalPizza-1].className = 'figur-snakkebobble figur-ut';
                figurContainer.childNodes[totalPizza-1].childNodes[0].className = 'snakkebobble snakkebobble-ut';
            }
            nyPizza = [];
            kundePizza = nyKunde();
            pizza.innerHTML = '';
        }
    }
}

    const playKnapp = document.getElementById("pause");
    const muteKnapp = document.getElementById("mute");

    playKnapp.addEventListener("click",playPause);
    muteKnapp.addEventListener("click",mute);

    function playPause (){
     if(paused){
        paused = false;
        mute();
        playKnapp.className = "ri-pause-circle-fill spill-knapp";
    } else  {
        paused = true;
        mute();
        playKnapp.className = "ri-play-fill spill-knapp";
     }

    }
    function mute (){
        if (musikk.muted){
            musikk.muted = false;
            musikk.play();
            muteKnapp.className = 'ri-volume-up-fill spill-knapp';
        } else {
            musikk.pause()
            musikk.muted = true;
            muteKnapp.className = 'ri-volume-mute-fill spill-knapp';
        } 
    }

