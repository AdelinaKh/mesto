import  {Popup}  from "./Popup.js";
export class PopupWithConfirm extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFormDelete = this._popup.querySelector('.popup__content-delete');
  }
  setSubmitAction(action) {
    this._submitHandledDelete = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupFormDelete.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandledDelete();
    });
  }
}
