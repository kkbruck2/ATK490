var catWhole;
var catHead;
var frontL;
var frontR;
var cattail;
var catbody;
var backL;
var backR;
var woodFloor;
var activeArea;
var stomachY = 64;
var stomachX = 160;

var catDirection = 1;
var marks;
var grid;

let x = 50,
    y = 50,
    angle1 = 0.0,
    segLength = 100;
let catImg;
let myFloor;



function preload() {
  catHead = loadImage("assets/1x/head.png");
  frontL = loadImage("assets/1x/frontL.png");
  frontR = loadImage("assets/1x/frontR.png");
  cattail = loadImage("assets/1x/tail.png");
  catbody = loadImage("assets/1x/body.png");
  backL = loadImage("assets/1x/backL.png");
  backR = loadImage("assets/1x/backR.png");
  activeArea = loadImage("assets/1x/Asset106.png");
  catWhole = loadImage("assets/1x/catPlace.png");
  woodFloor = loadImage("assets/1x/myFloor.png");
  marks = loadImage("assets/1x/marking.png");
  grid = loadImage("assets/grid.png");
}



function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);

  strokeWeight(20.0);
  stroke(255, 100);




}

function draw() {
image(woodFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
image(grid, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

//================insert direction code here

  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);
  x = mouseX - cos(angle1) * segLength;
  y = mouseY - sin(angle1) * segLength;

  segment(x, y, angle1);

  ellipse(x, y, 20, 20);
//=================================

}

function segment(x, y, a) {

  push();
  translate(x, y);
  rotate(a);
    //image(catImg, -40, segLength - 95);
cat(0, 0);
  line(0, 0, segLength, 0);
  pop();
}


function cat() {
  //set translation point

  push();



//rotation point
//translate(-95, -30);


  //==active area location
  // push();
  // fill(0, 0, 0, 50);
  // ellipse(95, 30, 60, 60);
  // noFill();
  // translate(20, 30);
  // pop();
  //==end of active area

  //==frontpaw
  //image(frontL, 62, 54);
  //image(frontL, 62 + -2/10 * (stomachX - 64), 54);
image(frontL, 63, -30 + -2/10 * (stomachY - 30) )
  //right front Leg
//  image(frontR, 131 + 2/10 * (stomachX - 64), 63);

image(frontR, 63, 35 + 2/10 * (stomachY - 35));

  //back Legs left

  image(backL, -63, -20 + -2/7 * (stomachY - 30));

  //back right
  image(backR, -63, 18 + 2/7 * (stomachY - 25));

  //Cat body gets fat
  fill(115, 99, 87);
  stroke(0);
  strokeWeight(2);
  ellipse(-30, 0, 165, stomachY);
  //body markings
  noStroke();
  image(marks, -30, 0, 160, stomachY);
  //head and tail
  image(catHead, 80, 0);
  image(cattail, -160, 20);

  pop();
}

function mouseReleased() {
  image(marks, 100, 150, stomachX, stomachY += 5);
}
