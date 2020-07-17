export class UserInfo {

  constructor() {

  }

  returnUserId = () => this._id;

  setUserInfo = (avatar, name, about, id) => {
    this._avatar = `url(${avatar})`;
    this._name = name;
    this._about = about;
    this._id = id
  };

  updateUserInfo = (avatarElement, nameElement, aboutElement) => {
    avatarElement.style.backgroundImage = `url(${this._avatar})`;
    nameElement.textContent = this._name;
    aboutElement.textContent = this._about;
  };
}