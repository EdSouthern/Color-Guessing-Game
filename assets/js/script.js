/** Setting of global varaibles for my game, includes setting
 * the maximum score, number of lives and starting score.
 **/
const TOTAL_LIVES = 2;
const NO_LIVES = 0;
const MAX_SCORE = 10;
let questionColor;
let boxColors;
let boxes = document.getElementsByClassName("box");
let lives = TOTAL_LIVES;
let score = 0;

/** Adds an event listner to the boxes so user is able 
 * to click them.
 */
function initialize() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', function () {
            checkColor(i)
        });
    }
}
/** Checks the colour the user has selected and runs the appropriate function
 * depending on wether they are correct or incorrect.
 */
function checkColor(i) {
    const boxColor = boxColors[i]
    if (boxColor.r === questionColor.r && boxColor.g === questionColor.g && boxColor.b === questionColor.b) {
        correctAnswer(i);
    } else {
        wrongAnswer(i);
    }
}
/** Loads a new game by showing all the hidden boxes, as well as 
 * generating 5 random colours and putting them into an array with 
 * the already generated question colour. A for loop is then used to 
 * color all of the boxes from my box color array.
 */
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

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = colorToRGBString(boxColors[i]);
    }
}

/** When the dom has finished both the initalize and loadNewGame functions 
 * are run to ensure the user can start playing the game. 
 */
initialize();
loadNewGame();

/** Generates a random integer between 0-255
 */
function getRandom255Int() {
    return Math.round(Math.random() * 255);
}

/** Generates an object with the keys r, g and b
 */
function generateColor() {
    return {
        r: getRandom255Int(),
        g: getRandom255Int(),
        b: getRandom255Int(),
    }
}

/** Puts the object into a string in the format r,g,b
 */
function colorToRGBString(color) {
    return "RGB(" + color.r + ", " + color.g + ", " + color.b + ")";
}

/** Generates the initial random color by
 * calling generateColor() and then sets
 * my h2 inner text to the random color generated
 */
function setColorQuestion() {
    const color = generateColor();
    document.getElementById("question-color").innerText = colorToRGBString(color);
    return color;
}

/** A function to randomise an array found on stack overflow
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function randomizeArray(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

/** If the user selects the right box, score is increased by 1
 * an alert will pop up and if the user has reached the max score
 * of 10 to win the game, the game will end if not a new set of colors
 * will load for the next round.
 */
function correctAnswer() {
    setScore(score + 1);
    alert('Well done correct answer');
    if (score === MAX_SCORE) {
        userWins();
    } else {
        loadNewGame();
    }
}

/** If the user selects the wrong box, lives get subtracted by 1
 * an alert of wrong answer will appear and if they user has no 
 * lives remaining the game is over, otherwise the box will be hidden
*/
function wrongAnswer(i) {
    setLives(lives - 1);
    alert('Wrong answer');
    if (lives === NO_LIVES) {
        gameOver();
    } else {
        const box = document.getElementsByClassName("box")[i];
        hideBox(box);
    }
}

/** Hides a box by adding a class list of fade-out 
*/
function hideBox(box) {
    box.style.display = 'none';
    box.classList.add("fade-out");
}

/** Hides every box by finding boxes without the 
 * fade-out class already applied 
 */
function hideAllBoxes() {
    const boxesToHide = document.querySelectorAll(".box:not(.fade-out)");
    for (let i = 0; i < boxesToHide.length; i++) {
        const boxToHide = boxesToHide[i];
        hideBox(boxToHide);
    }
}

/** Resets score to inital value
*/
function setScore(newScore) {
    score = newScore;
    document.getElementById("score").innerHTML = score;
}

/** Resets lives to inital value 
*/
function setLives(newLives) {
    lives = newLives;
    document.getElementById("lives").innerHTML = lives;
}

//Adds event listener for the reset button
document.getElementById("top-btn").addEventListener('click', function () {
    reset()
})

/** Resets the game by calling loadNewGame as well as setting lives 
 * and score back to inital values. It will also show any hidden boxes
 * as well as hidding any game over or game winning text applied by 
 * removing the css assocated with these.
 */
function reset() {
    loadNewGame();
    setScore(0);
    setLives(10);
    revealBoxes();
    const gameOverWrapper = document.getElementsByClassName("game-over-wrapper")[0];
    gameOverWrapper.classList.remove("game-over-show-wrapper")
    const youWinWrapper = document.getElementsByClassName("you-win-wrapper")[0];
    gameOverWrapper.classList.remove("you-win-show-wrapper")
}

/** Reveals any box that has been hidden by
 * removing the fade-out class applied to them.
 */
function revealBoxes() {
    const hiddenBoxes = document.querySelectorAll(".box.fade-out");
    for (let i = 0; i < hiddenBoxes.length; i++) {
        const hiddenBox = hiddenBoxes[i];
        hiddenBox.style.display = 'block';
        hiddenBox.classList.remove("fade-out");
    }
}
/** When the user loses the game by using
 * all 10 lives, it will hide all boxes making room for some game over text 
 * with the users final score to render
 */
function gameOver() {
    hideAllBoxes();
    const gameOverWrapper = document.getElementsByClassName("game-over-wrapper")[0];
    gameOverWrapper.classList.add("game-over-show-wrapper");
    document.getElementById("final-score").innerHTML = score.toString();
    const formWrapper = document.getElementsByClassName("form-wrapper");
    formWrapper.classList.add("form-show-wrapper");
    sendMail();
}
/** When the user wins the game by getting
 * 10 correct answers. It will hide all the boxes and render some winning text
 * with the final score.
 */ 
function userWins() {
    hideAllBoxes();
    const youWinWrapper = document.getElementsByClassName("you-win-wrapper")[0];
    youWinWrapper.classList.add("you-win-show-wrapper");
    document.getElementById("lives-remaining").innerHTML = lives.toString();
    const formWrapper = document.getElementsByClassName("form-wrapper");
    formWrapper.classList.add("form-show-wrapper");
    sendMail();
}

(function () {
    emailjs.init("user_tFd9SVDE5e3FDioAW8cdV");
})();

function sendMail() {
    let userEmail = document.getElementById("email").value;
    let userScore = document.getElementById("final-score").innerHTML

    var contactParams = {
        userEmail,
        userScore
    };

    emailjs.send("service_7ztzjoa", "template_x78j718", contactParams).
    then(function (res) {
        // email sent (update html to say email sent)
    }).catch(e => {
        console.log('There was an error: ' + e);
    })
}