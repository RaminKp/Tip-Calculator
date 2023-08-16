document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.tipPart-button');
  let previousButton = null;
  let selectedTip = null;
  const resetButton = document.querySelector('.buttonPart-button');
  const customTipInput = document.querySelector(".tipPart-form-control");

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (previousButton) {
        previousButton.classList.remove('fixedColor');
      }
      button.classList.add('fixedColor');
      previousButton = button;
      selectedTip = parseFloat(button.textContent);
      updateTipAmount();
      resetButton.classList.remove('disabled'); // Remove the "disabled" class
    });
  });

  customTipInput.addEventListener('input', () => {
    selectedTip = parseFloat(customTipInput.value);
    updateTipAmount();
    buttons.forEach(button => {
      button.classList.remove('fixedColor'); // Remove the "fixedColor" class from all buttons
    });
    resetButton.classList.remove('disabled'); // Remove the "disabled" class
  });

  resetButton.addEventListener('click', () => {
    buttons.forEach(button => {
      button.classList.remove('fixedColor');
    });
    document.querySelectorAll('.form-control').forEach(input => {
      input.value = '';
    });
    resetButton.classList.add('disabled'); // Add back the "disabled" class
    selectedTip = null; // Reset the selected tip value
    updateTipAmount();
  });

  function updateTipAmount() {
    const billNumber = parseFloat(document.querySelector(".form-control").value);
    const numOfPeople = parseFloat(document.querySelector(".form-control[data-people]").value);
    const tipNumber = document.querySelector(".tipAmountNumber");
    const totalNumber = document.querySelector(".totalAmountNumber");
    const customNumber = parseFloat(document.querySelector(".tipPart-form-control").value);

    let tipAmountPerPerson, totaltipAmount;

    if (isNaN(billNumber) || isNaN(numOfPeople) || numOfPeople <= 0) {
      tipNumber.textContent = "$ 0.00";
      totalNumber.textContent = "$ 0.00";
    } else {
      if (!isNaN(customNumber)) {
        tipAmountPerPerson = (billNumber * (customNumber / 100)) / numOfPeople;
        totaltipAmount = (billNumber * (customNumber / 100));
      } else if (!isNaN(selectedTip)) {
        tipAmountPerPerson = (billNumber * (selectedTip / 100)) / numOfPeople;
        totaltipAmount = (billNumber * (selectedTip / 100));
      } else {
        tipAmountPerPerson = 0;
        totaltipAmount = 0;
      }

      tipNumber.textContent = `$ ${tipAmountPerPerson.toFixed(2)}`;
      totalNumber.textContent = `$ ${totaltipAmount.toFixed(2)}`;
    }
  }
});
