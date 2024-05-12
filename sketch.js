
let numRectsPerRow = 5;
let numRows = 20;
let rectWidth = 50;
let rectHeight = 10;
let spacing = 10;
let colors = []; // 2D-array til at gemme farver for hvert rektangel
let currentRow = numRows - 1; // Den aktuelle række
let timeloop = 0; 
let TimerP;
let score = 0;
let hastighed = 0
let btn1 
let btn2 
let btn3
let btn4 
let highscore



function setup() {
  createCanvas(600, 600);

  highscore = getItem('highscore');
  if (highscore === null) {
    highscore = 0;}
  // sætter timerP som er i kontrol over hvornår rect bevæger sige til siden. 
  TimerP = 15
  // Beregn den samlede bredde af en række
  let totalWidth = (rectWidth * numRectsPerRow) + (spacing * (numRectsPerRow - 1));
  // Beregn det samlede højde af alle rækker
  let totalHeight = (rectHeight + spacing) * numRows;
  // Centrer den tegning på skærmen
  let startX = (width - totalWidth) / 2;
  let startY = (height - totalHeight) / 2;


  btn1 = createButton("2x speed");
  btn2 = createButton("1/2x speed");
  btn3 = createButton("start/stop");
 

  btn1.position(400, 500);
  btn2.position(400, 350);
  btn3.position(400, 200);
  

  btn1.size(100, 100);
  btn2.size(100, 100);
  btn3.size(100, 100);
  

  btn1.mousePressed(function () {
    hastighed = hastighed * 2;
  });
  btn2.mousePressed(function () {
    hastighed = hastighed/2;
  });
  btn3.mousePressed(function () {
    if(hastighed > 0){hastighed=0} else if(hastighed == 0){hastighed = 1};
  });
  

  // Fyld 2D-arrayet 'colors' med farver, hvor 2 til 5 rektangler i hver række er grønne
  for (let i = 0; i < numRows; i++) {
    colors[i] = [];
    let greenRects = floor(random(1, 5)); // Antal grønne rektangler i denne række
    for (let j = 0; j < numRectsPerRow; j++) {
      if (j < greenRects) {
        colors[i][j] = 1; // Grøn
      } else {
        colors[i][j] = 0; // Sort
      }
    }
    // Bland farverne i rækken
    shuffle(colors[i], true);
  };
  // Tegn rektangler baseret på farverne i 'colors' arrayet
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numRectsPerRow; j++) {
      let x = startX + (j * (rectWidth + spacing));
      let y = startY + (i * (rectHeight + spacing));
      if (colors[i][j] === 1) {
        fill(0, 255, 0); // Grøn farve
      } else {
        fill(0); // Sort farve
      }
      rect(x, y, rectWidth, rectHeight);
    }
  }
};
// Tjekker om spacebar er blevet trykket
function keyPressed() {
  // Tjekker om spacebar er blevet trykket
  if (keyCode === 32) {
    // Tjekker farven på det rektangel i den øverste række, der ligger i midten
    mellem1 = 30
    mellem2 = 35
    if (colors[0][2] === 1) {
      // Hvis farven er grøn, gør det samme som moveRectangles()
      moveRectangles();
      score += 1
      if (score > highscore){
        highscore = score
        storeItem('highscore', highscore);
       
      
      }
    } else {
      // Hvis farven er sort, geninitialiser farverne ved at kalde setup()
      setup();
      score = 0
    }

  }
}
function moveRectangles() {
  // Flyt rektanglerne en række op
  for (let i = 0; i < numRows - 1; i++) {
    colors[i] = colors[i + 1];

  }



  // Generer nye farver for den øverste række
  colors[numRows - 1] = [];
  let greenRects = floor(random(1, 5)); // Antal grønne rektangler i den øverste række
  for (let j = 0; j < numRectsPerRow; j++) {
    if (j < greenRects) {
      colors[numRows - 1][j] = 1; // Grøn
    } else {
      colors[numRows - 1][j] = 0; // Sort
    }
  }
  // Bland farverne i den øverste række
  shuffle(colors[numRows - 1], true);


}

function draw() {
  background(255);
  frameRate(30);
  background(220);
  textSize(30);
  fill(0);
  text("score "+ score, 450,50 );
  text("highscore "+ highscore, 400,150 );
  let startX = (width - ((rectWidth + spacing) * numRectsPerRow - spacing))/4;
  let startY = height - ((rectHeight + spacing) * numRows - spacing);
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numRectsPerRow; j++) {
      let x = startX + (j * (rectWidth + spacing));
      let y = startY + (i * (rectHeight + spacing));
      if (colors[i][j] === 1) {
        fill(0, 255, 0); // Grøn farve
      } else {
        fill(0); // Sort farve
      }
      rect(x, y, rectWidth, rectHeight);

    }
    
  }
 
timeloop += hastighed
if(timeloop > TimerP){
  moveRectanglesside();
  timeloop = 0

}
}
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

