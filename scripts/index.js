// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const cardContainer = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function removeCard(evt) {
  evt.target.closest('.places__item').remove();
}

function createCard(name, link, callback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', callback);

  return cardElement;
}

initialCards.forEach((element) => cardContainer.append(createCard(element.name, element.link, removeCard)));
