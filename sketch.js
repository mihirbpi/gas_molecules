const molecules = [];


function setup() {
  /* Setup the animation */

  //Create sliders to change mass and temperature
  createElement('p', 'Slide to change mass');
  mass_slider = createSlider(1, 1000, 150);
  mass_text = createElement('p', "Mass: " + mass_slider.value());
  createElement('p', 'Slide to change temperature');
  temp_slider = createSlider(0, 10000, 273);
  temp_text = createElement('p', "Temperature: " + temp_slider.value());

  //Create canvas
  createCanvas(window.outerWidth - 17.5, window.outerHeight - 335);

  //Create 50 molecules
  for (var i = 0; i < 50; i++) {
    molecule = new Molecule(mass_slider.value(), temp_slider.value());
    molecules.push(molecule);
  }

}

function draw() {
  /* The draw loop which is called continuously */

  //Create a dark gray background
  background(51);

  //Update and show all the molecules
  for (let molecule of molecules) {
    molecule.update();
    molecule.show();
  }
}
