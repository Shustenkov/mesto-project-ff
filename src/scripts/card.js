import {deleteCard, putLikeCard, removeLikeCard} from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(name, link, likesAmount, cardId, userIsOwner, likedByUser, imageCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikeCounter.textContent = likesAmount;

  if (userIsOwner) {
    cardDeleteButton.addEventListener('click', () => removeCard(cardElement, cardId));
  } else {
    cardDeleteButton.remove();
  }

  if (likedByUser) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => imageCallback(link, name));
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardLikeCounter, cardId));

  return cardElement;
}

function removeCard(card, cardId) {
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(button, cardLikeCounter, cardId) {
  const likeMethod = button.classList.contains('card__like-button_is-active') ? removeLikeCard : putLikeCard;
  likeMethod(cardId)
    .then((res) => {
      cardLikeCounter.textContent = res.likes.length; 
      button.classList.toggle('card__like-button_is-active'); 
    })
    .catch((err) => {
      console.log(err);
    });
}

export {createCard};
