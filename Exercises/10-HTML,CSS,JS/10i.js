let calculation = localStorage.getItem('calculation') || '';

displayCalculation();

function updateCalculation(value) {
  calculation += value;
  
  displayCalculation();

  saveCalculation();
}

function displayCalculation() {
let textElement = document.querySelector('.js-calculation-display');
      textElement.innerHTML = calculation;
}

function saveCalculation() {
  localStorage.setItem('calculation', calculation);
}