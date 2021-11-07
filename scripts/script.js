const popupElement = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const closeButton = popupElement.querySelector('.popup__close-button');
const openButton = profile.querySelector('.profile__open-button');
const inputName = popupElement.querySelector('.popup__text_input_name');
const inputJob = popupElement.querySelector('.popup__text_input_job');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

function closePopup() {
  popupElement.classList.remove('popup_opened');
}
function openPopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popupElement.classList.add('popup_opened');
}
// Находим форму в DOM
let formElement = popupElement.querySelector('.popup__content');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function SubmitForm (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM
  profileName.textContent = inputName.value
  profileJob.textContent = inputJob.value;
  closePopup ();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', SubmitForm);
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);