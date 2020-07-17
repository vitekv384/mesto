export class FormValidator {
  constructor(form) {
    this._form = form;
    this._inputs = Array.from(this._form.querySelectorAll('input'));
    this._button = this._form.querySelector('button');
  }

  _checkInputValidity = (input, error) => {
    if (error){
      if (input.validity.valueMissing) {
        error.textContent = 'Это обязательное поле' // ;
        return false;
      } else if (input.validity.tooShort || input.validity.tooLong) {

        error.textContent = 'Должно быть от 2 до 30 символов' // ;
        return false;
      } else if (input.validity.typeMismatch && input.type === 'url') {
        error.textContent = 'Здесь должна быть ссылка' // ;
        return false;
      } else{
        error.textContent = ''
      }
    }
    return input.validity.valid;
  };

  _handleErrorElement = (input) => {
    const error = input.parentNode.querySelector(`.popup__error-${input.id}`);
    this._checkInputValidity(input, error);
    this._setSubmitButtonState();
  };

  _setSubmitButtonState = () => {

    let valid;
    if (this._inputs.reduce((acc, el) => this._checkInputValidity(el) && acc, true)
    ) {
      valid = true;
    }
    if (!valid) {
      this._button.setAttribute("disabled", "");
    } else {
      this._button.removeAttribute("disabled");
    }
  };

  setEventListeners = () => {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => this._handleErrorElement(input));
    });
  };

  resetForm = () => {
    this._form.reset();
    this._form.querySelectorAll('.popup__error').forEach(function (item) {
      item.textContent = '';
    });
  };
}
