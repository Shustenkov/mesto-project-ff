let currentModal = undefined;
let modalCloseButton = undefined;
let cleanCallback = undefined;

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modalCloseButton.removeEventListener('click', closeModalHandler);
  document.removeEventListener('keydown', keydownHandler);
  modal.removeEventListener('click', overlayClickHandler);
  cleanCallback();
  currentModal = undefined;
  modalCloseButton = undefined;
  cleanCallback = undefined;
}

function openModal(modal, callback=()=>{}) {
  currentModal = modal;
  cleanCallback = callback;
  modalCloseButton = modal.querySelector('.popup__close');
  modal.classList.add('popup_is-opened');
  modalCloseButton.addEventListener('click', closeModalHandler);
  document.addEventListener('keydown', keydownHandler);
  modal.addEventListener('click', overlayClickHandler);
}

function closeModalHandler(evt) {
  closeModal(currentModal);
}

function keydownHandler(evt) {
  if (evt.key === 'Escape') {
    closeModal(currentModal);
  }
}

function overlayClickHandler(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(currentModal);
  }
}

export {closeModal, openModal};
