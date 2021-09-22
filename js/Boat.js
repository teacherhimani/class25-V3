class Boat {
  //properties :How will it look
  constructor(x, y, width, height, boatPos) {
    //give shape to body
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;

    //give image to the body
    this.image = loadImage("./assets/boat.png");

    //pass the starting position from sketch file =-80
    this.boatPosition = boatPos;

    //add the boat to our world
    World.add(world, this.body);
  }

  //functions:what it will do
  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    
    //give new settings
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.boatPosition, this.width, this.height);
    pop();
  }
}
