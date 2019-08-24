class Molecule {

  constructor(mass, temperature) {
    /* Constructor to create a new molecule */
    this.mass = mass;
    this.radius = this.mass / 5;
    this.temperature = temperature;
    this.position = createVector(random(0, width), random(0, height));
    this.energy = randomExponential(1 / this.temperature)
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(sqrt(2 * this.energy / this.mass));
  }

  update() {
    /* Update the molecule */

    //If the mass slider is changed change the mass & velocity of the molecule according to the Maxwell-Boltzmann distribution
    if (this.mass != mass_slider.value()) {
      this.mass = mass_slider.value();
      mass_text.html("Mass: " + mass_slider.value());
      this.radius = this.mass / 5;
      this.energy = randomExponential(1 / this.temperature)
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag(sqrt(2 * this.energy / this.mass));
    }

    //If the temperature slider is changed change the temperature & velocity of the molecule according to the Maxwell-Boltzmann distribution
    if (this.temperature != temp_slider.value()) {
      this.temperature = temp_slider.value();
      temp_text.html("Temperature: " + temp_slider.value());
      this.energy = randomExponential(1 / this.temperature)
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag(sqrt(2 * this.energy / this.mass));
    }

    //If the molecule hits the edge of the canvas make it bounce backwards with the same velocity
    if (this.position.x <= 0 || this.position.y <= 0 || this.position.x >= (width) || this.position.y >= (height)) {
      this.velocity = p5.Vector.mult(this.velocity, -1);
    }

    //If another molecule collides with this one make them elastically bounce off of each other
    for (let other_molecule of molecules) {
      var d = dist(this.position.x, this.position.y, other_molecule.position.x, other_molecule.position.y);
      if (d <= this.radius) {
        if (this.position.x <= 0 || this.position.y <= 0 || this.position.x >= (width) || this.position.y >= (height)) {
          this.velocity = p5.Vector.mult(this.velocity, -1);
          other_molecule.velocity = p5.Vector.mult(other_molecule.velocity, -1);
        } else {
          var v1i = this.velocity;
          var v2i = other_molecule.velocity;
          this.velocity = v2i;
          other_molecule.velocity = v1i;
        }
      }
    }

    //Update the position of the molecule
    this.position.add(p5.Vector.mult(this.velocity, 2));

  }

  show() {
    /* Display the molecule */
    stroke(255);
    fill(255)
    circle(this.position.x, this.position.y, this.radius);
  }
}
