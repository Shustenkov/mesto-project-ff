import '../pages/index.css';
import {initialCards} from './cards.js';

const container = document.querySelector('.content');
const cardContainer = container.querySelector('.places__list');

import {removeCard, createCard, cardLike} from './card.js';

initialCards.forEach((element) => cardContainer.append(createCard(element.name, element.link, removeCard, cardLike, cardImagePopup)));

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

//edit vars
const editFormElement = editPopup.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');
const editSubmitButton = editFormElement.querySelector('.popup__button');

const profileInfo = document.querySelector('.profile__info');
const title = profileInfo.querySelector('.profile__title');
const description = profileInfo.querySelector('.profile__description');

//new card vars
const newCardFormElement = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = newCardFormElement.querySelector('.popup__input_type_url');
const newCardSubmitButton = newCardFormElement.querySelector('.popup__button');

import {closeModal, openModal} from './modal.js';

function cleanEditPopup() {
  editSubmitButton.removeEventListener('click', handleEditFormSubmit);
}

function cleanNewCardPopup() {
  newCardSubmitButton.removeEventListener('click', handleNewCardFormSubmit);
  cardNameInput.value = '';
  cardUrlInput.value = '';
}

function cardImagePopup(src, alt) {
  const img = imagePopup.querySelector('.popup__image');
  const caption = imagePopup.querySelector('.popup__caption');
  img.src = src;
  img.alt = alt;
  caption.textContent = alt;
  openModal(imagePopup);
}

function cardClickHandler(evt) {
  const item = evt.target;
  if (item.classList.contains('card__image')) {
    cardImagePopup(item.src, item.alt);
  } else if (item.classList.contains('card__like-button')) {
    cardLike(evt);
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closeModal(editPopup);
}

function editPopupHandler(evt) {
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
  editSubmitButton.addEventListener('click', handleEditFormSubmit);
  openModal(editPopup, cleanEditPopup);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard(cardNameInput.value, cardUrlInput.value, removeCard, cardLike, cardImagePopup));
  closeModal(newCardPopup);
}

function newCardPopupHandler(evt) {
  newCardSubmitButton.addEventListener('click', handleNewCardFormSubmit);
  openModal(newCardPopup, cleanNewCardPopup);
}

editButton.addEventListener('click', editPopupHandler);
addButton.addEventListener('click', newCardPopupHandler);
cardContainer.addEventListener('click', cardClickHandler);
