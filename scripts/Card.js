import { openPopup } from "./PopupFunc.js";
export class Card {
  static template = document.querySelector('.card-template').content;
  constructor(title, src, alt) {
    this._title = title;
    this._src = src;
    this._alt = alt;
    this._openPopup = openPopup;
  }
  _createElement() {
    this._element = Card.template.querySelector('.card').cloneNode(true);
  }
  //метод удаления карточки
  _removeElement = () => {
    this._element.remove();
  }
  //методы добавления слушателей
  _addEventListeners() {
    //реализуем открытие карточки
    this._element.querySelector('.card__image').addEventListener('click', (evt) => {
      const resizeElement = document.querySelector('.popup_resize');
      const popupImage = resizeElement.querySelector('.popup__image');
      const popupImageTitle = resizeElement.querySelector('.popup__description');
      popupImage.src = this._src;
      popupImage.alt = this._alt;
      popupImageTitle.innerText = this._alt;
      this._openPopup(resizeElement);
    });
    //удаляем карточку
    this._element.querySelector('.card__delete').addEventListener('click', this._removeElement);
    //ставим лайк
    const likeButton = this._element.querySelector('.card__like');
    likeButton.addEventListener('click', () => {likeButton.classList.toggle('card__like_active')});
  }
  render(container) {
    this._createElement();
    this._element.querySelector('.card__title').innerText = this._title;
    this._element.querySelector('.card__image').src = this._src;
    this._element.querySelector('.card__image').alt = this._alt;
    this._addEventListeners();
    return this._element;
    //container.append(this._element);
  }
}