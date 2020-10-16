//initialize firebase

myLinks = [
    'https://cdn.insidesport.co/wp-content/uploads/2020/10/07193932/fifa.jpg',
    'https://ewscripps.brightspotcdn.com/dims4/default/66f0dd8/2147483647/strip/true/crop/4500x2531+0+94/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2Fd8%2F66%2F88bb1d6c42baa55b461ea060923a%2Fap-27269865886.jpg',
    'https://www.worcester.gov.uk/images/easyblog_shared/2019/b2ap3_large_Football---carousel.jpg',
    'https://athlonsports.com/sites/athlonsports.com/files/collge_football_generic_2_DL.jpg',
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
