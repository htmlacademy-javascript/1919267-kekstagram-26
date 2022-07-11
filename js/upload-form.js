const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const imageUploadCancelElement = uploadFormElement.querySelector('#upload-cancel');
const uploadFormOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const uploadImageDescriptionElement = uploadFormElement.querySelector('.text__description');
// const imageUploadPreviewElement = uploadFormOverlayElement.querySelector('.img-upload__preview');
const MAX_NUMBER_OF_HASHTAGS = 5;
const MAX_IMAGE__DESCRIPTION__LENGTH = 140;

const closeUploadForm = () => {
  uploadFormOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escKeydownHandler);
  uploadFormElement.reset();
};

function escKeydownHandler(evt) {
  if (evt.key === 'Escape'
    && document.activeElement !== hashtagsInputElement
    && document.activeElement !== uploadImageDescriptionElement) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const openUploadForm = () => {
  uploadFormOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escKeydownHandler);
  // imageUploadPreviewElement.querySelector('img').src = uploadFileElement.value;
};

uploadFileElement.addEventListener('change', openUploadForm);

imageUploadCancelElement.addEventListener('click', closeUploadForm);

// Валидация хештегов

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtagContent = (value) => {
  if (value === '') { return true; }

  const re = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}/;
  const arrayOfMessages = value.split(/\s+/);

  return arrayOfMessages.every((item) => re.test(item));
};

const isValidLength = (value) => {
  if (value === '') {return true;}

  const arrayOfMessages = value.split(/\s+/);

  return arrayOfMessages.every((item) => item.length > 1 && item.length < 20);
};

const checkNumberOfHashtags = (value) => {
  const arrayOfMessages = value.split(/\s+/);
  if(arrayOfMessages.length > MAX_NUMBER_OF_HASHTAGS) {
    return false;
  }
  return true;
};

const findSameElements = (value) => {
  const arrayOfMessages = value.split(/\s+/);
  const tempArray = [];
  for (let i = 0; i < arrayOfMessages.length; i++) {
    tempArray.push(arrayOfMessages[i]);
    if (arrayOfMessages[i + 1] === tempArray[i]) {
      return false;
    }
  }
  return true;
};

const checkSpaces = (value) => {
  const re = /[0-9a-z_]#$/;
  if (re.test(value)) {
    return false;
  }
  return true;
};

pristine.addValidator(hashtagsInputElement, validateHashtagContent, 'Хэш-тег должен начинаться с символа # и состоять из букв и цифр');

pristine.addValidator(hashtagsInputElement, isValidLength, 'Длина хеш-тега должна быть от 2 до 20 символов');

pristine.addValidator(hashtagsInputElement, findSameElements, 'Хеш-теги не должны повторяться');

pristine.addValidator(hashtagsInputElement, checkNumberOfHashtags, 'Нельзя указать больше пяти хэш-тегов');

pristine.addValidator(hashtagsInputElement, checkSpaces, 'Хеш-теги должны разделяться пробелами');

// Валидация комментариев

pristine.addValidator(uploadImageDescriptionElement, (text) => text.length < MAX_IMAGE__DESCRIPTION__LENGTH, 'Длина комментария не может составлять больше 140 символов');

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValidFrom = pristine.validate();

  if (isValidFrom) {
    uploadFormElement.submit();
  }
});
