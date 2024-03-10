const cardTemplate = document.querySelector('#card-template').content;

function createCard(name, link, imageCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardElement));
  cardImage.addEventListener('click', () => imageCallback(link, name));
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));

  return cardElement;
}

function removeCard(card) {
  card.remove();
}

function likeCard(button) {
  button.classList.toggle('card__like-button_is-active');
}

export {createCard};
