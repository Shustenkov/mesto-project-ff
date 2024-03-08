const cardTemplate = document.querySelector('#card-template').content;

function removeCard(evt) {
  evt.target.closest('.places__item').remove();
}

function createCard(name, link, callback, likeCallback, imageCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', callback);

  return cardElement;
}

function cardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export {removeCard, createCard, cardLike};
