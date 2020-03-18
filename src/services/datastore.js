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

// Get a reference to the database service
const database = firebase.database();


export function getLetters(callback) {
  database.ref('Letters').on('value', (snapshot) => {
    const newLettersState = snapshot.val();
    callback(newLettersState);
  });
}

export function addLetter(letter) {
  const letters = firebase.database().ref('Letters/');

  letters.push({ letter });
}
