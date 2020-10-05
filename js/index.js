firebase.initializeApp({
    apiKey: 'AIzaSyB9l86GgrlST_kNlUhVqLwAHXgE3Ljph8I',
    authDomain: 'basic-chat-3f218.firebaseapp.com',
    projectId: 'basic-chat-3f218',
});

var db = firebase.firestore();

var cityRef = db.collection('users').doc('testv');

var valueEl = document.getElementById('value');
let storedNumber = 2;

db.collection('users')
    .doc('testv')
    .onSnapshot(function (doc) {
        console.log('Current data: ', doc.data());
        storedNumber = doc.data().value;
    });

/* function getValues(collectionName, docName) {
    return db
        .collection(collectionName)
        .doc(docName)
        .get()
        .then(function (doc) {
            if (doc.exists) {
                valueEl.innerHTML = doc.data().value;
            }
            return Promise.reject('No such document');
        });
} */

document.getElementById('increment').addEventListener('click', function () {
    storedNumber++;
    valueEl.innerHTML = storedNumber;
    cityRef.set({
        value: storedNumber,
    });
});
