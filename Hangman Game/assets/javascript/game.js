//1. on load page:
	//generate random word, display blanks
//2. when user types a letter
	//check if remaining chances != 0
		//check if letter is part of random word
			//true: display letter to corresponding blank
			//false: count down remaining chances
	//else: gameover

var points = 0;
var lettersGuessedSoFar = [];
var guessesLeft = 10;
var letters = ["a", "b", "c", "d", "e","f","g", "h", "i", "j", "k","l","m", "n", "o", "p", "q","r","s", "t", "u", "v", "w","x","y","z"];
var letterArr = [];
var words = ["rick", "daryl", "glenn", "maggie", "carl", "michonne", "carol", "morgan", "abraham", "sasha", "rosita", "eugene"];
var blanks = [];
var correctGuesses = [];
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
	if(letters.includes(userInput)){
		//game not over, user has guesses left
		if(!gameOver && words.length > 0){
			for (i = 0; i < letterArr.length; i++){
				//letters from selected word is put in an array equals the letter typed
				if(letterArr[i] == userInput) {
					blanks[i] = userInput;
					$("#randomWord").text(blanks.join(''));
					isGuessCorrect();
				}
			}
			//for every incorrect letter guessed, show in guessesLeft field and decrease guessesLeft counter
			if(letterArr.indexOf(userInput) == -1){
				lettersGuessedSoFar.push(userInput);
				$("#guessedArr").text(lettersGuessedSoFar);
				guessesLeft--;
				$("#guessesLeft").text(guessesLeft);
			}
			//checks if game is over
			isGameOver();

			//has user answered all
			isGameComplete();
		} 
		if(userWin) {
			nextWord();
			selectWord();
		}
			
	}
})

//random word selection
function selectWord(){
	if (words.length > 0){
		myWord = words[Math.floor(Math.random()*words.length)];
		letterArr = myWord.split('');
	}
}

//displays '-' for each letter in the selected word array
function displayBlanks(){
	for (i = 0; i < letterArr.length; i++){
			blanks[i] = "-";
		}
		$("#randomWord").append(blanks);
}

//resets counters for next word
function nextWord(){
	var gameOver = false;
	letterArr = [];
	guessesLeft = 10;
	blanks = [];
	selectWord();	
	displayBlanks();
}

//checks if game is over
function isGameOver(){
	if(guessesLeft == 0){
		gameOver = true;
		alert("You didn't save " + myWord.toUpperCase() + " from the walkers!");
		$("#walkerGrowl").trigger('play');
	}
}

//check if user guessed correct word
function isGuessCorrect(){
	if (blanks.indexOf("-") == -1) {
		points++;
		$("#escapedCount").text(points);
		userWin = true;
		correctGuesses.push(myWord);
		words.splice(words.indexOf(myWord),1); // omit myWords that have been used before
		
		nextWord();

		//need to cancel blur of myWord img
	}
}

function isGameComplete(){
	if(words.length == 0){
		userWin = true;
		//display winning img and audio
	}
}

function reset(){
	gameOver = false;
	userWin = false;
	points = 0;
	guessesLeft = 10;
	lettersGuessedSoFar = [];
	letterArr = null;
	blanks = [];
	$("#guessesLeft").text(guessesLeft);

	selectWord();
	displayBlanks();
}


