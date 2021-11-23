let questionColor;
let boxColors;

let boxes = document.querySelectorAll(".box");

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
        correctAnswer();
        alert('You won!!!!');
        loadNewGame();
    } else {
        wrongAnswer(i);
        alert('Wrong answer');
    }
} 

function loadNewGame() {
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
    document.getElementById("random-color").innerHTML = rgbString;
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
    let oldScore = parseInt(document.getElementById("correct").innerHTML);
    document.getElementById("correct").innerHTML = ++oldScore
    const hiddenBoxes = document.querySelectorAll(".box.fade-out")
    for(let i = 0; i < hiddenBoxes.length; i++) {
        const hiddenBox = hiddenBoxes[i];
        hiddenBox.classList.remove("fade-out");
    }
}

function wrongAnswer (i) {
    let oldScore = parseInt(document.getElementById("wrong").innerHTML);
    document.getElementById("wrong").innerHTML = ++oldScore
    document.getElementsByClassName("box")[i].classList.add("fade-out");
}