export class Card {
  constructor(title, src, alt, template, handleCardClick) {
    this._title = title;
    this._src = src;
    this._alt = alt;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }
  _createElement() {
    this._element = this._template.content.querySelector('.card').cloneNode(true);
  }
  //метод удаления карточки
  _removeElement = () => {
    this._element.remove();
  }
  //методы добавления слушателей
  _addEventListeners() {
    //удаляем карточку
    this._element.querySelector('.card__delete').addEventListener('click', this._removeElement);
    //ставим лайк
    const likeButton = this._element.querySelector('.card__like');
    likeButton.addEventListener('click', () => {likeButton.classList.toggle('card__like_active')});
    //открываем карточку
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._src);
    });
  }
  render(container) {
    this._createElement();
    this._cardImage = this._element.querySelector('.card__image');
    this._element.querySelector('.card__title').innerText = this._title;
    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
    this._addEventListeners();
    return this._element;
  }
}