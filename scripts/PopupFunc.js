//Функция открытия popup
export function openPopup (openedPopup) {
  openedPopup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('click', closeByXOverlay);
}
//Функция закрытия popup
export function closePopup(openedPopup) {
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', closeByXOverlay);
}
//Закрытие popup нажатием на ESC
function keyHandler (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
//Закрытие popup при клике на Overlay и на X
function closeByXOverlay(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}