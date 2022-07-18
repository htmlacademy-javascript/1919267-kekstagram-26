import {getData} from './api.js';
import { showAlert } from './utils.js';
import {renderSimilarPhotos} from './thumbnails.js';
import { inputUploadChangeHandler } from './upload-form.js';
import {addFormValidation} from './upload-form-validation.js';
import {showFilteredPhotos} from './photo-filters.js';

getData(
  (dataFromServer) => {
    renderSimilarPhotos(dataFromServer);
    showFilteredPhotos(dataFromServer);
  },
  () => {
    showAlert('Упс! Данные не подгрузились :( Попробуйте позже!');
  }
);

inputUploadChangeHandler();

addFormValidation();
