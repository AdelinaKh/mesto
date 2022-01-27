import '../pages/index.css';
import  { Section }  from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/initial_cards.js";
import { FormValidator } from "../components/FormValidator.js"
import { config } from "../utils/constants.js";
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
const profileElement = document.querySelector('.profile');
const formProfile = document.querySelector('.popup__content-profile');
const inputName = formProfile.querySelector('.popup__text_input_name');
const inputJob = formProfile.querySelector('.popup__text_input_job');
const openProfileButton = profileElement.querySelector('.profile__open-button');
const openCardsButton = document.querySelector('.profile__add-button');
//объявляем инструкции
const createCardItem = (...args) => new Card(...args, cardsTemplate, handleCardClick);
//выводим массив карточек
function renderer(item) {
  const newCardInitial = createCardItem(item.title, item.src, item.alt).render();
  return newCardInitial;
}
const cardList = new Section({ data: initialCards, renderer }, cardsContainer);
cardList.renderItem();
//реализация popupResize
const popupImg = new PopupWithImage('.popup_resize', popupImageTitle, popupImage);
function handleCardClick(title, link) {
  popupImg.open(title, link);
}
//открытие PopupCards
const popupAddCard = new PopupWithForm('.popup_cards', submitHandlerCards);
const openPopupCards = () => {
  popupAddCard.open();
}
function submitHandlerCards() {
  cardList.addItem(createCardItem(cardsName.value, cardsLink.value, cardsName.value).render());
}
//открытие PopupProfile
const initialUser = new UserInfo('.profile__name', '.profile__job');
function submitHandlerProfile(evt, {name, job}) {
  initialUser.setUserInfo({ name: name, job: job });
}
const popupEditProfile = new PopupWithForm('.popup_profile', submitHandlerProfile);
const openPopupProfile = () => {
  const initialUserInfo = initialUser.getUserInfo();
  inputName.value = initialUserInfo.name;
  inputJob.value = initialUserInfo.job;
  popupEditProfile.open();
}
openProfileButton.addEventListener('click', openPopupProfile);
openCardsButton.addEventListener('click', openPopupCards);
// валидация
const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
   // объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};
enableValidation(config);
formValidators[ formCards.getAttribute('name') ].resetValidation();
formValidators[ formProfile.getAttribute('name') ].resetValidation();

