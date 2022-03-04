import  {Popup}  from "./Popup.js";
export class PopupWithConfirm extends Popup{
  constructor(popupSelector, submitHandlerdDelete) {
    super(popupSelector);
    this._submitHandlerdDelete = submitHandlerdDelete;
    this._popupFormDelete = this._popup.querySelector('.popup__content-delete');
    this._popupSubmit = this._popup.querySelector('.popup__save-button');
  }
  _handler(action) {
    this._submitHandlerdDelete = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSubmit.addEventListener('submit', this._handler);
  }
}
