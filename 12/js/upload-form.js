import { addImagePreviewScale, addEffectsToPreviewImage } from './photo-effects.js';
import {showAlert} from './utils.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];
const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const imageUploadCancelElement = uploadFormElement.querySelector('#upload-cancel');
const uploadFormOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const uploadImageDescriptionElement = uploadFormElement.querySelector('.text__description');
const imageUploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview').querySelector('img');
const fileChooser = document.querySelector('.img-upload__input');

const uploadImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileExtension) => fileName.endsWith(fileExtension));
  if (matches) {
    imageUploadPreviewElement.src = URL.createObjectURL(file);
    document.querySelectorAll('.effects__preview').forEach((element) => {element.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;});
  } else {
    showAlert('Неверный формат изображения');
  }
};

const closeUploadForm = () => {
  uploadFormOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escKeydownHandler);
  uploadFormElement.reset();
  imageUploadPreviewElement.src = '';
  document.querySelectorAll('.effects__preview').forEach((element) => { element.style.backgroundImage = 'url(../img/upload-default-image.jpg)';});
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
  uploadImage();
  document.addEventListener('keydown', escKeydownHandler);
  addImagePreviewScale();
  addEffectsToPreviewImage();
  imageUploadCancelElement.addEventListener('click', closeUploadForm);
};

const inputUploadChangeHandler = () => {
  uploadFileElement.addEventListener('change', openUploadForm);
};

export { uploadFormElement, uploadFileElement, inputUploadChangeHandler, openUploadForm, closeUploadForm};
