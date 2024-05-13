// Global variables
let numRectsPerRow = 5; // Number of rectangles per row
let numRows = 20;  // Number of rows
let rectWidth = 50;  // Width of each rectangle
let rectHeight = 10; // Height of each rectangle
let spacing = 10; // Spacing between rectangles
let colors = []; // 2D-array to store colors for each rectangle
let timeloop = 0; // Counter for controlling the movement of rectangles from one side to another
let TimerP; // Timer variable
let hastighed = 1; // Controls the speed of timeloop
let btn1, btn2, btn3; // Buttons for controlling speed and start/stop
let score = 0; // Display current score
let highscore = 0; // Display highest score
let loser = 0; // Indicates if the game is lost

// Setup function called once at the beginning.
 
function setup() {
  createCanvas(600, 600);

  // Initialize highscore from local storage, default to 0 if not found
  highscore = getItem('highscore');
  if (highscore === null) {
    highscore = 0;
  }

  // Set initial TimerP value
  TimerP = 15;

  // Calculate total width and height of all rectangles
  let totalWidth = (rectWidth * numRectsPerRow) + (spacing * (numRectsPerRow - 1));
  let totalHeight = (rectHeight + spacing) * numRows;

  // Center the drawing on the screen
  let startX = (width - totalWidth) / 2;
  let startY = (height - totalHeight) / 2;

  // Create buttons for controlling speed and start/stop
  btn1 = createButton("2x speed");
  btn2 = createButton("1/2x speed");
  btn3 = createButton("start/stop");

  // Position and size the buttons
  btn1.position(400, 500);
  btn2.position(400, 350);
  btn3.position(400, 200);
  btn1.size(100, 100);
  btn2.size(100, 100);
  btn3.size(100, 100);

  // Button event listeners
  btn1.mousePressed(function () {
    hastighed = hastighed * 2;
  });
  btn2.mousePressed(function () {
    hastighed = hastighed / 2;
  });
  btn3.mousePressed(function () {
    if (hastighed > 0) {
      hastighed = 0;
    } else if (hastighed == 0) {
      hastighed = 1;
      loser = 0;
    }
  });

  // Initialize colors array with random distribution of green and black rectangles
  for (let i = 0; i < numRows; i++) {
    colors[i] = [];
    let greenRects = floor(random(1, 5)); // Number of green rectangles in this row
    for (let j = 0; j < numRectsPerRow; j++) {
      if (j < greenRects) {
        colors[i][j] = 1; // Green
      } else {
        colors[i][j] = 0; // Black
      }
    }
    // Shuffle the colors in the row
    shuffle(colors[i], true);
  }
}

// Function called whenever a key is pressed.

function keyPressed() {
  // Check if spacebar is pressed
  if (keyCode === 32) {
    // Check the color of the rectangle in the top row at the middle position
    if (colors[0][2] === 1) {
      // If it's green, move the rectangles and update score
      moveRectangles();
      score += 1;
      // Update highscore if necessary
      if (score > highscore) {
        highscore = score;
        storeItem('highscore', highscore);
      }
    } else {
      // If it's black, reset colors and score
      setup();
      score = 0;
      loser = 1;
    }
  }
}

//Function to move rectangles up one row and generate new colors for the bottom row.

function moveRectangles() {
  for (let i = 0; i < numRows - 1; i++) {
    colors[i] = colors[i + 1];
  }

  // Generate new colors for the bottom row
  colors[numRows - 1] = [];
  let greenRects = floor(random(1, 5));
  for (let j = 0; j < numRectsPerRow; j++) {
    if (j < greenRects) {
      colors[numRows - 1][j] = 1; // Green
    } else {
      colors[numRows - 1][j] = 0; // Black
    }
  }
  // Shuffle the colors in the bottom row
  shuffle(colors[numRows - 1], true);
}

// Function to draw the canvas.

function draw() {
  background(255);
  frameRate(30);
  background(220);

  // Display score and highscore
  textSize(30);
  fill(0);
  text("Score: " + score, 450, 50);
  text("Highscore: " + highscore, 400, 150);

  // Display "you die" message if the game is lost
  if (loser == 1) {
    hastighed = 0;
    textSize(100);
    fill('red');
    text("You died", 100, 150);
  }

  // Calculate starting position for drawing rectangles
  let startX = (width - ((rectWidth + spacing) * numRectsPerRow - spacing)) / 4;
  let startY = height - ((rectHeight + spacing) * numRows - spacing);

  // Draw rectangles based on colors array
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numRectsPerRow; j++) {
      let x = startX + (j * (rectWidth + spacing));
      let y = startY + (i * (rectHeight + spacing));
      if (colors[i][j] === 1) {
        fill(0, 255, 0); // Green color
      } else {
        fill(0); // Black color
      }
      rect(x, y, rectWidth, rectHeight);
    }
  }

  // Move rectangles sideways based on time loop and speed
  timeloop += hastighed;
  if (timeloop > TimerP) {
    moveRectanglesside();
    timeloop = 0;
  }
}

//Function to move rectangles sideways. 

function moveRectanglesside() {
  
  
  // Gem den mest venstre farve i hver række
  let leftmostColors = [];
  for (let i = 0; i < numRows; i++) {
    leftmostColors[i] = colors[i][0];
  }

  // Flyt farverne i hver række én plads til venstre
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numRectsPerRow - 1; j++) {
      colors[i][j] = colors[i][j + 1];
    }
  }

  // Indsæt den gemte farve på den mest højre position i hver række
  for (let i = 0; i < numRows; i++) {
    colors[i][numRectsPerRow - 1] = leftmostColors[i];
  }

}