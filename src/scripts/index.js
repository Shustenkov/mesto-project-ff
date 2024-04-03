import '../pages/index.css';
import {createCard} from './card.js';
import {closeModal, openModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUserInfo, getInitialCards, editProfile, editAvatar, createNewCard} from './api.js';

const container = document.querySelector('.content');
const cardContainer = container.querySelector('.places__list');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const popupEditAvatarCloseButton = popupEditAvatar.querySelector('.popup__close');
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

const formPopupAvatar = popupEditAvatar.querySelector('.popup__form');
const avatarUrlInput = popupEditAvatar.querySelector('.popup__input_type_url');

//new card vars
const formPopupNewCard = popupNewCard.querySelector('.popup__form');
const cardNameInput = formPopupNewCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = formPopupNewCard.querySelector('.popup__input_type_url');

//validation vars
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    initialCards.forEach((card) => {
      let userIsOwner = false;
      let likedByUser = false;

      if (userInfo._id === card.owner._id) {
        userIsOwner = true;
      }

      if (card.likes.some((likerInfo) => likerInfo._id===userInfo._id)) {
        likedByUser = true;
      }

      cardContainer.append(createCard(card.name, card.link, card.likes.length, card._id, userIsOwner, likedByUser, handleCardImagePopupOpen));
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);

function renderLoading(form, isLoading) {
  if (isLoading) {
    form.querySelector('.popup__button').textContent = 'Сохранение...';
  } else {
    form.querySelector('.popup__button').textContent = 'Сохранить';
  }
}

function handleCardImagePopupOpen(src, alt) {
  popupImagePicture.src = src;
  popupImagePicture.alt = alt;
  popupImageCaption.textContent = alt;
  openModal(popupImage);
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(formPopupProfile, true);

  editProfile(nameInput.value, jobInput.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeModal(popupEditProfile);
      renderLoading(formPopupProfile, false);
    });
}

function handleAvatarEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(formPopupAvatar, true);

  editAvatar(avatarUrlInput.value)
    .then((userInfo) => {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeModal(popupEditAvatar);
      renderLoading(formPopupAvatar, false);
    });
}

function handleProfileEditPopupOpen(evt) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
  clearValidation(formPopupProfile, validationConfig);
}

function handleAvatarEditPopupOpen(evt) {
  avatarUrlInput.value = '';
  openModal(popupEditAvatar);
  clearValidation(formPopupAvatar, validationConfig);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(formPopupNewCard, true);

  createNewCard(cardNameInput.value, cardUrlInput.value)
    .then((newCardData) => {
      cardContainer.prepend(createCard(newCardData.name, newCardData.link, newCardData.likes.length, newCardData._id, true, false, handleCardImagePopupOpen));
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      closeModal(popupNewCard);
      renderLoading(formPopupNewCard, false);
    });
}

function handleNewCardPopupOpen(evt) {
  cardNameInput.value = '';
  cardUrlInput.value = '';
  openModal(popupNewCard);
  clearValidation(formPopupNewCard, validationConfig);
}

buttonEditProfile.addEventListener('click', handleProfileEditPopupOpen);
profileImage.addEventListener('click', handleAvatarEditPopupOpen);
buttonNewCard.addEventListener('click', handleNewCardPopupOpen);
formPopupProfile.addEventListener('submit', handleProfileEditFormSubmit);
formPopupAvatar.addEventListener('submit', handleAvatarEditFormSubmit);
formPopupNewCard.addEventListener('submit', handleNewCardFormSubmit);
popupEditProfileCloseButton.addEventListener('click', () => closeModal(popupEditProfile));
popupEditAvatarCloseButton.addEventListener('click', () => closeModal(popupEditAvatar));
popupNewCardCloseButton.addEventListener('click', () => closeModal(popupNewCard));
popupImageCloseButton.addEventListener('click', () => closeModal(popupImage));
