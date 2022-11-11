import { getScores } from "./utils/firebase.js";

const registrerKnapp = document.querySelector('#registrer-bruker')
const navnInput = document.querySelector('#navn-input')

const highscores = document.querySelector('.highscores')
export let brukernavn 

const scores = await getScores()
scores.forEach(s=> {
    console.log(s);
    const scoreLI = document.createElement('li')
    const scoreContainer = document.createElement('div')
    scoreContainer.className = 'score-container'
    const name = document.createElement('p')
    const score = document.createElement('h5')
    name.innerHTML = s.username
    score.innerHTML = s.score
    scoreContainer.appendChild(name)
    scoreContainer.appendChild(score)
    scoreLI.appendChild(scoreContainer)
    highscores?.appendChild(scoreLI)
} )

registrerKnapp?.addEventListener('click', () => {
    localStorage.setItem('brukernavn',navnInput.value)
})
