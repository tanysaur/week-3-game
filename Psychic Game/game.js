
// initialize variables
var wins = 0;
var losses = 0;
var guessesSoFar = [];
var guessesLeft = 10;
var letterArr = ["a", "b", "c", "d", "e","f","g", "h", "i", "j", "k","l","m", "n", "o", "p", "q","r","s", "t", "u", "v", "w","x","y","z"];
var randomLetter = letterArr[Math.floor(Math.random() * letterArr.length)];


// function reset when user guesses the correct letter
function reset(){
	guessesSoFar = [];
	randomLetter = letterArr[Math.floor(Math.random() * letterArr.length)];
	guessesLeft = 10;
}

//when user types a letter...	
document.onkeyup = function(event) {

	var userInput = String.fromCharCode(event.keyCode).toLowerCase(); 
	console.log(randomLetter);
	// console.log(userInput);

// only letters from a to z entered & letter hasn't been guessed yet to run this if statement
	if(letterArr.includes(userInput) && !guessesSoFar.includes(userInput)){
	// when user guessed correctly
		if(userInput == randomLetter){
			wins++;
			reset();
		}
	// when user guessed incorrectly, log letter guessed
		else if(guessesLeft != 0) { 
			guessesSoFar.push(userInput);
			guessesLeft--;
			//console.log("Incorrect guess, try again!");
		} 
	// when user has no more guesses left, tally loss and prompt user if they want to play again
		else if(guessesLeft == 0){
			losses++;
			var gameOver = confirm("Game over! Try again?");
			// if user hits OK, reset game
			if(gameOver){
				reset();
			} 
			// otherwise, just display tally
			else{
				alert("Thanks for playing! You have " + wins + " correct guesses & " + losses + " incorrect guesses.");

			}
		}
	// live tallying of wins vs losses and letters guessed so far
		var html = "<h1>The Psychic Game!</h1>" + 
		"<p>Guess the letter I'm thinking of, only from 'a' to 'z'" +
		"<p>Wins: " + wins + "</p>" +
		"<p>Losses: " + losses + "</p>" +
		"<p>Guesses left: " + guessesLeft + "</p>" +
		"<p>Guesses so far: " + guessesSoFar +"</p>";

		document.querySelector("#game").innerHTML = html;
	} 
	// (optional) can also "alert" user if user did not choose a charter from a to z
	else {
		console.log("Letters from a to z only!");
	}
}

