import {getData} from './api.js';
import { showAlert } from './utils.js';
import {renderSimilarPhotos} from './thumbnails.js';
import { inputUploadChangeHandler } from './upload-form.js';
import {addFormValidation} from './form-validation.js';
import './picture-preview-settings.js';
import './upload-form.js';
import './big-picture.js';

getData(
  (dataFromServer) => {
    renderSimilarPhotos(dataFromServer);
    // Надо добавить фильтры показа фотографий
  },
  () => {
    showAlert('Упс! Данные не подгрузились :( Попробуйте позже!');
  }
);

inputUploadChangeHandler();

addFormValidation();
