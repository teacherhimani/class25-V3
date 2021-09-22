const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = [];

//1.make boats array
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  //make new boat by calling boat class constructor
  boat = new Boat(width-79, height - 60, 170, 170,-80);
  
}

function draw() {

  //number in background means a color
  background(189);

  //give background image
  //image(where you loaded image, x,y,width,height)
  image(backgroundImg, 0, 0, width, height);


  //update engine to keep the world running in updated form
  Engine.update(engine);

  //make ground rectangle
  rect(ground.position.x, ground.position.y, width * 2, 1);
 
  
  //push new settings
  push();  
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  showBoats();


  Matter.Body.setVelocity(boat.body,{x:-0.9, y:0})
  boat.display()
  
 //to show cannon balls
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
}

//make key to be pressed to fire cannon balls
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}
//display cannon ball
function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}


//key released to shoot cannon ball from its array
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

//2. make function to show boats
function showBoats() {
  //if boats array is having any data
  if (boats.length > 0) {
    if (
      //arr=[javelin,emmanuel];....arr.length===2....arr[arr.length-1]=arr[1]
      //if(arr[0]===javelin) {text("hi")}
      //checking thee last element of boats array
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      
      //make boats at random positions
      var boat = new Boat(width, height - 100, 170, 170, position);
     
      //after making boat push it in the boats array
      boats.push(boat);
    }

    //taking each boat and setting their velocity to velocityX=-0.9,and velocityY=0
    for (var i = 0; i < boats.length; i++) {

      //accessing the boats array one by one element and giving them velocity
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });
          
        //display each boat
        boats[i].display();
      } 
    }
  } else {
    //when no boat in array thenmake newone
    var boat = new Boat(width, height - 60, 170, 170, -60);
    boats.push(boat);
  }
}

