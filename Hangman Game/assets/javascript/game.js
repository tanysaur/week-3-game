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
var words = ["rick", "daryl", "glenn", "maggie", "carl", "michonne", "carol", "morgan", "abraham", "sasha", "rosita", "eugene", "judith", "enid", "spencer", "aaron", "tara", "jesus"];
var myWord = null;
var blanks = [];
var correctGuesses = [];
var userGuessedCorrect = false;
var gameOver = false;

//when page loads
$(document).ready(function(){
	//$("#theme-music").trigger('play');
        reset();
})

//when user enters a key
 $(document).keyup(function() {
	
	//game not over, user has guesses left
	if(!gameOver && !userGuessedCorrect && words.length > 0){
		var userInput = String.fromCharCode(event.keyCode).toLowerCase();

		for (i = 0; i < letterArr.length; i++){
			//letters from selected word is put in an array equals the letter typed
			if(letterArr[i] == userInput) {
				blanks[i] = userInput;
				$("#randomWord").text(blanks.join(''));
			}
		}
		isGuessCorrect();
	} 
	//for every incorrect letter guessed, show in guessesLeft field and decrease guessesLeft counter
	if(letters.includes(userInput) && letterArr.indexOf(userInput) == -1 && lettersGuessedSoFar.indexOf(userInput) == -1){
		lettersGuessedSoFar.push(userInput);
		$("#guessedArr").text(lettersGuessedSoFar);
		guessesLeft--;
		$("#guessesLeft").text(guessesLeft);
		console.log(guessesLeft);
	}
	//checks if game is over
	isGameOver();

	//has user answered / used up all words?
	isGameComplete();

	if(userGuessedCorrect) {
		nextWord();
	}
})

//resets counters for next word
function nextWord(){
	gameOver = false;
	letterArr = [];
	blanks = [];
	selectWord();	
	displayBlanks();
	lettersGuessedSoFar = [];
	$("#guessedArr").text(lettersGuessedSoFar);
	guessesLeft = 10;
	$("#guessesLeft").text(guessesLeft);
}

//random word selection
function selectWord(){

	if (words.length > 0){
		myWord = words[Math.floor(Math.random()*words.length)];
		letterArr = myWord.split(''); //delimiter
	}
	console.log(myWord);
}

//displays '-' for each letter in the selected word array
function displayBlanks(){
	for (i = 0; i < letterArr.length; i++){
			blanks[i] = "-";
		}
	$("#randomWord").html(blanks);
	console.log(blanks);
}



//checks if game is over
function isGameOver(){
	if(guessesLeft <= 0){
		$("#walkerGrowl").trigger('play');
		gameOver = true;
		alert("You didn't save " + myWord.toUpperCase() + " from the walkers!");
		var playAgain = confirm("Do you want to play again?");
		if (playAgain){
			reset();
		} else{
			$("#lizzie-freakout").trigger('play');
			//try modal images for pop-up walkers
		}
	}
}

//check if user guessed correct word
function isGuessCorrect(){
	if (blanks.indexOf("-") == -1) { //no '-' left. all letters exposed
		points++;
		$("#escapedCount").text(points);
		correctGuesses.push(myWord);
		console.log(myWord);
		//correct guess array is not empty
    	$("#" + myWord).addClass("blurOff");  //show image of guessed word
    	words.splice(words.indexOf(myWord),1); // omit myWords that have been used before			
    	console.log(words.length);		
		nextWord();
	}
}

//check if all words have been guessed
function isGameComplete(){
	if(words.length == 0){
		//display winning img and audio
		alert("You have saved them all!");
		//try modal images for pop-up walkers
	}
}


//for when user "tries again"
function reset(){
	gameOver = false;
	userGuessedCorrect = false;
	points = 0;
	$("#escapedCount").text(points);
	letterArr = null;
	blanks = [];
	lettersGuessedSoFar = [];
	$("#guessedArr").text(lettersGuessedSoFar);
	guessesLeft = 10;
	$("#guessesLeft").text(guessesLeft);
	var resetWords = ["rick", "daryl", "glenn", "maggie", "carl", "michonne", "carol", "morgan", "abraham", "sasha", "rosita", "eugene", "judith", "enid", "spencer", "aaron", "tara", "jesus"];
	words = resetWords;
	blurReset();
	selectWord();
	displayBlanks();
}

function blurReset() {
	
	for(var i = 0; i < words.length; i++) {
		$("#" + words[i]).removeClass("blurOff");
	}
}


// $('#musicBtn').toggle(
// 	function () {
// 		document.getElementById('theme-music').play();
// 	},
// 	function () {
// 	document.getElementById('theme-music').pause();
// 	}
// );
			

