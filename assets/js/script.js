const TOTAL_LIVES = 10;
const NO_LIVES = 0;
const MAX_SCORE = 10;
let questionColor;
let boxColors;
let boxes = document.querySelectorAll(".box");
let lives = TOTAL_LIVES;
let score = 0;

function initialize() {
    for(let i=0; i<boxes.length; i++) {
        boxes[i].addEventListener('click', function() {
            checkColor(i)
        });
    }
}

function checkColor(i) {
    const boxColor = boxColors[i]
    if(boxColor.r === questionColor.r && boxColor.g === questionColor.g && boxColor.b === questionColor.b) {
        correctAnswer(i);
    } else {
        wrongAnswer(i);
    }
} 

function loadNewGame() {
    revealBoxes();
    questionColor = setColorQuestion();
    boxColors = [
        questionColor,
        generateColor(),
        generateColor(),
        generateColor(),
        generateColor(),
        generateColor(),
    ]

    boxColors = randomizeArray(boxColors);

    for(let i = 0; i< boxes.length; i++) {
        boxes[i].style.backgroundColor = colorToRGBString(boxColors[i]);
    }
}

// When the dom has finished loading the color question is set 
initialize();
loadNewGame();
/**
 * Generates a random interger between 0-255
 */

function getRandom255Int() {
    return Math.round(Math.random() * 255);
}
/**
 * Generates an object
 */

function generateColor() {
    return {
        r: getRandom255Int(),
        g: getRandom255Int(),
        b: getRandom255Int(),
    }
}
/**
 * Puts the object into a string in the format r,g,b
 */

function colorToRGBString(color) {
    return "RGB(" + color.r + ", " + color.g + ", " + color.b + ")";
}

/** 
 * Generates the inital random color by 
 * calling generateColor() and then sets 
 * my h2 span to the random color generated
 */
function setColorQuestion () {
    const color = generateColor();
    const rgbString = colorToRGBString(color);
    document.getElementById("question-color").innerText = rgbString;
    return color;
}

/**
 * A function to randomise an arrary found on stack overflow.
 */
function randomizeArray(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {      
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
      
    return array;
}

function correctAnswer () {
    setScore(score + 1);
    alert('You won!!!!');
    if(score === MAX_SCORE) {
        userWins();
        // render some winning text with the score
    } else {
        loadNewGame();
    }
}

function wrongAnswer(i) {
    setLives(lives - 1);
    alert('Wrong answer');
    if(lives === NO_LIVES) {
        gameOver();
    } else {
        const box = document.getElementsByClassName("box")[i];
        hideBox(box);
    }
}

function hideBox(box){
    box.classList.add("fade-out");
}

function hideAllBoxes() {
    const boxesToHide = document.querySelectorAll(".box:not(.fade-out)");
    for (let i = 0; i < boxesToHide.length; i++) {
        const boxToHide = boxesToHide[i];
        hideBox(boxToHide);
    }
}

function setScore(newScore) {
    score = newScore;
    document.getElementById("score").innerHTML = score;
}

function setLives(newLives) {
    lives = newLives;
    document.getElementById("lives").innerHTML = lives;
}

document.getElementById("top-btn").addEventListener('click', function() {
    reset()
 })


 function reset() {
    loadNewGame();
    setScore(0);
    setLives(10);
    revealBoxes();
    const gameOverWrapper = document.getElementsByClassName("game-over-wrapper")[0];
    gameOverWrapper.classList.remove("game-over-show-wrapper")
 }

 function revealBoxes() {
    const hiddenBoxes = document.querySelectorAll(".box.fade-out");
    console.log(hiddenBoxes);
    for(let i = 0; i < hiddenBoxes.length; i++) {
        const hiddenBox = hiddenBoxes[i];
        hiddenBox.classList.remove("fade-out");
    }
 }

function gameOver() {
    hideAllBoxes();
    const gameOverWrapper = document.getElementsByClassName("game-over-wrapper")[0];
    gameOverWrapper.classList.add("game-over-show-wrapper");
    document.getElementById("final-score").innerHTML = score;
}

function userWins() {
    hideAllBoxes();
    const youWinWrapper = document.getElementsByClassName("you-win-wrapper")[0];
    youWinWrapper.classList.add("you-win-show-wrapper");
    document.getElementById("lives-remaining").innerHTML = lives;

}
