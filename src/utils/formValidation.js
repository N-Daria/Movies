export function inputChange(event, inputList, formButton, buttonDisabledClass) {
  isValid(event.target);
  toggleButtonState(inputList, formButton, buttonDisabledClass);
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

function toggleButtonState(inputList, formButton, buttonDisabledClass) {
  if (hasInvalidInput(inputList)) {
    disactivateButtonState(formButton, buttonDisabledClass)
  } else {
    activateButtonState(formButton, buttonDisabledClass)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function activateButtonState(formButton, buttonDisabledClass) {
  formButton.classList.remove(buttonDisabledClass);
  formButton.disabled = false;
}

function disactivateButtonState(formButton, buttonDisabledClass) {
  formButton.classList.add(buttonDisabledClass);
  formButton.disabled = true;
}
