export class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._closeOverlay = this._popup.querySelector('.popup__overlay');
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeEsc);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeEsc);
  }
  _closeEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener('click', (evt) => this.close(evt));
    this._closeOverlay.addEventListener('click', (evt) => this.close(evt));
  }
}
