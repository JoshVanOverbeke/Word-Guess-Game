
const guesses=7;
let guessesLeft=0;
let score = 0;
let words=['lung', 'blood', 'seaweed', 'street', 'blunt', 'wasabi','snowman', 'foxyboi','dedede','salty','banned','jake','gordo', 'holy', 'trashman'];
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
    document.getElementById("hangmanimg").src = "assets/images/";
    for (let i = 0; i < words[curWord].length; i++) {
        gameWord.push(" _ ");
    };

    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

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
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        gameOver = true;
    }
};

function newHangmanImage() {
    document.getElementById("hangmanimg").src = "assets/images/" + (guesses - guessesLeft) + ".png";
};

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


        if (guessedLetters.indexOf(input) === -1) {
            guessedLetters.push(input);
            checkGuess(input);
        }
    }
    
    updateDisplay();
    ifWin();
};

function checkGuess(letter) {

    let positions = [];


    for (let i = 0; i < words[curWord].length; i++) {
        if(words[curWord][i] === letter) {
            positions.push(i);
        }
    }


    if (positions.length <= 0) {
        guessesLeft--;
        newHangmanImage();
    } else {

        for(let i = 0; i < positions.length; i++) {
            gameWord[positions[i]] = letter;
        }
    }
};

function ifWin() {
    if(gameWord.indexOf(" _ ") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        score++;
        gameOver = true;
    }
};
