//1. on load page:
	//generate random word, display blanks
//2. when user types a letter
	//check if remaining chances != 0
		//check if letter is part of random word
			//true: display letter to corresponding blank
			//false: count down remaining chances
	//else: gameover


var correctGuesses = 0;
var lettersGuessedSoFar = [];
var guessesLeft = 10;
var letters = ["a", "b", "c", "d", "e","f","g", "h", "i", "j", "k","l","m", "n", "o", "p", "q","r","s", "t", "u", "v", "w","x","y","z"];
var letterArr = [];
var words = ["rick", "daryl", "glenn", "maggie", "carl", "michonne", "carol", "morgan", "abraham", "sasha", "rosita", "eugene"];
var blanks = [];
var userWin = false;
var gameOver = false;

//when page loads
$(document).ready(function(){
	$("#theme-music").trigger('play');
	$("#clickToStart").on('click', function() {
        selectWord();
        console.log(letterArr);
        displayBlanks();
        console.log(blanks);
    }) 
})

//when user enters a key
 $(document).keyup(function() {
	var userInput = String.fromCharCode(event.keyCode).toLowerCase();

	//ensures letter from a to z is entered
	if(letters.includes(userInput) && guessesLeft != 0){
		for (i = 0; i < letterArr.length; i++){
			//letters from selected word is put in an array equals the letter typed
			if(letterArr[i] == userInput) {
				blanks[i] = userInput;
				$("#randomWord").text(blanks.join(''));
			}
		}
		if(letterArr.indexOf(userInput) == -1){
			lettersGuessedSoFar.push(userInput);
			$("#guessedArr").text(lettersGuessedSoFar);
			guessesLeft--;
			$("#guessesLeft").text(guessesLeft);
			console.log(guessesLeft);
		}
		isGameOver();
	}
})

//random word selection
function selectWord(){
	myWord = words[Math.floor(Math.random()*words.length)];
	letterArr = myWord.split('');
}

//displays '-' for each letter in the selected word array
function displayBlanks(){
	for (i = 0; i < letterArr.length; i++){
			blanks[i] = "-";
		}
		$("#randomWord").append(blanks);
}

//resets counters for next word
function next(){
	var randomWord;
	var gameOver = false;
	answerArray = [];
	guessesLeft = 10;
	blanks = [];	
}

//checks if game is over
function isGameOver(){
	if(guessesLeft == 0){
		gameOver = true;
		$("#walkerGrowl").trigger('play');
	}

}

//
function userGuessesAll(){

}


