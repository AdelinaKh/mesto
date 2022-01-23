import {Popup} from "./Popup.js";
export class PopupWithForm extends Popup{
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._submitForm = submitForm;
    this._popupForm = document.querySelector('.popup__form');
  }
  _getInputValues(){
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__text'));
    this._formValue = {};
    this._inputList.forEach((input) => this._formValue[input.name] = input.value);
    return this._formValue;
  }
  setEventListeners() {
    // this._closeButton.addEventListener('click', (evt) => this.close(evt));
    // this._closeOverlay.addEventListener('click', (evt) => this.close(evt));
    this._popupSelector.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
}
