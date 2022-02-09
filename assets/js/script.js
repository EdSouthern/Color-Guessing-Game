/** Setting of global variables for my game, includes setting
* the maximum score, number of lives and starting score.
**/
const TOTAL_LIVES = 10;
const NO_LIVES = 0;
const INITIAL_SCORE = 0;
const MAX_SCORE = 10;
let questionColor;
let boxColors;
let boxes = document.getElementsByClassName("box");
let lives = TOTAL_LIVES;
let score = 0;

/** Adds an event listener to the boxes so user is able
* to click them.
*/
function initialize() {
   emailjs.init("user_tFd9SVDE5e3FDioAW8cdV");
   document.getElementById('score').innerHTML = INITIAL_SCORE.toString();
   document.getElementById('lives').innerHTML = TOTAL_LIVES.toString();
   for (let i = 0; i < boxes.length; i++) {
       boxes[i].addEventListener('click', function () {
           checkColor(i)
       });
   }
}

/** Checks the colour the user has selected and runs the appropriate function
* depending on whether they are correct or incorrect.
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

/** When the DOM has finished loading both the initialize and loadNewGame functions
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
   box.classList.add("fade-out");
}

function vanishBox(box) {
   box.classList.add("hide-box");
}

function vanishBoxes() {
   const boxesToVanish = document.querySelectorAll(".box");
   for (let i = 0; i < boxesToVanish.length; i++) {
       const boxToVanish = boxesToVanish[i];
       vanishBox(boxToVanish)
   }
}

/** Resets score to initial value
*/
function setScore(newScore) {
   score = newScore;
   document.getElementById("score").innerHTML = score;
}

/** Resets lives to initial value
*/
function setLives(newLives) {
   lives = newLives;
   document.getElementById("lives").innerHTML = lives;
}

//Adds event listener for the reset button
document.getElementById("top-btn").addEventListener('click', function () {
   reset()
});

/** Resets the game by calling loadNewGame as well as setting lives
* and score back to initial values. It will also show any hidden boxes
* as well as hiding any game over or game winning text applied by
* removing the css associated with these.
*/
function reset() {
   loadNewGame();
   setScore(INITIAL_SCORE);
   setLives(TOTAL_LIVES);
   revealBoxes();
   const gameOverWrapper = document.getElementsByClassName("game-finished-wrapper")[0];
   gameOverWrapper.classList.add("game-finished-wrapper-hide");
   showEmailForm();
}

/** Reveals any box that has been hidden by
* removing the fade-out class applied to them.
*/
function revealBoxes() {
   const hiddenBoxes = document.querySelectorAll(".box.fade-out");
   for (let i = 0; i < hiddenBoxes.length; i++) {
       const hiddenBox = hiddenBoxes[i];
       hiddenBox.classList.remove("fade-out");
   }
   const vanishedBoxes = document.querySelectorAll(".box.hide-box");
   for (let i = 0; i < vanishedBoxes.length; i++) {
       const vanishedBox = vanishedBoxes[i];
       vanishedBox.classList.remove("hide-box")
   }
}

/** When the user loses the game by using
* all 10 lives, it will hide all boxes making room for some game over text
* with the users final score to render
*/
function gameOver() {
   const title = "Game Over";
   const description = "You scored " + score;
   setGameFinished(title, description);
   vanishBoxes();
}

/** When the user wins the game by getting
* 10 correct answers. It will hide all the boxes and render some winning text
* with the final score.
*/
function userWins() {
   const title = "Congratulations you win!";
   const description = "Lives remaining " + lives;
   setGameFinished(title, description);
   vanishBoxes();
}

function setGameFinished(title, description) {
   const gameFinishWrapper = document.getElementsByClassName("game-finished-wrapper")[0];
   gameFinishWrapper.classList.remove("game-finished-wrapper-hide");
   document.getElementById("game-finished-title").innerHTML = title;
   document.getElementById("game-finished-description").innerHTML = description;
}

function showEmailForm() {
   document.getElementById("email-form").classList.remove("form-wrapper-hide");
   document.getElementById("email").value = '';
}

function hideEmailForm() {
   document.getElementById("email-form").classList.add("form-wrapper-hide");
   document.getElementById("email").value = '';
}

function sendMail() {
   const userEmail = document.getElementById("email").value;
   const userScore = score;

   hideEmailForm();

   emailjs.send("service_7ztzjoa", "template_x78j718", {
       userEmail,
       userScore
   })
       .then(function (res) {
           // email sent
           alert("Email sent to " + userEmail);
       })
       .catch(function (error) {
           console.error(error);
           alert("Unable to send email, please try again");
           showEmailForm();
       })
}
