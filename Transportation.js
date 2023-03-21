const transportForm = document.querySelector('#transport-form');
const resultOutput = document.querySelector('#result');

transportForm.addEventListener('submit', event => {
  event.preventDefault();
  const distance = parseInt(transportForm.elements.distance.value);
  const period = transportForm.elements.period.value;
  const cheapestPrice = calculateCheapestTransport(distance, period);
  if (cheapestPrice === null) {
    resultOutput.classList.add('error');
    resultOutput.textContent = 'Error: invalid input';
  } else {
    resultOutput.classList.remove('error');
    resultOutput.textContent = `Cheapest price: ${cheapestPrice.toFixed(2)} EUR`;
    console.log(`Cheapest price: ${cheapestPrice.toFixed(2)} EUR`);
  }
});

function calculateCheapestTransport(distance, period) {
  if (isNaN(distance) || distance < 1 || distance > 5000) {
    return null;
  }
  let taxiPrice;
  if (period === 'day') {
    taxiPrice = 0.7 + 0.79 * distance;
  } else {
    taxiPrice = 0.7 + 0.9 * distance;
  }
  let busPrice = 0.09 * distance;
  if (distance >= 20) {
    busPrice = 0.09 * distance;
  } else {
    busPrice = Infinity;
  }
  let trainPrice = 0.06 * distance;
  if (distance >= 100) {
    trainPrice = 0.06 * distance;
  } else {
    trainPrice = Infinity;
  }
  return Math.min(taxiPrice, busPrice, trainPrice);
}