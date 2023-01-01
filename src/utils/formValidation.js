export function inputChange(event) {
  isValid(event.target);
  toggleButtonState();
}

function isValid(formInput) {
  if (formInput.validity.valid) {
    hideInputError(formInput)
  } else {
    showInputError(formInput, formInput.validationMessage)
  }
}

function showInputError(formInput, errorMessage) {
  const error = document.querySelector(`.${formInput.id}-error`);
  error.textContent = errorMessage;
}

function hideInputError(formInput) {
  const error = document.querySelector(`.${formInput.id}-error`);
  error.textContent = '';
}

function toggleButtonState() {
  const inputList = Array.from(document.querySelectorAll('.authorization__input'));
  const formButton = document.querySelector('.authorization__button');

  if (hasInvalidInput(inputList)) {
    disactivateButtonState(formButton)
  } else {
    activateButtonState(formButton)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function activateButtonState(formButton) {
  formButton.classList.remove('authorization__button_disabled');
  formButton.disabled = false;
}

function disactivateButtonState(formButton) {
  formButton.classList.add('authorization__button_disabled');
  formButton.disabled = true;
}
