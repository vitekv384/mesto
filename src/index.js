import initialCards from './js/InitialCards';
import { Api } from './classes/Api';
import { Card } from './classes/Card';
import { CardList } from './classes/CardList';
import { FormValidator } from './classes/FormValidator';
import { Popup } from './classes/Popup';
import { UserInfo } from './classes/UserInfo';
import "./pages/index.css";
(function () {
  // Элементы DOM
  const placesList = document.querySelector('.places-list');
  const cardOpenButton = document.querySelector('.user-info__button');
  const profileOpenButton = document.querySelector('.profile__edit-button');
  const popupCards = document.querySelector('#cards');
  const popupProfile = document.querySelector('#profile');
  /*
    Можно лучше: user-info__name это не input, название переменной вводит в заблуждение.
   */
  const inputNameProfile = document.querySelector('.user-info__name');
  /*
    Можно лучше: user-info__job это не input, название переменной вводит в заблуждение.
   */
  const inputAboutProfile = document.querySelector('.user-info__job');
  const popupImage = document.querySelector('#image');
  const imageElement = popupImage.querySelector('.popup__image');
  const avatar = document.querySelector('.user-info__photo')
  const formCards = document.forms.cards;
  const formProfile = document.forms.profile;

  //Функция показа картинки
  const handleImage = (image) => {
    imageElement.setAttribute('src', image);
    imagePopup.open();
  };
  //config Api
  const config = {
    baseUrl: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: '67eb4925-2dcd-40c7-b5ed-df16b998e18c',
      'Content-Type': 'application/json'
    }
  };

  //Объекты классов
  const api = new Api(config);
  /*
    Можно лучше: Благодаря поднятию в js можно использовать переменные и функции до их физического объявления в коде,
    но лучше этого не делать, так как код становится хуже читаемым и непоследовательным.
   */
  /*
    Можно лучше: Функция не устанавливает элемент карточки, а создаёт его. Не совсем корректное название.
   */
  const setCardElement = (...arg) => new Card(...arg, userInfo.returnUserId(), api).create();
  const cardList = new CardList(placesList);
  const addCard = (...arg) => cardList.addCard(...arg);
  const cardsPopup = new Popup(popupCards);
  const profilePopup = new Popup(popupProfile);
  const imagePopup = new Popup(popupImage);
  const userInfo = new UserInfo();
  const formValidatorCards = new FormValidator(formCards);
  const formValidatorProfile = new FormValidator(formProfile);

  api.getUserInfo()
    .then((result) => {
      userInfo.setUserInfo(result.avatar, result.name, result.about, result._id);
      userInfo.updateUserInfo(avatar, inputNameProfile, inputAboutProfile)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

  api.getInitialCards()
    .then((result) => {
      cardList.render(setCardElement, result, handleImage);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  /*
    Можно лучше: Установку обработчиков можно делать в конструкторе Popup'а,
    иначе есть шанс забыть это сделать вручную, что приведёт к багам и нерабочему функционалу.
   */
  cardsPopup.setEventListener();
  profilePopup.setEventListener();
  imagePopup.setEventListener();
  /*
    Можно лучше: Установку обработчиков можно делать в конструкторе FormValidator'а,
    иначе есть шанс забыть это сделать вручную, что приведёт к багам и нерабочему функционалу.
   */
  formValidatorProfile.setEventListeners();
  formValidatorCards.setEventListeners();

  const handleCardPopup = () => {
    formCards.elements.button.setAttribute('disabled', '');
    formValidatorCards.resetForm();
    cardsPopup.open();
  };

  const handleProfilePopup = () => {
    formProfile.elements.button.removeAttribute('disabled');
    formValidatorProfile.resetForm();
    formProfile.elements.name.value = inputNameProfile.textContent;
    formProfile.elements.about.value = inputAboutProfile.textContent;
    profilePopup.open();
  };

  const handleFormProfile = (event) => {
    event.preventDefault();
    api.postUserInfo(formProfile.elements.name.value, formProfile.elements.about.value)
    .then(() => {
      /*
        Можно лучше: Обновление информации о пользователе на странице должно происходить
        через комбинацию методов setUserInfo и updateUserInfo класса UserInfo.
        Иначе дублируется логика. Должен быть единый центр ответственности для данного функционала.
       */
      inputNameProfile.textContent = formProfile.elements.name.value;
      inputAboutProfile.textContent = formProfile.elements.about.value;
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  };

  const handleFormCards = (event) => {
    event.preventDefault();
    const { title, link } = formCards.elements;
    api.saveNewCard(title.value, link.value)
    .then(() => {
      addCard(setCardElement(title.value, link.value, handleImage));
      cardsPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  };

  cardOpenButton.addEventListener('click', handleCardPopup);
  profileOpenButton.addEventListener('click', handleProfilePopup);
  formProfile.addEventListener('submit', handleFormProfile);
  formCards.addEventListener('submit', handleFormCards);
})();

/*
  Резюме по работе:
  Отлично! Просьба над остальными замечаниями тоже подумать.

  Что понравилось:
  - выполнено дополнительное задание с добавлением карточек;
  - выполнено дополнительное задание с удалением карточек;
  - одинаковое форматирование кода;
  - используется конфиг для класса Api, параметры не дублируются в каждом запросе.

  Что можно улучшить:
  - корректно называть переменные и функции исходя из их предназначения;
  - установку обработчиков делать в конструкторе Popup'а и FormValidator'а;
  - проверку ответа вынести в отдельный метод;
  - упростить метод CardList.render;
  - в качестве второго параметра метода addEventListener использовать ранее объявленную функцию;
  - не использовать переменные и функции до их инициализации.

  Успехов в дальнейшем обучении!
 */
