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

  /*
    Можно лучше: Dom-элементы лучше передавать в конструктор, чтобы каждый раз не передавать в метод,
    экземпляр класса связывается с конкретными dom-элементами и их и должен обновлять в процессе своей работы.
   */
  updateUserInfo = (avatarElement, nameElement, aboutElement) => {
    avatarElement.style.backgroundImage = `url(${this._avatar})`;
    nameElement.textContent = this._name;
    aboutElement.textContent = this._about;
  };
}
