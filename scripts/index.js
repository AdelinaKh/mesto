import { Card } from "./Card.js";
import { initialCards } from "./initial_cards.js";
import { openPopup, closePopup } from "./PopupFunc.js"
import { FormValidator } from "./FormValidator.js"
//config
const config = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input-error_shown'
});
//Cards
const cardPopup = document.querySelector('.popup_cards');
const cardsTemplate = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.elements');
const resizeElement = document.querySelector('.popup_resize');
const popupImage = resizeElement.querySelector('.popup__image');
const popupImageTitle = resizeElement.querySelector('.popup__description');
const formCards = cardPopup.querySelector('.popup__content-cards');
const cardsName = formCards.querySelector('.popup__text_input_name');
const cardsLink = formCards.querySelector('.popup__text_input_link');
//Profile
const profilePopup = document.querySelector('.popup_profile');
const profileElement = document.querySelector('.profile');
const formProfile = document.querySelector('.popup__content-profile');
const inputName = formProfile.querySelector('.popup__text_input_name');
const inputJob = formProfile.querySelector('.popup__text_input_job');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__job');
const openProfileButton = profileElement.querySelector('.profile__open-button');
//объявляем инструкции
const createCardItem = (...args) => new Card(...args, cardsTemplate, handleCardClick);
//выводим массив карточек
initialCards.forEach(item => {
  const newCardInitial = createCardItem(item.title, item.src, item.alt, cardsTemplate, handleCardClick);
  cardsContainer.append(newCardInitial.render());
})
//реализация popupResize
function handleCardClick(title, link) {
  popupImage.src = link;
  popupImageTitle.innerText = title;
  openPopup(resizeElement);
}
const submitFormCards = (evt) => {
	evt.preventDefault();
  const titleValue = cardsName.value;
  const linkValue = cardsLink.value;
  const altValue = cardsName.value;
  const taskString = createCardItem(titleValue, linkValue, altValue);
  cardsContainer.prepend(taskString.render());
  //очищаем поля формы  
  formCards.reset();
  validPopupCard.toggleButtonState(cardsName, cardsLink);
  closePopup(cardPopup);
}
formCards.addEventListener('submit', submitFormCards);
//открытие PopupCards
const openCardsButton = document.querySelector('.profile__add-button');
openCardsButton.addEventListener('click', () => {
  openPopup(cardPopup);
});
//открытие PopupProfile
const openPopupProfile = () =>{
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validPopupProfile.resetValidation();
  openPopup(profilePopup);
}
//обработчик «отправки» формы Profile
formProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(profilePopup);
});
openProfileButton.addEventListener('click', openPopupProfile);
//валидация форм
const validPopupCard = new FormValidator(formCards, config);
validPopupCard.enableValidation();
const validPopupProfile = new FormValidator(formProfile, config);
validPopupProfile.enableValidation();

