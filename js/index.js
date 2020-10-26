//initialize firebase

myLinks = [
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
];

firebase.initializeApp({
    apiKey: 'AIzaSyB9l86GgrlST_kNlUhVqLwAHXgE3Ljph8I',
    authDomain: 'basic-chat-3f218.firebaseapp.com',
    projectId: 'basic-chat-3f218',
});

var firestore = firebase.firestore();
const docRef = firestore.doc('samples/sandwichData'); //alternative way: call doc and specify path
const picRef = firestore.doc('samples/picture1');
const outputHeader = document.querySelector('#hotDogOutput');
const inputTextField = document.querySelector('#latestHotDogStatus');
const saveButton = document.querySelector('#saveButton');
const loadButton = document.querySelector('#loadButton');
const nextPicButton = document.querySelector('#nextPicButton');
const sentenceText = document.querySelector('.sentenceText');
const pictureShown = document.querySelector('.pictureShown');

saveButton.addEventListener('click', function () {
    const textToSave = inputTextField.value;
    console.log(textToSave);
    docRef
        .set({
            hotDogStatus: textToSave,
        })
        .then(function () {
            console.log('success');
        });
});

//it returns a promise, so we need to call back
//DOC that we pass in is a SNAPSHOT
loadButton.addEventListener('click', function () {
    docRef
        .get()
        .then(function (doc) {
            if (doc && doc.exists) {
                const myData = doc.data(); //extract the contents of the document as an object
                outputHeader.innerText = myData.hotDogStatus;
            }
        })
        .catch(function (error) {
            console.log('got an error' + error);
        });
});
//again, DOC is a snapshot, we pass it as an argument
const getRealtimeUpdates = function () {
    docRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data(); //extract the contents of the document as an object
            console.log(myData);
            outputHeader.innerText = myData.hotDogStatus;
            //sentenceText.innerText = myData.hotDogStatus;
        }
    });
};

getRealtimeUpdates();

//again, DOC is a snapshot, we pass it as an argument
let counter = 0;

function nextPicClick() {
    console.log(counter);
    if (counter <= myLinks.length - 1) {
        picRef.update({ myCounter: myLinks[counter] });
        picRef.onSnapshot(function (doc) {
            pictureShown.src = doc.data().myCounter;
        });
        counter++;
    } else {
        counter = 0;
    }
}

//instead of getting the links from the database,
//go through them here and upload the link to firestore

nextPicButton.addEventListener('click', nextPicClick);
nextPicClick();
