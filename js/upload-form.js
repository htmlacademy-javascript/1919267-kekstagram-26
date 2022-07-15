import { addImagePreviewScale, addEffectsToPreviewImage } from './picture-preview-settings.js';

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const imageUploadCancelElement = uploadFormElement.querySelector('#upload-cancel');
const uploadFormOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const uploadImageDescriptionElement = uploadFormElement.querySelector('.text__description');

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
  addImagePreviewScale();
  addEffectsToPreviewImage();
  imageUploadCancelElement.addEventListener('click', closeUploadForm);
};

const inputUploadChangeHandler = () => {
  uploadFileElement.addEventListener('change', openUploadForm);
};

export { uploadFormElement, uploadFileElement, inputUploadChangeHandler, openUploadForm, closeUploadForm};
