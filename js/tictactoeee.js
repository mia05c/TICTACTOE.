// this variable keeps track of who's tun it is
let activePlayer = 'X';
//this array store an array of moves
let selectedSquares = [];

//this function is for placing an X or O in a square
function placeXOrO(squareNumber) {
    //this condition ensures a square hasn't be selected already
    //the .some() methos is used to check each element of selectedSquare aray to
    //see if it contains the square number clicked on.
    if (!selectedSquares.some(element =>element.includes(squareNumber))) {
        //this variable retirives the html element id that was clicked.
        let select = document.getElementById(squareNumber);
        //this condition checks who's turn it is.
        if (activePlayer === 'X') {
            //if active player is equal to 'X', the x.png is placed in html.
            select.style.backgroundImage = 'url("images/x.png")';
        //Active player may only be 'x' or 'o' so, if 'X' it must be 'o'
        } else {
            //if active player is equal to 'O', the o.png is places. html
            select.style.backgroundImage = 'url("images/o.png")';
        }
        //squareNumber and activeplayer are concatenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        //this calls a function to check for any win conditions.
        checkWinConditions();
        //this condition is for changing the activeplayer.
        if (activePlayer === 'X') {
            //if active player is 'x' change it to 'o'
            activePlayer = 'O';
        //if active player is anything other than 'x'
        } else {
            //change the active player to 'x'
            activePlayer = 'X';
        }
        //tthis function plays placement sound.
        audio('./media/place.mp3');
        //this condition checks to see if it is computers turn.
        if(activePlayer === 'O') {
            //this function disables clicking for computer choice
            disableClick();
            //this function waits 1 second before placing the image
            //and enabling click
            setTimeout(function () { computersTurn(); }, 1000);
        }
        //returning true is neede for our computerTurn() function to work
        return true;
    }

    //this function results in a random square being selected
    function computersTurn() {
        //this boolean is neede for our while loop
        let success = false;
        //this variable store a random number 0-8
        let pickASquare;
        //this condition allows our while loop to keep
        //trying if a square is selected already
        while(!success) {
            //a random number betweek 0 and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //if a random number evaluates returns true, the swuare hasn't been selected yet
            if (placeXOrO(pickASquare)) {
                //this line calls the function
                placeXOrO(pickASquare);
                //this changes our boolean and ends the loop
                success = true;
            };
        }
    }
}

//this function parses the selectedsquares array to search for win conditions
//drawWinLine function is called to draw line if condition is met
function checkWinConditions() {
    //X 0 1 2 CONDITION
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558,100); }
    //X 3 4 5 CONDITION
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558,304); }
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); }
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); }
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); }
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558); }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }
    //this condition checks for tie. If none of the above conditions register and 9 squares are selected, the code executes
    else if (selectedSquares.length >= 9) {
        //this function plays the tie game sound.
        audio('./media/tie.mp3');
        setTimeout(function () { resetGame(); }, 1000);
    }
     //this function checks if an array includes 3 strings. It is used to check for each win condition.

    function arrayIncludes(squareA, squareB, squareC) {
    //the next 3 variablw will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
    // if the 3 variables we pass are included in our aaray true is returend and our else if condition execute the drawWinLine function
        if (a === true && b === true && c === true) { return true; }
    }
}

//this function makes our body element temporarily unclickable
function disableClick() {
    //this makes our body unclickable
    body.style.pointerEvents = 'none';
    //this makes our body cickable again after 1 second
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

//this function takes a string parameter of the path you set earlier for
//placement sound
function audio(audioURL) {
    //we create a new audio object
    let audio = new Audio (audioURL);
    //play method plays our audio sound
    audio.play();
}

//this function utilizes html canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //this line accesses our html
    const canvas = document.getElementById('win-lines');
    //this line gives us access to methods and properties to use in canvas
    const c = canvas.getContext('2d');
    //this line indicates where the start of a lines x axis is
    let x1 = coordX1,
        //this line indicates where the start of a lines y axis
        y1 = coordY1,
        //this line indicates where the end of lines x axis
        x2 = coordX2,
        y2 = coordY2,
        //this variable stores temporary x axis data we update in our animation loop
        x = x1,
        //this line store temporary x axis data we update in our animation loop
        y = y1;


        //this function interacts with the canvas
    function animateLineDrawing() {
    //this variable creatws the loop fpr when the game ends it restarsts
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    //this method clears content from last loop iteration
    c.clearRect(0, 0, 608, 608);
    //this methos starts a new path
    c.beginPath();
    //this methos moves us to a starting point for our line
    c.moveTo(x1, y1);
    c.lineTo(x, y);
    //this method set the width of our line
    c.lineWidth = 10;
    c.strokesStyle = 'rgba(70, 255, 33, .8)';
    c.stroke();
    //this condition checks if we've reached the endpoint
    if (x1 <= x2 && y1 <= y2) {
        //this condition adds 10 to the previous end x point
        if (x < x2) { x += 10; }
        //this condition adds 10 to the orevious end y point
        if (y < y2) { y += 10; }
        //this condition cancels our animation loop if reach the end points
        if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    }
    //this condition is similar to the one above
    if (x1 <= x2 && y1 >= y2) {
        if (x < x2) { x += 10; }
        if (y > y2) { y -= 10; }
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }

    //this function clears our canvas after our win line is drawn
    function clear() {
        //this line starts our animation loop.
        const animationLoop = requestAnimationFrame(clear);
        //this line clears our canvas
        c.clearRect(0, 0, 608);
        //this line stops our animation loop
        cancelAnimationFrame(animationLoop);
    }
    disableClick();
    //this line plays the win sounds
    audio('./media/winGame.mp3');
    //this line calls our main animation loop
    animateLineDrawing();
    //this line waits 1 second
    //then clears canvas, resets game and allows clicking again
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

//this function resets the game
function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i));
        square.style.backgroundImage = '';
    }
    //this resets our array so it empty and we can start over
    selectedSquares = [];
}