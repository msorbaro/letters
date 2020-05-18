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

// returns all the letters as json objects
export function getLetters(callback) {
  database.ref('Letters').on('value', (snapshot) => {
    const newLettersState = snapshot.val();
    callback(newLettersState);
  });
}

// adds a letter to the database under 'Letters'
export function addLetter(letter, title, username, date, userID) {
  const letters = firebase.database().ref('Letters/');
  const author = username;
  const authorID = userID;
  letters.push({
    letter, title, author, date, authorID,
  });
}

// returns either a 0 (if user's ID is not stored under "likes")
// or 1 (if user's ID is stored under "likes")
export function getLikeStatus(letterID, userID, callback) {
  const ref = firebase.database().ref(`Letters/${letterID}/likes`);
  ref.orderByValue().equalTo(userID).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// counts number of children under "likes" of specific letter
export function getLikes(letterID, callback) {
  database.ref(`Letters/${letterID}/`).child('likes').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// adds user ID to list of likes on letter, ending with callback
// with updated number of likes for that letter
export function increaseLetterScore(letterID, userID, callback) {
  firebase.database().ref(`Letters/${letterID}/likes/`).child(userID).set(userID);

  database.ref(`Letters/${letterID}/`).child('likes').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// removes user ID from list of likes on letter, ending with callback
// with updated number of likes for that letter
export function decreaseLetterScore(letterID, userID, callback) {
  firebase.database().ref(`Letters/${letterID}/likes/`).child(userID).remove();

  database.ref(`Letters/${letterID}/`).child('likes').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// removes a letter if called by author
export function deleteLetter(letterID) {
  firebase.database().ref('Letters/').child(letterID).remove();
}


/** ****************************
ALL QUESTION RELATED BE CALLS
**************************** */

// returns all the questions as json objects
export function getQuesions(callback) {
  database.ref('Questions').on('value', (snapshot) => {
    const newQuestionsState = snapshot.val();
    callback(newQuestionsState);
  });
}

// adds a letter to the database under 'Questions'
export function addQuestion(question, userID, username) {
  const questions = firebase.database().ref('Questions/');
  const comments = [];
  const authorID = userID;
  const author = username;
  questions.push({
    question, comments, authorID, author,
  });
}

// adds user ID to list of agrees on question, ending with callback
// with updated number of agrees for that question
export function increaseQuestionYes(questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/agrees/`).child(userID).set(userID);

  database.ref(`Questions/${questionID}/`).child('agrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// removes user ID from list of agrees on question, ending with callback
// with updated number of agrees for that question
export function decreaseQuestionYes(questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/agrees/`).child(userID).remove();

  database.ref(`Questions/${questionID}/`).child('agrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// adds user ID to list of disagrees on question, ending with callback
// with updated number of disagrees for that question
export function increaseQuestionNo(questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/disagrees/`).child(userID).set(userID);

  database.ref(`Questions/${questionID}/`).child('disagrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// removes user ID from list of disagrees on question, ending with callback
// with updated number of disagrees for that question
export function decreaseQuestionNo(questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/disagrees/`).child(userID).remove();

  database.ref(`Questions/${questionID}/`).child('disagrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// counts number of children under "agrees" of specific question
export function getQuestionAgrees(questionID, callback) {
  database.ref(`Questions/${questionID}/`).child('agrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// counts number of children under "disagrees" of specific question
export function getQuestionDisagrees(questionID, callback) {
  database.ref(`Questions/${questionID}/`).child('disagrees').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// returns either a 0 (if user's ID is not stored under "agrees")
// or 1 (if user's ID is stored under "agrees")
export function getYourQuestionAgrees(questionID, userID, callback) {
  const ref = firebase.database().ref(`Questions/${questionID}/agrees`);
  ref.orderByValue().equalTo(userID).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// returns either a 0 (if user's ID is not stored under "disagrees")
// or 1 (if user's ID is stored under "disagrees")
export function getYourQuestionDisagrees(questionID, userID, callback) {
  const ref = firebase.database().ref(`Questions/${questionID}/disagrees`);
  ref.orderByValue().equalTo(userID).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// removes a question if called by author
export function deleteQuestion(questionID) {
  firebase.database().ref('Questions/').child(questionID).remove();
}

/** ****************************
ALL COMMENT ON QUESTION RELATED BE CALLS
**************************** */

// returns all the comments of a specific question as json objects
export function getComments(questionID, callback) {
  database.ref(`Questions/${questionID}/Comments/`).on('value', (snapshot) => {
    const newCommentState = snapshot.val();
    callback(newCommentState);
  });
}

// adds a comment to the database under the comments section of a specific question
export function addComment(comment, author, authorID, questionID, date, callback) {
  const questionComments = firebase.database().ref(`Questions/${questionID}/Comments`);
  questionComments.push({
    comment, date, author, authorID,
  });

  database.ref(`Questions/${questionID}/Comments/`).on('value', (snapshot) => {
    const newCommentState = snapshot.val();
    callback(newCommentState);
  });
}

// adds user ID to list of likes on comment, ending with callback
// with updated number of likes for that comment
export function likeComment(commentID, questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/Comments/${commentID}/likes`).child(userID).set(userID);

  database.ref(`Questions/${questionID}/Comments/${commentID}/likes`).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// removes user ID from list of likes on comment, ending with callback
// with updated number of likes for that comment
export function unlikeComment(commentID, questionID, userID, callback) {
  firebase.database().ref(`Questions/${questionID}/Comments/${commentID}/likes`).child(userID).remove();

  database.ref(`Questions/${questionID}/Comments/${commentID}/likes`).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// counts number of children under "likes" of specific comment
export function getCommentLikes(questionID, commentID, callback) {
  database.ref(`Questions/${questionID}/Comments/${commentID}`).child('likes').on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// returns either a 0 (if user's ID is not stored under "likes")
// or 1 (if user's ID is stored under "likes")
export function getCommentStatus(questionID, commentID, userID, callback) {
  const ref = firebase.database().ref(`Questions/${questionID}/Comments/${commentID}/likes`);
  ref.orderByValue().equalTo(userID).on('value', (snapshot) => {
    callback(snapshot.numChildren());
  });
}

// removes a comment if called by author
export function deleteComment(questionID, commentID) {
  firebase.database().ref(`Questions/${questionID}/Comments/`).child(commentID).remove();
}
