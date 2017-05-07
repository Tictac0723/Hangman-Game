

var challenges=["Tina", "Louise", "Gene", "Linda", "Bob"];
var challenge= null;
var word = null;

window.onload = function() {
    challenge=getRandomChallenge();
    word = document.getElementById("word");
};

function getRandomChallenge() {
	var randomInt=Math.floor((Math.random()*challenges.length) +1);
	return challenges[randomInt-1];
}

document.onkeyup = function(e) {
            if (challenge.includes(e.key)) {
            	word.textContent=e.key;
            }

            console.log(word)
        };
