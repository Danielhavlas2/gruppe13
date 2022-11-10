import { signInGuest, uploadScore, getScores } from "./utils/firebase.js";

const registrerKnapp = document.querySelector('#registrer-bruker')
const registrer = document.querySelector('#registrer-bruke')
const regis = document.querySelector('#registrer-brke')

const highscores = document.querySelector('#highscores')


registrerKnapp.addEventListener('click', signInGuest)
registrer.addEventListener('click', () => uploadScore('basfsa',6))
regis.addEventListener('click', async () => {
    const scores = await getScores()
    scores.forEach(s => {
        console.log(s);
        const scoreContainer = document.createElement('li')
        scoreContainer.className = 'score'
        const name = document.createElement('p')
        const score = document.createElement('p')
        name.innerHTML = s.username
        score.innerHTML = s.score
        scoreContainer.appendChild(name)
        scoreContainer.appendChild(score)
        highscores.appendChild(scoreContainer)
    } )
})