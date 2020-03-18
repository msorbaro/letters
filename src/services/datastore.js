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

/** ****************************
ALL LETTER RELATED BE CALLS
**************************** */

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

/** ****************************
ALL QUESTION RELATED BE CALLS
**************************** */

// Adds a quesiton
export function addQuestion(question) {
  const questions = firebase.database().ref('Questions/');
  const agrees = 0;
  const disagrees = 0;
  const comments = [];
  questions.push({
    question, agrees, disagrees, comments,
  });
}


// if someone clicks agree for a question
export function increaseQuestionYes(questionID, callback) {
  database.ref(`Questions/${questionID}`).once('value').then((snapshot) => {
    const newState = snapshot.val().agrees + 1;
    const updates = { agrees: newState };
    const ref = database.ref(`Questions/${questionID}`);
    ref.update(updates);
    callback(newState);
  });
}

// if someone removes agree for a question
export function decreaseQuestionYes(questionID, callback) {
  database.ref(`Questions/${questionID}`).once('value').then((snapshot) => {
    const newState = snapshot.val().agrees - 1;
    const updates = { agrees: newState };
    const ref = database.ref(`Questions/${questionID}`);
    ref.update(updates);
    callback(newState);
  });
}

// adds a down vote
export function increaseQuestionNo(questionID, callback) {
  database.ref(`Questions/${questionID}`).once('value').then((snapshot) => {
    const newState = snapshot.val().disagrees + 1;
    const updates = { disagrees: newState };
    const ref = database.ref(`Questions/${questionID}`);
    ref.update(updates);
    callback(newState);
  });
}

// removes a disagree vote
export function decreaseQuestionNo(questionID, callback) {
  database.ref(`Questions/${questionID}`).once('value').then((snapshot) => {
    const newState = snapshot.val().disagrees - 1;
    const updates = { disagrees: newState };
    const ref = database.ref(`Questions/${questionID}`);
    ref.update(updates);
    callback(newState);
  });
}

/** ****************************
ALL COMMENT ON QUESTION RELATED BE CALLS
**************************** */
export function addComment(comment, questionID) {
  const questionComments = firebase.database().ref(`Questions/${questionID}/Comments`);
  const likes = 0;
  questionComments.push({
    comment, likes,
  });
}
