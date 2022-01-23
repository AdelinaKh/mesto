import '../pages/index.css';
import  { Section }  from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial_cards.js";
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
const openCardsButton = document.querySelector('.profile__add-button');
//объявляем инструкции
const createCardItem = (...args) => new Card(...args, cardsTemplate, handleCardClick);
//выводим массив карточек
function renderer(item) {
  const newCardInitial = createCardItem(item.title, item.src, item.alt).render();
  return newCardInitial;
}
const initialCardList = new Section({ data: initialCards, renderer }, cardsContainer);
initialCardList.renderItem();
//реализация popupResize
function handleCardClick(title, src) {
  const popupImg = new PopupWithImage(resizeElement, title, src);
  popupImg.open();
}
//открытие PopupProfile
const profileFormSubmit = () => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
}
const openPopupProfile = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validPopupProfile.resetValidation();
  const popupEditProfile = new PopupWithForm(profilePopup, profileFormSubmit);  
  const currentUserInfo = new UserInfo(profileName, profileJob);
  popupEditProfile.open();
}
openProfileButton.addEventListener('click', openPopupProfile);
//открытие PopupCards
function cardFormSubmit() {
  const cardInputs = [
    {    
      title: cardsName.value,
      src: cardsLink.value,
      alt: cardsName.value,
    }
  ];
  const currentCard = new Section({ data: cardInputs, renderer }, cardsContainer);
  currentCard.renderItem();
}
const openPopupCards = () => {
  validPopupCard.toggleButtonState();
  const popupAddCard = new PopupWithForm(cardPopup, cardFormSubmit);
  popupAddCard.open();
}
openCardsButton.addEventListener('click', openPopupCards);
//валидация форм
const validPopupCard = new FormValidator(formCards, config);
validPopupCard.enableValidation();
const validPopupProfile = new FormValidator(formProfile, config);
validPopupProfile.enableValidation();