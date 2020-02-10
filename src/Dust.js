class Dust {
  constructor({radius, pos, dir, flyV, fadeV, color, alpha}) {
    this.radius = radius;
    this.pos = pos;
    this.dir = dir;
    this.flyV = flyV;
    this.fadeV = fadeV;
    this.color = color;
    this.alpha = alpha;

    this.isDead = false;
  }

  draw() {
    push();
    translate(this.pos);

    noStroke();
    this.color.setAlpha(this.alpha);
    fill(this.color);
    ellipse(0, 0, this.radius * 2, this.radius * 2);

    pop();

    this.update();
  }

  update() {
    this.alpha -= this.fadeV;
    if(this.alpha <= 0) {
      this.alpha = 0;
      this.isDead = true;
    }

    this.pos.add(this.dir.copy().mult(this.flyV));
  }
}