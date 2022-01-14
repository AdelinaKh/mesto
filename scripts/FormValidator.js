export class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inactiveButton = this._config.inactiveButtonClass;
  }
  //метод, который убирает ошибку
  _hideInputError = (inputElement) => {
    const {inputErrorClass, errorClass} = this._config;
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }
  //метод, который выдает ошибку
  _showInputError = (inputElement, errorMessage) => {
    const {inputErrorClass, errorClass} = this._config;
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }
  //метод, который проверяет валидность формы
  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }
  //метод, который определяет активность кнопки
  toggleButtonState = () => {
    const isFormValid = this._formElement.checkValidity(); //true
    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(this._inactiveButton, !isFormValid);
  }
  //метод для очистки ошибок и управления кнопкой
  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }
  enableValidation = () => {
    this._setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
}