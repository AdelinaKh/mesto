import {Popup} from "./Popup.js";
export class PopupWithForm extends Popup{
  constructor(popupSelector, submitHandler, api) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__text');
    this._api = api;
    this._submitBtn = this._popup.querySelector('.popup__save-button');
  }
  _getInputValues() {
    this._formValue = {};
    this._inputList.forEach((input) => this._formValue[input.name] = input.value);
    return this._formValue;
  }
  _handler = (evt) => {
    this._submitHandler(evt, this._getInputValues());
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handler);
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
  renderLoading(isLoading) {
    if(isLoading) {
      this._submitBtn.textContent = "Сохранение...";
    } else {
      this._submitBtn.textContent = "Сохранить";
    }
  }
}
