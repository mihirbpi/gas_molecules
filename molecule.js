class Molecule {

  constructor(mass, temperature) {
    /* Constructor to create a new molecule */
    this.mass = mass;
    this.temperature = temperature;
    this.position = createVector(random(0, width), random(0, height));
    this.radius = this.mass / 5;
    this.velocity = createVector(sqrt(this.temperature / this.mass) * randomGaussian(0, 1), sqrt(this.temperature / this.mass) * randomGaussian(0, 1));
  }

  update() {
    /* Update the molecule */

    //Update the position of the molecule
    this.position.add(this.velocity);

    //If the mass slider is changed change the mass & velocity of the molecule according to the Maxwell-Boltzmann distribution
    if (this.mass != mass_slider.value()) {
      this.mass = mass_slider.value();
      mass_text.html("Mass: " + mass_slider.value());
      this.radius = this.mass / 5;
      this.velocity = createVector(sqrt(this.temperature / this.mass) * randomGaussian(0, 1), sqrt(this.temperature / this.mass) * randomGaussian(0, 1));
    }

    //If the temperature slider is changed change the temperature & velocity of the molecule according to the Maxwell-Boltzmann distribution
    if (this.temperature != temp_slider.value()) {
      this.temperature = temp_slider.value();
      temp_text.html("Temperature: " + temp_slider.value());
      this.velocity = createVector(sqrt(this.temperature / this.mass) * randomGaussian(0, 1), sqrt(this.temperature / this.mass) * randomGaussian(0, 1));
    }

    //If the molecule hits the edge of the canvas make it bounce backwards with the same velocity
    if (this.position.x <= 0 || this.position.y <= 0 || this.position.x >= window.width || this.position.y >= window.height) {
      this.velocity = p5.Vector.mult(this.velocity, -1);
    }

    //If another molecule collides with this one make them elastically bounce off of each other
    for (let other_molecule of molecules) {
      var d = dist(this.position.x, this.position.y, other_molecule.position.x, other_molecule.position.y);
      if (d <= this.radius) {
        var v1i = this.velocity;
        var v2i = other_molecule.velocity;
        this.velocity = v2i;
        other_molecule.velocity = v1i;
      }
    }
  }

  show() {
    /* Display the molecule */
    stroke(255);
    fill(255)
    circle(this.position.x, this.position.y, this.radius);
  }
}
