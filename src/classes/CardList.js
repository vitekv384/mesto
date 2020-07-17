export class CardList {
  constructor(container) {
    this._container = container;
  }

  addCard = (card) => this._container.append(card);

  /*
    Можно лучше: Метод труден для восприятия, параметр card почему-то используется как функция.
   */
  render = (card, arr, handleImage) => arr.forEach(item => this.addCard(card(item.name, item.link, handleImage, item.owner._id, item._id, item.likes.length)));
}
