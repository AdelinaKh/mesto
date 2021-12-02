//функция, которая убирает ошибку
const hideInputError = (formElement, inputElement, config) => {
  const {inputErrorClass, errorClass} = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}
//функция, которая выдает ошибку
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}
//функция, которая проверяет валидность формы
const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
}
//функция, которая определяет активность кнопки
const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
  const isFormValid = formElement.checkValidity(); //true
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
  buttonElement.disabled = !isFormValid;
}
const setEventListeners = (formElement, config) => {
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    errorClass,
    inputErrorClass
  } = config;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  //активность кнопки 
  toggleButtonState(formElement, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, { errorClass, inputErrorClass });
        toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    });
  });
}
const enableValidation = (config) => {
  /*
      Пример использования rest-оператора.
      Из объекта config извлекаем свойство formSelector, остальные свойства помещаем в объект props.
  */
  const { formSelector, ...props } = config;
  const inputList = Array.from(document.querySelectorAll(formSelector));
  inputList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      // объект props будет содержать в себе все необходимые свойства
      setEventListeners(formElement, props);
  })
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input-error_shown'
});