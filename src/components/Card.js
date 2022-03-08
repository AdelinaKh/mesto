export class Card {
  constructor(cardInfo, user,template, handlerCardClick, handlerDeleteCard, handlerCardLike, api) {
    this._card = cardInfo;
    this._text = cardInfo.name;
    this._link = cardInfo.link;
    this._like = cardInfo.likes;
    this._id = cardInfo._id;
    this._owner = cardInfo.owner;
    this._user = user;
    this._api = api;
    this._template = template;
    this._handlerCardClick = handlerCardClick;
    this._handlerDeleteCard = handlerDeleteCard;
    this._handlerCardLike = handlerCardLike;
  }
  _createElement() {
    this._element = this._template.content.querySelector('.card').cloneNode(true);
  }
  //методы добавления слушателей
  _addEventListeners() {
    //ставим лайк 
    this._likeButton.addEventListener('click', () => this._handlerCardLike(this));
    //открываем карточку
    this._cardImage.addEventListener('click', () => this._handlerCardClick(this._text, this._link));
    //удаляем карточку
    this._deleteBtn.addEventListener('click', () => this._handlerDeleteCard(this));
    //проверяем создателя карточек
    if (this._user !== this._owner._id) {
      this._deleteBtn = this._element.querySelector('.card__delete').classList.add('card__delete-none');
    }
  }
  //переключаем лайк
  _toggleLike() {
    if(this._checkUser()) {
      this.setLike();
    } else {
      this.unsetLike();
    }
  }
  //обновляем инф-ию 
  updateLikes(data) {
    this._likeCounter.textContent = data.length;
  }
  //ставим лайк
  setLike() {
    this._likeButton.classList.add('card__like_active');
    this.isLiked = true;
  }
  //убираем лайк
  unsetLike() {
    this._likeButton.classList.remove('card__like_active');
    this.isLiked = false;
  }
  _checkUser() {
    const even = (item) => item._id === this._user;
    return this._like.some(even);
  }
  render(container) {
    this._createElement();
    this._cardImage = this._element.querySelector('.card__image');
    this._element.querySelector('.card__title').innerText = this._text;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._likeButton = this._element.querySelector('.card__like');
    this._likeCounter = this._element.querySelector('.card__heart');
    this._confirmBtn = document.querySelector('.popup_delete-card').querySelector('.popup__save-button');
    this._deleteBtn = this._element.querySelector('.card__delete');
    this._toggleLike();
    this._likeCounter.textContent = this._like.length;
    this._addEventListeners();
    return this._element;
  }
}
