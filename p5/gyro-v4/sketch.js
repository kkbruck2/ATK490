/* For mobile phones - accesses accelerometer.
Make sure you turn on orientation lock on your iPhone or Android device. */

var alpha, beta, gamma; // orientation data
var xPosition = 0;
var yPosition = 0;
var dx; // acceleratiobn data
var dy;
var z = 0;
var cars = [];
var catPos = 0;
var angle = 0.0;
var timer = 0;
var limbs;
var headTail;
var marks;
var stomachY = 64;
var stomachX = 160;
var woodFloorX = 0;
var woodFloorY = 0;
var catHead;
var frontL;
var frontR;
var cattail;
var catbody;
var backL;
var backR;
let x = 150,
  y = 150,
  angle1 = 0.0,
  segLength = 100;


//===============================================================Preload
function preload() {
  catHead = loadImage("assets/1x/head.png");
  woodFloor = loadImage("assets/1x/myFloor.png")
  marks = loadImage("assets/1x/marking.png")
  frontL = loadImage("assets/1x/frontL.png");
  frontR = loadImage("assets/1x/frontR.png");
  cattail = loadImage("assets/1x/tail.png");
  backL = loadImage("assets/1x/backL.png");
  backR = loadImage("assets/1x/backR.png");
  catHead = loadImage("assets/1x/head.png")

}


//===============================================================Set up
function setup() {
  createCanvas(windowWidth, windowHeight);
  //angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);





  //------------------------------------- initialize accelerometer variables
  alpha = 0;
  beta = 0;
  gamma = 0;

  for (var i = 0; i < 20; i++) {
    cars.push(new car())
  }
  //------------------------------------------------- piece splice

  //catPos = createVector(dx, dy);


}
//============================================================End of set-up

//=============================================================Draw
function draw() {
  background('#CE9B64'); // background fill
  image(woodFloor, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

//=================code from cat
dx = mouseX - x;
dy = mouseY - y;
angle1 = atan2(dy, dx);
x = mouseX - cos(angle1) * segLength;
y = mouseY - sin(angle1) * segLength;

//ellipse(x, y, 20, 20);

//Rotating point
segment(x, y, angle1);

//=============================

  //----------------------------- heading code
  // let catPos0 = createVector(windowWidth / 2, windowHeight / 2);
  // let catPos = createVector(xPosition - windowWidth / 2, yPosition - windowHeight / 2);
  //
  // drawArrow(catPos0, catPos, 'black');
  //
  // let myHeading = catPos.heading();
  //---------------------------------------cat translate


  //-------------------------------code for test mouse moving cat
  // push();
  // translate(mouseX, mouseY);
  //
  // rotate(angle);
  // cat(-300, -300);
  // angle += 2;
  // pop();
  //-------------------------------code for test mouse moving cat END

  // noStroke();
  // the map command !!!!
  // takes your variable and maps it from range 1 to range 2
  // map(yourVar, range1_x, range1_y, range2_x, range2_y) ;

  //----------------------degree mapping
  // xPosition = map(gamma, -60, 60, 0, width);
  // yPosition = map(beta, -30, 30, 0, height);
  x = map(beta, 5.7, 0.5, 0, width);
  y = map(gamma, 5.2, 1, 0, height);

  catPos.x = mouseX
  catPos.y = mouseY


  for (var i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].drive();
    if (cars[i].pos.dist(catPos) < 50) {
      cars.splice(i, 1);
      stomachX += 3;

    }
  }

  // DECORATIONS
  // Just a bunch of text commands to display data coming in from addEventListeners
  textAlign(LEFT);
  textSize(20);
  fill('black');
  text("orientation data:", 25, 25);
  textSize(15);
  text("alpha: " + alpha, 25, 50);
  text("beta: " + beta, 25, 70);
  text("gamma: " + gamma, 25, 90);
  textSize(20);
  text("acceleration data:", 25, 125);
  textSize(15);
  text("x = " + x.toFixed(2), 25, 150); // .toFixed means just show (x) decimal places
  text("y = " + y.toFixed(2), 25, 170);
  text("z = " + z.toFixed(4), 25, 190);
}
//================================================================ end of draw

//===============================segment function
function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  cat(0, 0);

  line(0, 0, segLength, 0);
  pop();
}

// ----------------------------------------------------------- Cat motion Heading
// function drawArrow(base, vec, myColor) {
//   push();
//   noStroke();
//
//   translate(base.x, base.y);
//   line(0, 0, vec.x, vec.y);
//   rotate(vec.heading());
//   translate(vec.mag(), 0);
//   cat(vec.x, vec.y);
//   pop();
// }
//-----------------------------------------------------------End of cat motion
//------------------------------------------------- Read in accelerometer data
window.addEventListener('deviceorientation', function(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});

// ------------------------------------------------------accelerometer Data
window.addEventListener('devicemotion', function(e) {
  // get accelerometer values
  x = e.acceleration.x;
  y = e.acceleration.y;
  z = e.acceleration.z;
});
//----------------------------------------------------------element definitions

//========================================================== cat definition
function cat() {
  push();
  //==frontpaws
  image(frontL, 63, -30 + -2 / 10 * (stomachY - 30))

  image(frontR, 63, 35 + 2 / 10 * (stomachY - 35));

  //back Legs left
  image(backL, -63, -20 + -2 / 7 * (stomachY - 30));
  //back right
  image(backR, -63, 18 + 2 / 7 * (stomachY - 25));

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

//============================================================ End of cat definition

//============================================================= Car(mice)
function car() {
  //-----------------------attributes
  this.pos = createVector(x, y);

  //this.pos = createVector(100, 100);
  this.vel = createVector(random(-5, 5), random(-5, 5));
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);

  //----------------------vector

  this.display = function() {
    fill(this.r, this.g, this.b);
    rect(this.pos.x, this.pos.y, 100, 50);
  }

  //----------------------methods
  this.drive = function() {
    this.pos.add(this.vel);

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}
// =========================================================== End of Car(mice)
//
function deviceShaken() {
  reset();
cars = [];

  for (var i = 0; i < 20; i++) {
    cars.push(new car())
  }
}