//profile
const profilePopup = document.querySelector('.popup_profile');
const profileElement = document.querySelector('.profile');
const formProfile = document.forms.profile_form;
const inputName = formProfile.elements.name;
const inputJob = formProfile.elements.job;
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__job');
const buttonCloseProfile = profilePopup.querySelector('.popup__close-button');
const openProfileButton = profileElement.querySelector('.profile__open-button');
//cards
const cardPopup = document.querySelector('.popup_cards');
const cardsContainer = document.querySelector('.elements');
const formCards = document.forms.cards_form;
const cardsName = formCards.elements.name;
const cardsLink = formCards.elements.link;
const template = document.querySelector('.template');
const openCardsButton = profileElement.querySelector('.profile__add-button');
const buttonCloseCard = cardPopup.querySelector('.popup__close-button');
//popupResize
const resizeElement = document.querySelector('.popup_resize');
const openImage = resizeElement.querySelector('.popup__image');
const titleImage = resizeElement.querySelector('.popup__description');
const buttonCloseImage = resizeElement.querySelector('.popup__close-button');
const createCard = (item) => {
  const cardsTemplate = template.content.querySelector('.element').cloneNode(true);
  const elementTitle = cardsTemplate.querySelector('.element__title');
  const elementImage = cardsTemplate.querySelector('.element__image');
  elementTitle.textContent = item.title;
  elementImage.src = item.src;
  elementImage.alt = item.alt;
  //кнопка delete
  const deleteButton = cardsTemplate.querySelector('.element__delete');
	deleteButton.addEventListener('click', () => {
		cardsTemplate.remove();
	});
  //кнопка like
  const likeButton = cardsTemplate.querySelector('.element__like');
  likeButton.addEventListener('click', function (evt){
    evt.preventDefault();
    evt.currentTarget.classList.toggle('element__like_active');
  });
  //открытие popupResize
  elementImage.addEventListener('click', function (evt){
   evt.preventDefault();
   openImage.src = evt.currentTarget.src;
   openImage.alt = evt.currentTarget.alt;
   titleImage.textContent = evt.currentTarget.alt;
   openPopup(resizeElement);
  });
  return cardsTemplate;
}
 const result = initialCards.map((item) => {
 	return createCard(item);
 });
//кнопка submit
const buttonSubmit = formCards.querySelector('.popup__save-button');
//Обработчик формы карточек
function submitFormCards (evt) {
	evt.preventDefault(); 
  const titleValue = cardsName.value;
  const linkValue = cardsLink.value;
  const taskString = createCard({ title: titleValue, src: linkValue});
  cardsContainer.prepend(taskString);
  //Очищаем поля формы  
  formCards.reset();
  //Деактивируем кнопку
  buttonSubmit.disabled = true;
  buttonSubmit.classList.add('popup__save-button_disabled');
  closePopup(cardPopup);
}
//Функция открытия popup
function openPopup(openedPopup) {
  openedPopup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('click', closeByOverlay);
}
//Функция закрытия popup
function closePopup(openedPopup) {
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', closeByOverlay);
}
//Функция открытия PopupProfile
function openPopupProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(profilePopup);
}
//Открытие popup cards
openCardsButton.addEventListener('click', () => openPopup(cardPopup));
//Закрытие popup нажатием на ESC
const keyHandler = (evt) => {
if (evt.key === 'Escape') {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
  }
}
//Закрытие popup при клике на overlay
const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}
buttonCloseCard.addEventListener('click', () =>{
  closePopup(cardPopup);
});
buttonCloseImage.addEventListener('click', () =>{
  closePopup(resizeElement);
});
buttonCloseProfile.addEventListener('click', () =>{
  closePopup(profilePopup);
});
// Обработчик «отправки» формы profile
formProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(profilePopup);
});
cardsContainer.append(...result);
formCards.addEventListener('submit', submitFormCards);
openProfileButton.addEventListener('click', openPopupProfile);
