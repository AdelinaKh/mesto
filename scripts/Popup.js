export class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._closeOverlay = this._popupSelector.querySelector('.popup__overlay');
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners();
    this._handleEscClose();
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._removeEventListeners();
  }
  _closeEsc = (evt) => {
    if (evt.key === 'Escape') {
      this._popupSelector.classList.remove('popup_opened');
    }
  }
  _handleEscClose() {
    document.addEventListener('keydown', this._closeEsc);
  }
  setEventListeners() {
    this._closeButton.addEventListener('click', (evt) => this.close(evt));
    this._closeOverlay.addEventListener('click', (evt) => this.close(evt));
  }
  _removeEventListeners() {
    document.removeEventListener('keydown', this._closeEsc);
  }
}
