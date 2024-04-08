let numRectsPerRow = 5;
let numRows = 20;
let rectWidth = 50;
let rectHeight = 10;
let spacing = 10;
let colors = []; // 2D-array til at gemme farver for hvert rektangel
let currentRow = numRows - 1; // Den aktuelle række
let timeloop = 0; 

function setup() {
  createCanvas(400, 500);
  // Beregn den samlede bredde af en række
  let totalWidth = (rectWidth * numRectsPerRow) + (spacing * (numRectsPerRow - 1));
  // Beregn det samlede højde af alle rækker
  let totalHeight = (rectHeight + spacing) * numRows;
  // Centrer den tegning på skærmen
  let startX = (width - totalWidth) / 2;
  let startY = (height - totalHeight) / 2;

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
    let midIndex = floor(numRectsPerRow / 2);
    if (colors[0][2] === 1) {
      // Hvis farven er grøn, gør det samme som moveRectangles()
      moveRectangles();
    } else {
      // Hvis farven er sort, geninitialiser farverne ved at kalde setup()
      setup();
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
  frameRate(30)
  let startX = (width - ((rectWidth + spacing) * numRectsPerRow - spacing)) / 2;
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
  
timeloop += 1
if(timeloop > 30){
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