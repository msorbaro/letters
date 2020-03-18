import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDnES4zQeDleQNpZDudsFZib7Yi7QfdSGQ',
  authDomain: 'studentopinions-bca88.firebaseapp.com',
  databaseURL: 'https://studentopinions-bca88.firebaseio.com',
  projectId: 'studentopinions-bca88',
  storageBucket: 'studentopinions-bca88.appspot.com',
  messagingSenderId: '345769219548',
  appId: '1:345769219548:web:15701c37c0246b3ea6ab19',
  measurementId: 'G-0RKWXKEX74',
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


// returns all the letters
export function getLetters(callback) {
  database.ref('Letters').on('value', (snapshot) => {
    const newLettersState = snapshot.val();
    callback(newLettersState);
  });
}

// adds a letter
export function addLetter(letter) {
  const letters = firebase.database().ref('Letters/');
  const score = 0;
  letters.push({ letter, score });
}

// adds a like to the letter
export function increaseLetterScore(letterID, callback) {
  database.ref(`Letters/${letterID}`).once('value').then((snapshot) => {
    const newState = snapshot.val().score + 1;
    const updates = { score: newState };
    const ref = database.ref(`Letters/${letterID}`);
    ref.update(updates);
    callback(newState);
  });
}

// removes a like from the letter
export function decreaseLetterScore(letterID, callback) {
  database.ref(`Letters/${letterID}`).once('value').then((snapshot) => {
    const newState = snapshot.val().score - 1;
    const updates = { score: newState };
    const ref = database.ref(`Letters/${letterID}`);
    ref.update(updates);
    callback(newState);
  });
}
