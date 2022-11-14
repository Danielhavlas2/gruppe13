import ShortUniqueId from 'https://esm.sh/short-unique-id';

const firebaseConfig = {
    apiKey: "AIzaSyCi319wgxZLuLs53N9-IqvHf75QSzJTgxM",
    authDomain: "gruppe13-spill.firebaseapp.com",
    projectId: "gruppe13-spill",
    storageBucket: "gruppe13-spill.appspot.com",
    messagingSenderId: "192305317531",
    appId: "1:192305317531:web:ebeb5e084f5130633be83e"
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const randomKey = new ShortUniqueId({length: 12});

export const uploadScore = async (username, score) => {
    await firestore.collection('game').doc('scores').update({[randomKey()]: {username, score}});
}

export const getScores = async () => {
    const doc = await firestore.collection('game').doc('scores').get();
    const data = doc.data();
    const sortedData = Object.values(data).sort((a,b) => b.score - a.score).splice(0,5);
    return sortedData;
}