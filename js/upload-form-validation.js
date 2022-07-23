import { sendData } from './api.js';
import { inputUploadChangeHandler, closeUploadForm} from './upload-form.js';

// Константы для валидации формы

const MAX_NUMBER_OF_HASHTAGS = 5;
const MAX_IMAGE__DESCRIPTION__LENGTH = 140;
const uploadFormElement = document.querySelector('#upload-select-image');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const uploadImageDescriptionElement = uploadFormElement.querySelector('.text__description');
const imageUploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview').querySelector('img');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

// Константы для SuccessMessage и ErrorMessage

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

// Функции для валидации хештегов

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtagContent = (value) => {
  if (value === '') { return true; }

  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const arrayOfMessages = value.trim().split(/\s+/);
  return arrayOfMessages.every((item) => re.test(item));
};

const isValidLength = (value) => {
  if (value === '') { return true; }

  const arrayOfMessages = value.trim().split(/\s+/);
  return arrayOfMessages.every((item) => item.length > 1 && item.length < 20);
};

const checkNumberOfHashtags = (value) => {
  const arrayOfMessages = value.trim().split(/\s+/);
  return arrayOfMessages.length <= MAX_NUMBER_OF_HASHTAGS;
};

const findSameElements = (value) => {
  const arrayOfMessages = value.trim().toLowerCase().split(/\s+/);
  return arrayOfMessages.every((item, index, array) => array.slice(index + 1, array.length).every((elem) => elem !== item));
};

const checkSpaces = (value) => {
  const re = /[0-9a-z_]#$/;
  return !re.test(value);
};

// Функции блокировки и разблокировки submit-кнопки

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

// Функции создания и удаления сообщения об успешной загрузке
let successMessageElement, successButtonElement;

const createSuccessMessage = () => {
  const documentFragment = document.createDocumentFragment();
  successMessageElement = successMessageTemplate.cloneNode(true);
  documentFragment.append(successMessageElement);
  document.body.append(documentFragment);
  successButtonElement = successMessageElement.querySelector('.success__button');
};

const removeSuccessMessage = () => {
  successMessageElement.remove();
  document.removeEventListener('keydown', escKeydownOnSuccessMessageHandler);
};

const successMessageElementHandler = (evt) => {
  if (evt.target === successMessageElement) {
    removeSuccessMessage();
  }
};

const addSuccessMessageHandlers = () => {
  successButtonElement.addEventListener('click', removeSuccessMessage);
  successMessageElement.addEventListener('click', successMessageElementHandler);
  document.addEventListener('keydown', escKeydownOnSuccessMessageHandler);
  window.addEventListener('click', removeSuccessMessage);
};

// Функции создания и удаления сообщения о провале загрузки
let errorMessageElement, errorButtonElement;

const createErrorMessage = () => {
  const documentFragment = document.createDocumentFragment();
  errorMessageElement = errorMessageTemplate.cloneNode(true);
  errorMessageElement.style.zIndex = '5';
  documentFragment.append(errorMessageElement);
  document.body.append(documentFragment);
  errorButtonElement = errorMessageElement.querySelector('.error__button');
};

const removeErrorMessage = () => {
  errorMessageElement.remove();
  document.removeEventListener('keydown', escKeydownOnErrorMessageHandler);
};

const errorMessageElementHandler = (evt) => {
  if (evt.target === errorMessageElement) {
    removeErrorMessage();
  }
};

const addErrorMessageHandlers = () => {
  errorButtonElement.addEventListener('click', inputUploadChangeHandler);
  errorMessageElement.addEventListener('click', errorMessageElementHandler);
  document.addEventListener('keydown', escKeydownOnErrorMessageHandler);
  window.addEventListener('click', removeErrorMessage);
};

// Функции нажатия ESC

function escKeydownOnSuccessMessageHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

function escKeydownOnErrorMessageHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeErrorMessage();
  }
}

const addFormValidation = () => {
  // Валидация хештегов

  pristine.addValidator(hashtagsInputElement, validateHashtagContent, 'Хэш-тег должен начинаться с символа # и состоять из букв и цифр');

  pristine.addValidator(hashtagsInputElement, isValidLength, 'Длина хеш-тега должна быть от 2 до 20 символов');

  pristine.addValidator(hashtagsInputElement, findSameElements, 'Хеш-теги не должны повторяться');

  pristine.addValidator(hashtagsInputElement, checkNumberOfHashtags, 'Нельзя указать больше пяти хэш-тегов');

  pristine.addValidator(hashtagsInputElement, checkSpaces, 'Хеш-теги должны разделяться пробелами');

  // Валидация комментариев

  pristine.addValidator(uploadImageDescriptionElement, (text) => text.length < MAX_IMAGE__DESCRIPTION__LENGTH, 'Длина комментария не может составлять больше 140 символов');

  // Отправка формы
  imageUploadPreviewElement.addEventListener('change', inputUploadChangeHandler);

  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          closeUploadForm();
          createSuccessMessage();
          addSuccessMessageHandlers();
        },
        () => {
          unblockSubmitButton();
          createErrorMessage();
          addErrorMessageHandlers();
        },
        new FormData(uploadFormElement)
      );
    }
  });
};

export {addFormValidation};
