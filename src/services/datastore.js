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
export function addLetter(letter, title, username) {
  const letters = firebase.database().ref('Letters/');
  const author = username;
  letters.push({
    letter, title, author,
  });
}

// adds a letter
export function getLikeStatus(letterID, userID, callback) {
  const ref = firebase.database().ref(`Letters/${letterID}/likes`);
  ref.orderByValue().equalTo(userID).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// gets the number of likes the letter has
export function getLikes(letterID, callback) {
  database.ref(`Letters/${letterID}/`).child('likes').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// adds a like to the letter
export function increaseLetterScore(letterID, userID, callback) {
  firebase.database().ref(`Letters/${letterID}/likes/`).child(userID).set(userID);

  database.ref(`Letters/${letterID}/`).child('likes').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// removes a like from the letter
export function decreaseLetterScore(letterID, userID, callback) {
  firebase.database().ref(`Letters/${letterID}/likes/`).child(userID).remove();

  database.ref(`Letters/${letterID}/`).child('likes').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

/** ****************************
ALL QUESTION RELATED BE CALLS
**************************** */
export function getQuesions(callback) {
  database.ref('Questions').on('value', (snapshot) => {
    const newQuestionsState = snapshot.val();
    callback(newQuestionsState);
  });
}

// Adds a quesiton
export function addQuestion(question) {
  const questions = firebase.database().ref('Questions/');
  const comments = [];
  questions.push({
    question, comments,
  });
}


// if someone clicks agree for a question
export function increaseQuestionYes(questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/agrees/`).child(userID).set(userID);

  database.ref(`Questions/${questionID}/`).child('agrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// if someone removes agree for a question
export function decreaseQuestionYes(questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/agrees/`).child(userID).remove();

  database.ref(`Questions/${questionID}/`).child('agrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// adds a down vote
export function increaseQuestionNo(questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/disagrees/`).child(userID).set(userID);

  database.ref(`Questions/${questionID}/`).child('disagrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// removes a disagree vote
export function decreaseQuestionNo(questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/disagrees/`).child(userID).remove();

  database.ref(`Questions/${questionID}/`).child('disagrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// gets the number of likes the letter has
export function getQuestionAgrees(questionID, callback) {
  database.ref(`Questions/${questionID}/`).child('agrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// gets the number of likes the letter has
export function getQuestionDisagrees(questionID, callback) {
  database.ref(`Questions/${questionID}/`).child('disagrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// gets the number of likes the letter has
export function getYourQuestionAgrees(questionID, userID, callback) {
  const ref = firebase.database().ref(`Questions/${questionID}/agrees`);
  ref.orderByValue().equalTo(userID).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// gets the number of likes the letter has
export function getYourQuestionDisagrees(questionID, userID, callback) {
  const ref = firebase.database().ref(`Questions/${questionID}/disagrees`);
  ref.orderByValue().equalTo(userID).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

/** ****************************
ALL COMMENT ON QUESTION RELATED BE CALLS
**************************** */

export function getComments(questionID, callback) {
  database.ref(`Questions/${questionID}/Comments/`).on('value', (snapshot) => {
    const newCommentState = snapshot.val();
    callback(newCommentState);
  });
}

export function addComment(comment, questionID) {
  const questionComments = firebase.database().ref(`Questions/${questionID}/Comments`);
  questionComments.push({
    comment,
  });
}

export function likeComment(commentID, questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/Comments/${commentID}/likes`).child(userID).set(userID);

  database.ref(`Questions/${questionID}/Comments/${commentID}/likes`).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

export function unlikeComment(commentID, questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/Comments/${commentID}/likes`).child(userID).remove();

  database.ref(`Questions/${questionID}/Comments/${commentID}/likes`).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}
