const popupElement = document.querySelector('.popup_profile');
const profileElement = document.querySelector('.profile');
const cardElement = document.querySelector('.popup_cards');
const closeButton = popupElement.querySelector('.popup__close-button');
const openButton = profileElement.querySelector('.profile__open-button');
const inputName = popupElement.querySelector('.popup__text_input_name');
const inputJob = popupElement.querySelector('.popup__text_input_job');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__job');
const templateElement = document.querySelector('.elements');
const formProfile = popupElement.querySelector('.popup__content_profile');
const initialCards = [
  {
    title: 'Римский Форум', 
    src: '../images/roman-forum.jpg'
  },
  {
    title: 'Фонтан Треви', 
    src: '../images/trevi-fountain.jpg'
  },
  {
    title: 'Ватикан', 
    src: '../images/italy-rome-vatican-city.jpg'
  },
  {
    title: 'Колизей', 
    src: '../images/italy-rome-colosseum.jpg'
  },
  {
    title: 'Пантеон', 
    src: '../images/pantheon.jpg'
  },
  {
    title: 'Пьяцца Навона', 
    src: '../images/Roma-piazza-navona-slide.jpg'
  }
];
const formCards = document.querySelector('.popup__content_cards');
const cardsName = formCards.querySelector('.popup__text_input_name');
const cardsLink = formCards.querySelector('.popup__text_input_link');
const template = document.querySelector('.template');
const openCardsButton = profileElement.querySelector('.profile__add-button');
const closeCardButton = cardElement.querySelector('.popup__close-button');
const createTaskDomNode = (item) => {
  const cardsTemplate = template.content.querySelector('.element').cloneNode(true);
  cardsTemplate.querySelector('.element__title').textContent = item.title;
  cardsTemplate.querySelector('.element__image').src = item.src;
  const deleteButton = cardsTemplate.querySelector('.element__delete');
	deleteButton.addEventListener('click', () => {
		cardsTemplate.remove();
	});
  const likeButton = cardsTemplate.querySelector('.element__like');
  likeButton.addEventListener('click', function (evt){
    evt.preventDefault();
    evt.currentTarget.classList.toggle('element__like_active');
  });
  return cardsTemplate;
}
 const result = initialCards.map((item) => {
 	return createTaskDomNode(item);
 });
function SubmitFormCards (evt) {
	evt.preventDefault(); 
  const titleValue = cardsName.value;
  const linkValue = cardsLink.value;
  const taskString = createTaskDomNode({ title: titleValue, src: linkValue});
  templateElement.prepend(taskString);
}
function openPopupCards() {
  cardElement.classList.add('popup_opened');
}
function closePopupCards() {
  cardElement.classList.remove('popup_opened');
}
function closePopup() {
  popupElement.classList.remove('popup_opened');
}
function openPopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popupElement.classList.add('popup_opened');
}
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function SubmitFormProfile (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.

	// Находим поля формы в DOM
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup ();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
templateElement.append(...result);
formProfile.addEventListener('submit', SubmitFormProfile);
formCards.addEventListener('submit', SubmitFormCards);
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
openCardsButton.addEventListener('click', openPopupCards);
closeCardButton.addEventListener('click', closePopupCards);