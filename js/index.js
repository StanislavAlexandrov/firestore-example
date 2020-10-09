firebase.initializeApp({
    apiKey: 'AIzaSyB9l86GgrlST_kNlUhVqLwAHXgE3Ljph8I',
    authDomain: 'basic-chat-3f218.firebaseapp.com',
    projectId: 'basic-chat-3f218',
});

var db = firebase.firestore();

var cityRef = db.collection('users').doc('testv');

var usersDB = db.collection('users');

var textsDB = db.collection('texts');

var valueEl = document.getElementById('value');
let storedNumber;
let someOtherStoredNumber;
let count = 0;
const wordEvent = document.body.addEventListener('click', clickHandler);

document
    .getElementById('incrementButton')
    .addEventListener('click', function () {
        someOtherStoredNumber++;
        valueEl.innerHTML = someOtherStoredNumber;
        cityRef.set({
            value: someOtherStoredNumber,
        });
    });

document
    .getElementById('resetButton')
    .addEventListener('click', resetFunction());

buildButton = sentence => {
    const selectClickyWords = document.querySelector('.clickyWords');
    const newButton = document.createElement('button');
    newButton.setAttribute('class', 'btn btn-secondary btn-lg');
    usersDB.doc(sentence).onSnapshot(function (doc) {
        storedNumber = doc.data().word;
        // valueEl.innerHTML = storedNumber;
        newButton.setAttribute('wordn', storedNumber);
        newButton.textContent = storedNumber;
    });

    selectClickyWords.appendChild(newButton);
};

document.getElementById('textsButton').addEventListener('click', textsFunction);

function textsFunction() {
    db.collection('texts')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if (`${doc.data().shown}` == 'true') {
                    console.log('hit');
                    document.getElementById('textsButton').textContent = `${
                        doc.data().word
                    }`;
                } else {
                    document.getElementById('textsButton').textContent =
                        'not true';
                }

                console.log(`${doc.id} => ${doc.data().shown}`);
            });
        });
}

db.collection('texts').onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        document.getElementById('textsButton').textContent = doc.data().word;
    });
});

function resetFunction() {
    return function () {
        sentenceArray = ['hiiii', 'how', 'are', 'you'];
        sentenceShuffled = shuffle([...sentenceArray]);
        storedNumber = 0;
        count = 0;
        someOtherStoredNumber = 1212121;
        valueEl.innerHTML = someOtherStoredNumber;
        cityRef.set({
            value: someOtherStoredNumber,
        });
        const selectClickyWords = document.querySelector('.clickyWords');
        while (selectClickyWords.firstChild) {
            selectClickyWords.removeChild(selectClickyWords.firstChild);
        }

        sentenceShuffled.forEach(sentence => buildButton(sentence));
        for (let step = 0; step < sentenceArray.length; step++) {
            word = sentenceArray[step];
            db.collection('users')
                .doc(word.toString())
                .set({ word: word, index: step });
        }
    };
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// sentenceArray = ['hiiii', 'how', 'are', 'you'];
// sentenceShuffled = shuffle([...sentenceArray]);

sentenceShuffled.forEach(sentence => buildButton(sentence));
for (let step = 0; step < sentenceArray.length; step++) {
    word = sentenceArray[step];
    db.collection('users')
        .doc(word.toString())
        .set({ word: word, index: step });
}

function clickHandler(e) {
    let theWord = e.target.attributes.wordn.value;
    let selectClicky = document.querySelector('.clickyWords');

    if (theWord == sentenceArray[count]) {
        theWordString = theWord.toString();
        count++;
        let selectWord = document.querySelector('[wordn=' + theWord + ']');

        usersDB
            .doc(theWordString)
            .delete()
            .then(function () {
                console.log('Document successfully deleted!');
            })
            .catch(function (error) {
                console.error('Error removing document: ', error);
            });

        // storedNumber = doc.data().word;

        selectClicky.removeChild(selectWord);
    }
}
