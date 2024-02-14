// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const cardConatainer = container.querySelector('.places__list');

function removeCard(evt) {
  evt.target.parentElement.remove();
}

function addCard(name, link, callback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;

  cardElement.querySelector('.card__delete-button').addEventListener('click', callback);

  return cardElement;
}

initialCards.forEach((element) => cardConatainer.append(addCard(element.name, element.link, removeCard)));
