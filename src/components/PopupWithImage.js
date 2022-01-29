import  {Popup}  from "./Popup.js";
export class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__description');
  }
  open(title, link) {
    this._image.src = link;
    this._image.alt = title;
    this._title.innerText = title;
    super.open();
  }
}
