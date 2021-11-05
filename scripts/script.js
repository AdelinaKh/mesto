const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__close-button');
let profile = document.querySelector('.profile');
const openButton = profile.querySelector('.popup__open-button');

function closePopup() {
  popupElement.classList.remove('popup_opened');
}
function openPopup() {
  popupElement.classList.add('popup_opened');
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = popupElement.querySelector('.popup__container');// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM
  // Получите значение полей из свойства value
	let nameInput = popupElement.querySelector('.popup__text_input_name').value;// Воспользуйтесь инструментом .querySelector()
	let jobInput = popupElement.querySelector('.popup__text_input_job').value;// Воспользуйтесь инструментом .querySelector()
	// Выберите элементы, куда должны быть вставлены значения полей
  const name = profile.querySelector('.profile__name');
  const job = profile.querySelector('.profile__job');
	// Вставьте новые значения с помощью textContent
  name.textContent = nameInput;
  job.textContent = jobInput;
  popupElement.classList.remove('popup_opened');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
