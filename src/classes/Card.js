export class Card {
  constructor(title, link, handleImage, ownerId, cardId, likes, userId, api) {
    this._title = title;
    this._link = link;
    this.handleImage = handleImage;
    this._userId = userId;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._api = api;
    this._likes = likes;
  }

  create = () => {
    const placeCard = document.createElement('div');
    const cardImage = document.createElement('div');
    const deleteButton = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardTitle = document.createElement('h3');
    const likeContent = document.createElement('div');
    const likeButton = document.createElement('button');
    const likeCount = document.createElement('p');

    placeCard.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    deleteButton.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardTitle.classList.add('place-card__title');
    likeContent.classList.add('place-card__like-content');
    likeButton.classList.add('place-card__like-icon');
    likeCount.classList.add('place-card__like-count');

    placeCard.appendChild(cardImage);
    placeCard.appendChild(cardDescription);
    cardImage.appendChild(deleteButton);
    cardDescription.appendChild(cardTitle);
    cardDescription.appendChild(likeContent);
    likeContent.appendChild(likeButton);
    likeContent.appendChild(likeCount);

    cardImage.style.backgroundImage = `url(${this._link})`;
    cardTitle.textContent = this._title;
    if (this._likes) {
      likeCount.textContent = this._likes;
    } else {
      likeCount.textContent = 0;
    }
    this.card = placeCard;
    if (this._ownerId === this._userId) {
      deleteButton.style.display = 'block'
    }
    this.setEventListeners();
    return this.card;
  };

  _remove = (event) => {
    event.stopImmediatePropagation()
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this._api.deleteCard(this._cardId)
        .then(() => {
          this.card.remove();
          this.card.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
          this.card.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
          this.card.querySelector('.place-card__image').removeEventListener('click', this._openImage);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  };

  _openImage = () => {
    const image = this.card.querySelector('.place-card__image').style.backgroundImage.slice(5, -2);
    this.handleImage(image);
  };

  _like = () => this.card.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');

  setEventListeners = () => {
    this.card.querySelector('.place-card__delete-icon').addEventListener('click', this._remove);
    this.card.querySelector('.place-card__like-icon').addEventListener('click', this._like);
    this.card.querySelector('.place-card__image').addEventListener('click', this._openImage);
  };
}
