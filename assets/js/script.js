// When the dom has finished loading the color question is set 
onLoad()
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

function onLoad() {
    const questionColor = setColorQuestion();

    let boxColors = [
        questionColor,
        generateColor(),
        generateColor(),
        generateColor(),
        generateColor(),
        generateColor(),
    ]

    boxColors = randomizeArray(boxColors);

    console.log(boxColors);

    let boxes = document.querySelectorAll(".box");

    for( let i=0; i<boxes.length; i++) {
        boxes[i].style.backgroundColor = colorToRGBString(boxColors[i]);
        boxes[i].addEventListener('click', function() {
            checkColor(boxColors[i])
        });
        
        onLoad()
    }

    function checkColor(boxColor) {
        if(boxColor.r === questionColor.r && boxColor.g === questionColor.g && boxColor.b === questionColor.b) {
            alert('You won!!!!')
        } else {
            alert('Wrong answer');
        }
    }
}
