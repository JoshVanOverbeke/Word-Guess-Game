
const guesses=7;
let guessesLeft=0;
let score = 0;
let words=['hello', 'forever', 'nice', 'green', 'flip'];
let guessedLetters=[];
let gameStarted=false;
let gameOver=false;
let curWord;
let gameWord=[];

function reset() {
    guessesLeft = guesses;
    gameStarted=false;
    curWord=Math.floor(Math.random() * (words.length));
    guessedLetters=[];
    gameWord=[];
    // document.getElementById("hangmanimg").src = "assets/images/";
    for (let i = 0; i < words[curWord].length; i++) {
        gameWord.push(" _ ");
    };

    // document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    // document.getElementById("gameover-image").style.cssText = "display: none";
    // document.getElementById("youwin-image").style.cssText = "display: none";

    updateDisplay();

};

function updateDisplay(){
    document.getElementById("winTotal").innerText = score;
    document.getElementById("currentWordbox").innerText = "";
    for (let i = 0; i < gameWord.length; i++) {
        document.getElementById("currentWordbox").innerText += gameWord[i];
    }
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(guessesLeft <= 0) {
        // document.getElementById("gameover-image").style.cssText = "display: block";
        // document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        gameOver = true;
    }
};

// function newHangmanImage() {
//     document.getElementById("hangmanimg").src = "assets/images/" + (guesses - guessesLeft) + ".jpg";
// };

document.onkeydown = function(event) {
    if(gameOver) {
        reset();
        gameOver = false;
    } 
    else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            aGuess(event.key.toLowerCase());
        }
    }
};

function aGuess(input) {
    if (guessesLeft > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(input) === -1) {
            guessedLetters.push(input);
            checkGuess(input);
        }
    }
    
    updateDisplay();
    ifWin();
};

function checkGuess(letter) {
    // Array to store positions of letters in string
    let positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (let i = 0; i < words[curWord].length; i++) {
        if(words[curWord][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        guessesLeft--;
        // newHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(let i = 0; i < positions.length; i++) {
            gameWord[positions[i]] = letter;
        }
    }
};

function ifWin() {
    if(gameWord.indexOf(" _ ") === -1) {
        // document.getElementById("youwin-image").style.cssText = "display: block";
        // document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        score++;
        gameOver = true;
    }
};
