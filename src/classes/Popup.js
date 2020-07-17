export class Popup {

  constructor(popup) {
    this._popup = popup;
  }

  open = () => this._popup.classList.add('popup_is-opened');
  close = () => this._popup.classList.remove('popup_is-opened');

  setEventListener = () => this._popup.querySelector('.popup__close').addEventListener('click', this.close);
}
