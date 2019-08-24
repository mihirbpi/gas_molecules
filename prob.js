/* Quick implementation of Exponential and Geometric random number generators
For example you can use it to simulate when an event is going to happen next, given its average rate:
Buses arrive every 30 minutes on average, so that's an average rate of 2 per hour.
I arrive at the bus station, I can use this to generate the next bus ETA:
  randomExponential(2); // => 0.3213031016466269 hours, i.e. 19 minutes

*/

// Exponential random number generator
// Time until next arrival
function randomExponential(rate, randomUniform) {
  // http://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates
  rate = rate || 1;

  // Allow to pass a random uniform value or function
  // Default to Math.random()
  var U = randomUniform;
  if (typeof randomUniform === 'function') U = randomUniform();
  if (!U) U = Math.random();

  return -Math.log(U)/rate;
}

// Geometric random number generator
// Number of failures before the first success,
// supported on the set {0, 1, 2, 3, ...}
function randomGeometric(successProbability, randomUniform) {
  // http://en.wikipedia.org/wiki/Geometric_distribution#Related_distributions
  successProbability = successProbability || 1 - Math.exp(-1); // Equivalent to rate = 1

  var rate = -Math.log(1 - successProbability);

  return Math.floor(randomExponential(rate, randomUniform));
}
