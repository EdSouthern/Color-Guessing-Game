# Portfoilio Project 2
View the live project here https://edsouthern.github.io/Color-Guessing-Game/

This is the site for my front-end web application using HTML, CSS and JavaScript. It is designed to be responsive and accessible on a range of devices.

![Website preview](home-page.png)
![Wesbite preview on phone](home-page-phone.png)
![Website preview on phone landscape](home-page-phone-landscape.png)

## User Experience (UX)

### - User stories

- First time vistor goals: 
    1. As a First Time Visitor, I want to be enticed into playing the game.
    2. As a First Time Visitor, I want to be able to understand how to play the game as well as the rules.
    4. As a First time Vistor, I want to play the game.

- Returning vistor goals:
    1. As a Returning Visitor, I want to attempt to increase my score by guessing more answers correctly under the constraint of lives.
    2. As a Returning Visitor, I want to work towards and win the game by picking 10 colours correctly under the constraint of 10 lives.

### - Design  

- Colour scheme
    - I have chosen to go for a retro theme. The background is black to ensure my coloured boxes stand out in order to entice the user into playing the game. The font apart from the title is all white, to ensure a contrast making the text easily legibe. My title of the site users an overlapped rainbow font to inject some colour and to make the title stick in the users memeory. 
- Typography
    - The Nunito font is the main font used throughout the whole website which was imported from google fonts. Sans Serif is used as the fallback font in case for any reason the font isn't being imported into the site correctly. The Nunito font is both attractive and appropriate for my site and feels adds to the theme. 
 - The game
    - The game consists of 6 boxes, each a random colour with each iteration of the game. They have a border radius to give them a smooth sleek finish as well as a thin white border to ensure some contrast with the background even for the darker random colours.
    
## Features

- The Color Game
    - The essential purpose of this site is to provide the user a fun and enjoyable experience of playing a RGB color matching game. The user is provided a random colour in RGB format at the top of the page. They must try and guess which colour this matches from the 6 boxes that appear in the main area of the page. These boxes each take a random colour with one of them always taking the colour provided for the user to guess. The user must click on the box which they they think is the correct one. Doing this will incremnet their score by 1 and load a new round. Picking a wrong colour will hide the box clicked and the user can guess again, however this will decrease the users lives by 1. 
- Lives and Score
    - The user starts with 10 lives and and a score of 0 which is displayed in the top left hand corner. Each time a user guesses a colour correctly 1 will be added to their score. This will happen till a score of 10 is reached which is when the user will win the game. Each time a user gets an answer wrong their lives will decrease by 1, till they reach 0 which means the game is over.
- Game Over and You Win screen
    - If the user scores 10 all the boxes will hide and some winning text will appear to congratulate the user on winning the game. If the user loses all 10 lives some game over text will appear informing the user that the game is over and providing them with their final score. 
- Reset Button
    - A button on the top right is provided for the user to reset the game when desired. At any time this will reset the game. The score and lives will return to inital values, as well as a new set of colors loading meaning the game is totally reset. The button is clearly visible on the top right to ensure the user can always find it.

## Technologies used

- HTML5
- CSS
- JavaScript
## Testing

- Html
    - No erros were returned when passing through the Nu html checker 

- CSS
    - No erros were returned when passing through the W3C validator.

In additon to this I also throughly tested the responsivness and working of the webpage and didn't find any issues. I tested the resposviness on different devices using responsinator.com.

## Deployment

The site was deployed using Github pages. The live link can be found here https://edsouthern.github.io/Color-Guessing-Game/

- Content
    - My font 'Nunito' was taken from google fonts. 
    - I found some code in order to make layered rainbow font for my title on: https://welearncode.com/rainbow-text/ .
    - I used stack overflow to find a function that would randomise an array in order for me to randomise where the correct colour for the user to guess should be. Otherwise each game it would appear in the same position making the game easy for the user to guess. A link to this can be found here : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array . 

## Probelms