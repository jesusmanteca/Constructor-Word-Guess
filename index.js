var Word = require("./word.js");
var inquirer = require("inquirer");

// letters entry
var letterArray = ",.0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// List of words to choose from
var RickAndMorty = [
  "Rick Sanchez",
  "Morty Smith",
  "Jerry Smith",
  "Jerry C-137",
  "Summer Smith",
  "Summer C-137",
  "Beth Smith",
  "Beth C-137",
  "Beth Clone",
  "The Trans-Dimensional Council of Ricks",
  "Doofus Rick",
  "Cronenberg Rick",
  "Cronenberg Morty	",
  "Campaign Manager Morty",
  "Cop Rick",
  "Cop Morty",
  "Shadow Council of Ricks",
  "Rick D. Sanchez III",
  "Beth C-500A",
  "Jerry C-500A",
  "Mr. Meeseeks",
  "Scary Terry",
  "Dr. Xenon Bloom",
  "Birdperson",
  "Revolio Clockberg, Jr.",
  "Squanchy",
  "Abradolf Lincler",
  "Krombopulos Michael",
  "Unity",
  "Blim Blam the Klorblok",
  "Mr. Poopybutthole",
  "Arthricia",
  "Ants-In-My-Eyes Johnson",
  "Real Fake Doors salesman",
  "Glenn",
  "Gazorpazorpfield and Jon",
  "Tophat Jones",
  "Two Brothers",
  "Baby Legs and Regular Legs",
  "Mrs. Sullivan",
  "The Eyeholes Man",
  "Jan Michael Vincent",
  "Stealy",
  "Little Dipper",
  "Michael and Pichael Thompson",
  "Octopus Man",
  "Phillip Jacobs"
];

// Pick Random index from RickAndMorty array
var randomIndex = Math.floor(Math.random() * RickAndMorty.length);
var randomWord = RickAndMorty[randomIndex];

// Pass random word through Word constructor
var computerWord = new Word(randomWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

function theLogic() {
  // Generates new word for Word constructor if true
  if (requireNewWord) {
    // Selects random RickAndMorty array
    var randomIndex = Math.floor(Math.random() * RickAndMorty.length);
    var randomWord = RickAndMorty[randomIndex];

    // Passes random word through the Word constructor
    computerWord = new Word(randomWord);

    requireNewWord = false;
  }

  // TestS if a letter guessed is correct
  var wordComplete = [];
  computerWord.objArray.forEach(completeCheck);

  // letters remaining to be guessed
  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter between A-Z!",
          name: "userinput"
        }
      ])
      .then(function(input) {
        if (
          !letterArray.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log("\nPlease try again!\n");
          theLogic();
        } else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log("\nAlready Guessed or Nothing Entered\n");
            theLogic();
          } else {
            // Checks if guess is correct
            var wordCheckArray = [];

            computerWord.userGuess(input.userinput);

            // Checks if guess is correct
            computerWord.objArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log("\nIncorrect\n");

              incorrectLetters.push(input.userinput);
              guessesLeft--;
            } else {
              console.log("\nCorrect!\n");

              correctLetters.push(input.userinput);
            }

            computerWord.log();

            // Print guesses left
            console.log("Guesses Left: " + guessesLeft + "\n");

            // Print letters guessed already
            console.log(
              "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
            );

            // Guesses left
            if (guessesLeft > 0) {
              // Call function
              theLogic();
            } else {
              console.log("Sorry, you lose!\n");

              restartGame();
            }

            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log("YOU WIN!\n");

    restartGame();
  }

  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function restartGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to:",
        choices: ["Play Again", "Exit"],
        name: "restart"
      }
    ])
    .then(function(input) {
      if (input.restart === "Play Again") {
        requireNewWord = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        theLogic();
      } else {
        return;
      }
    });
}

theLogic();