const popup = document.querySelector('.popup');
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
const initialCards = [
  {
    alt: 'Капова пещера',
    title: 'Капова пещера', 
    src: 'images/CapovaPeshera.jpg'
  },
  {
    alt: 'Гора Куштау', 
    title: 'Гора Куштау', 
    src: 'images/GoraKushtay.jpg'
  },
  {
    alt: 'Инзерские зубчатки',
    title: 'Инзерские зубчатки', 
    src: 'images/InzerskieZubchatki.jpg'
  },
  {
    alt: 'Мурадымовское ущелье',
    title: 'Мурадымовское ущелье', 
    src: 'images/MuradymovskoeUshelie.jpg'
  },
  {
    alt: 'Нугушское водохранилище',
    title: 'Нугушское водохранилище', 
    src: 'images/NugushskoeVodohranilishe.jpg'
  },
  {
    alt: 'Водопад Атыш',
    title: 'Водопад Атыш', 
    src: 'images/VodopadAtysh.jpg'
  }
];
const cardPopup = document.querySelector('.popup_cards');
const templateElement = document.querySelector('.elements');
const formCards = document.forms.cards_form;
const cardsName = formCards.elements.name;
const cardsLink = formCards.elements.link;
const template = document.querySelector('.template');
const openCardsButton = profileElement.querySelector('.profile__add-button');
const buttonCloseCard = cardPopup.querySelector('.popup__close-button');
const resizeElement = document.querySelector('.popup_resize');
const buttonCloseImage = resizeElement.querySelector('.popup__close-button');
const createTaskDomNode = (item) => {
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
  //popupResize
  const openImage = resizeElement.querySelector('.popup__image');
  const titleImage = resizeElement.querySelector('.popup__description');
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
 	return createTaskDomNode(item);
 });
//Обработчик формы 
function submitFormCards (evt) {
	evt.preventDefault(); 
  const titleValue = cardsName.value;
  const linkValue = cardsLink.value;
  const taskString = createTaskDomNode({ title: titleValue, src: linkValue});
  templateElement.prepend(taskString);
  formCards.reset();
  closePopup(cardPopup);
}
//Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//Функция открытия PopupProfile
function openPopupProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popup);
}
//Функция открытия PopupCards
function openPopupCards() {
  openPopup(cardPopup);
}
//Закрытие popup ESC
const keyHandler = (evt) => {
if (evt.key === 'Escape') {
  closePopup(cardPopup);
  closePopup(profilePopup);
  }
}
//Закрытие popup overlay
document.addEventListener('click', (e) => {
  if(e.target === cardPopup) {
  closePopup(cardPopup);
  }
});
document.addEventListener('click', (e) => {
  if(e.target === profilePopup) {
  closePopup(profilePopup);
  }
});
buttonCloseCard.addEventListener('click', () =>{
  closePopup(cardPopup);
});
buttonCloseImage.addEventListener('click', () =>{
  closePopup(resizeElement);
});
buttonCloseProfile.addEventListener('click', () =>{
  closePopup(profilePopup);
});
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
formProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popup);
});
templateElement.append(...result);
formCards.addEventListener('submit', submitFormCards);
openProfileButton.addEventListener('click', openPopupProfile);
openCardsButton.addEventListener('click', openPopupCards);
document.addEventListener('keydown', keyHandler);