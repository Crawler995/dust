class Planet {
  constructor({radius, pos, color}) {
    this.radius = radius;
    this.pos = pos;
    this.color = color;
  }

  draw() {
    push();

    translate(this.pos);
    noStroke();
    fill(this.color);
    ellipse(0, 0, this.radius * 2, this.radius * 2);

    pop();
  }
}