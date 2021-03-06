import '../pages/index.css';
import  { Section }  from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { config } from "../utils/constants.js";
import { Api } from "../components/Api.js";
//Cards
const cardPopup = document.querySelector('.popup_cards');
const cardsTemplate = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.elements');
const resizeElement = document.querySelector('.popup_resize');
const popupImage = resizeElement.querySelector('.popup__image');
const popupImageTitle = resizeElement.querySelector('.popup__description');
const formCards = cardPopup.querySelector('.popup__content-cards');
const popupConfirmDel = document.querySelector('.popup_delete-card');
const deleteBtn = document.querySelector('.card__delete');
const confirmBtn = popupConfirmDel.querySelector('.popup__save-button');
//Profile
const profileElement = document.querySelector('.profile');
const formProfile = document.querySelector('.popup__content-profile');
const inputName = formProfile.querySelector('.popup__text_input_name');
const inputJob = formProfile.querySelector('.popup__text_input_job');
const openProfileButton = profileElement.querySelector('.profile__open-button');
const openCardsButton = document.querySelector('.profile__add-button');
const formAvatar = document.querySelector('.popup__content-avatar');
const inputAvatarLink = formAvatar.querySelector('.popup__text_input_link');
const openAvatarEdit = document.querySelector('.profile__avatar');
const submitBtn = formAvatar.querySelector('.popup__save-button');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: 'ca29b227-17c7-4423-a03d-c2e1486957f2',
    'Content-Type': 'application/json'
  }
});

let user;
let avatar;
let cardId;

const createCardItem = (...args) => new Card(...args, cardsTemplate, handlerCardClick, handlerDeleteCard, handlerCardLike, api);
//?????????????? ???????????? ????????????????
function renderer(item) {
  cardId = item._id;
  const newCardInitial = createCardItem(item, user).render();
  return newCardInitial;
}

const cardList = new Section({ renderer }, cardsContainer, api);
const initialUser = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
//???????????????? ?????????????????? ???????????? ???????????????? ?? ??????????????
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    console.log(cardData)
    console.log(userData)
//???????????? ????????????????
    user = userData._id;
//?????????????? ????????????????
    cardList.renderItems(cardData);
//???????????? ??????????????
    initialUser.setUserInfo({ name: userData.name, job: userData.about });
    avatar = userData.avatar;
    initialUser.setAvatarInfo(userData.avatar);
    })
    .catch((err) => {
      console.log(`????????????: ${err}`);
    })
  //????????????/?????????????? ????????
  function handlerCardLike() {
    if(this.isLiked) {
      api.deleteLike(this._id)
        .then((data) => {
          this.unsetLike();
          this.updateLikes(data.likes);
        })
        .catch((err) => {
          console.log(`????????????: ${err}`);
        })
    } else {
      api.postLike(this._id)
        .then((data) => {
          this.setLike();
          this.updateLikes(data.likes);
        })
        .catch((err) => {
          console.log(`????????????: ${err}`);
        })
    }
  }
//???????????????? PopupCards
const popupAddCard = new PopupWithForm('.popup_cards', submitHandlerCards, api);
popupAddCard.setEventListeners();
const openPopupCards = () => {
  popupAddCard.open();
  formValidators[ formCards.getAttribute('name') ].resetValidation();
}
//???????????????????? ?????????? ????????????????
function submitHandlerCards(evt, {title, subtitle}) {
  evt.preventDefault();
  popupAddCard.renderLoading(true);
  api.postNewCard({title, subtitle})
    .then((data) => {
      const newCard = createCardItem(data, user).render();
      cardList.addItem(newCard);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`????????????: ${err}`);
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    })
}
//?????????????????? ???????????? ??????????????
function submitHandlerProfile(evt, {title, subtitle}) {
  evt.preventDefault();
  popupEditProfile.renderLoading(true);
  api.editUserInfo({title, subtitle})
    .then((data) => {
      initialUser.setUserInfo({ name: data.name, job: data.about });
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`????????????: ${err}`);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
}
//???????????????? ????????????????
const popupDeleteCard = new PopupWithConfirm('.popup_delete-card');
popupDeleteCard.setEventListeners();
function handlerDeleteCard() {
  popupDeleteCard.open();
  popupDeleteCard.setSubmitAction(() => {
    api.deleteCard(this._id)
      .then((data) => {
        this._element.remove();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(`????????????: ${err}`);
      })
  })
}
//???????????????????? popupResize
const popupImg = new PopupWithImage('.popup_resize', popupImageTitle, popupImage);
popupImg.setEventListeners();
function handlerCardClick(title, link) {
  popupImg.open(title, link);
}
//?????????????????? ??????????????
const popupEditAvatar = new PopupWithForm('.popup_avatar-update', submitHandlerAvatar, api);
popupEditAvatar.setEventListeners();
const openPopupAvatar = () => {
  const initialAvatar = initialUser.getAvatarInfo();
  inputAvatarLink.value = initialAvatar.avatar;
  popupEditAvatar.open();
  formValidators[ formProfile.getAttribute('name') ].resetValidation();
}

function submitHandlerAvatar(evt, avatar) {
  evt.preventDefault();
  popupEditAvatar.renderLoading(true);
  api.editAvatar(avatar)
    .then((data) => {
      initialUser.setAvatarInfo(data.avatar)
      popupEditAvatar.close()
    })
    .catch((err) => {
      console.log(`????????????: ${err}`);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    })
}

const popupEditProfile = new PopupWithForm('.popup_profile', submitHandlerProfile, api);
popupEditProfile.setEventListeners();
const openPopupProfile = () => {
  const initialUserInfo = initialUser.getUserInfo();
  inputName.value = initialUserInfo.name;
  inputJob.value = initialUserInfo.job;
  popupEditProfile.open();
  formValidators[ formProfile.getAttribute('name') ].resetValidation();
}
//???????????????? Popup
openAvatarEdit.addEventListener('click', openPopupAvatar);
openProfileButton.addEventListener('click', openPopupProfile);
openCardsButton.addEventListener('click', openPopupCards);
// ??????????????????
const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    // ???????????????? ???????????? ???? ???????????????? `name` ?? ??????????
    const formName = formElement.getAttribute('name');
   // ???????????? ???????????????????? ?????? ???????????? ??????????
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};
enableValidation(config);
