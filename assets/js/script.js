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
    console.log(color);
    const rgbString = colorToRGBString(color);
    document.getElementById("random-color").innerHTML = rgbString;
}