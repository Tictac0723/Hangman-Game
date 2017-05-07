var winImage = null;
var winAudio = null;
var imgLocation = "assets/images/";
var audioLocation = "assets/javascript/";
var images = [imgLocation + "tina.jpg", imgLocation + "bob.jpg", imgLocation + "linda.jpg", imgLocation + "gene.jpg", imgLocation + "louise.jpg"];
var audio = [audioLocation + "tina.mp3", audioLocation + "bob.mp3", audioLocation + "linda.mp3", audioLocation + "gene.mp3", audioLocation + "louise.mp3"];
var challenges = null;
var challenge = null;
var word = null;
var exposedChallenge = null;
var guessesRemaining = 5;
var textGuessesRemaining = null;
var wrongLetters = "";
var textWrongLetters = null;
var score = 0;
var textScore = null;
window.onload = function() {
    gameSetup();
};

function gameSetup() {
    challenges = ["tina", "bob", "linda", "gene", "louise"];
    challenge = null;
    word = null;
    exposedChallenge = null;
    guessesRemaining = 5;
    wrongLetters = "";
    textScore = document.getElementById("wins");
    textWrongLetters = document.getElementById("wrong");
    textGuessesRemaining = document.getElementById("guessremaining");
    textWrongLetters.textContent = wrongLetters;
    textGuessesRemaining.textContent = guessesRemaining;
    challenge = getRandomChallenge();
    word = document.getElementById("word");
    for (var i = 0; i < challenge.length; i++) {
        if (exposedChallenge === null) {
            exposedChallenge = "_";
        } else {
            exposedChallenge = exposedChallenge + "_";
        }
    }
    word.textContent = exposedChallenge;
}

function getRandomChallenge() {
    var randomInt = Math.floor((Math.random() * challenges.length) + 1);
    var index = randomInt - 1;
    winImage = images[index];
    winAudio = new Audio(audio[index]);
    return challenges[index];
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}
document.onkeyup = function(e) {
    if (guessesRemaining != 0) {
        var character = e.key;
        if (challenge.includes(character)) {
            for (i = 0; i < challenge.length; i++) {
                var challengeCharacter = challenge.charAt(i);
                if (challengeCharacter === character) {
                    exposedChallenge = setCharAt(exposedChallenge, i, character);
                }
            }
            if (exposedChallenge === challenge) {
                score = score + 1;
                textScore.textContent = score;
                displayNewImage();
                playSound();
                gameSetup();
            }
            word.textContent = exposedChallenge;
        } else {
            guessesRemaining = guessesRemaining - 1;
            textGuessesRemaining.textContent = guessesRemaining;
            if (guessesRemaining === 0) {
                textGuessesRemaining.textContent = "Burger Luck Next Time!";
                gameSetup();
            } else if (wrongLetters.indexOf(character) === -1) {
                wrongLetters = wrongLetters + character;
                textWrongLetters.textContent = wrongLetters;
            }
        }
    }
};

function displayNewImage() {
    img = document.getElementById("family");
    img.src = winImage
}

function playSound() {
    winAudio.play();
}
