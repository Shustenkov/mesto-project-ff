let currentModal = undefined;

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keydownHandler);
  modal.removeEventListener('click', overlayClickHandler);
  currentModal = undefined;
}

function openModal(modal) {
  currentModal = modal;
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', keydownHandler);
  modal.addEventListener('click', overlayClickHandler);
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
