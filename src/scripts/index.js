import '../pages/index.css';
import {initialCards} from './cards.js';

const container = document.querySelector('.content');
const cardContainer = container.querySelector('.places__list');

import {createCard} from './card.js';

initialCards.forEach((element) => cardContainer.append(createCard(element.name, element.link, handleCardImagePopupOpen)));

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');
const popupImageCloseButton = popupImage.querySelector('.popup__close');

//img popup vars
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

//edit vars
const formPopupProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formPopupProfile.querySelector('.popup__input_type_name');
const jobInput = formPopupProfile.querySelector('.popup__input_type_description');

const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

//new card vars
const formPopupNewCard = popupNewCard.querySelector('.popup__form');
const cardNameInput = formPopupNewCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = formPopupNewCard.querySelector('.popup__input_type_url');

import {closeModal, openModal} from './modal.js';

function handleCardImagePopupOpen(src, alt) {
  popupImagePicture.src = src;
  popupImagePicture.alt = alt;
  popupImageCaption.textContent = alt;
  openModal(popupImage);
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfile);
}

function handleProfileEditPopupOpen(evt) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard(cardNameInput.value, cardUrlInput.value, handleCardImagePopupOpen));
  closeModal(popupNewCard);
}

function handleNewCardPopupOpen(evt) {
  cardNameInput.value = '';
  cardUrlInput.value = '';
  openModal(popupNewCard);
}

buttonEditProfile.addEventListener('click', handleProfileEditPopupOpen);
buttonNewCard.addEventListener('click', handleNewCardPopupOpen);
formPopupProfile.addEventListener('submit', handleProfileEditFormSubmit);
formPopupNewCard.addEventListener('submit', handleNewCardFormSubmit);
popupEditProfileCloseButton.addEventListener('click', () => closeModal(popupEditProfile));
popupNewCardCloseButton.addEventListener('click', () => closeModal(popupNewCard));
popupImageCloseButton.addEventListener('click', () => closeModal(popupImage));
