import  {Popup}  from "./Popup.js";
export class PopupWithImage extends Popup{
  constructor(popupSelector, text, link) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._image = this._popupSelector.querySelector('.popup__image');
    this._title = this._popupSelector.querySelector('.popup__description');
    this._text = text;
    this._link = link;
  }
  open() {
    this._image.src = this._link;
    this._image.alt = this._text;
    this._title.innerText = this._text;
    super.open();
    // this._popupSelector.classList.add('popup_opened');
    // this.setEventListeners();
    // this._handleEscClose();
  }
}
