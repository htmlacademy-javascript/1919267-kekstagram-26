import {getRandomUniqueElements, debounce} from './utils.js';
import { renderSimilarPhotos } from './thumbnails.js';

const sectionFiltersElement = document.querySelector('.img-filters');
const defaultButtonElement = sectionFiltersElement.querySelector('#filter-default');
const randomButtonElement = sectionFiltersElement.querySelector('#filter-random');
const discussedButtonElement = sectionFiltersElement.querySelector('#filter-discussed');

const comparePhotoComments = (elementA, elementB) => elementB.comments.length - elementA.comments.length;

const createDefaultFilter = (photos) => photos.slice();

const createRandomFilter = (photos) => {
  const newPhotosArray = photos.slice();
  return getRandomUniqueElements(newPhotosArray);
};

const createSortedFilter = (photos) => {
  const newPhotosArray = photos.slice();
  return newPhotosArray.sort(comparePhotoComments);
};

const clearPicturesContainer = () => {
  const photosAllElements = document.querySelectorAll('.picture');
  photosAllElements.forEach((photo) => {
    photo.remove();
  });
};

const renderFilteredPhotos = (photos) => {
  clearPicturesContainer();
  renderSimilarPhotos(photos);
};

const deleteActiveClass = () => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
};

const showFilteredPhotos = (photos) => {
  sectionFiltersElement.classList.remove('img-filters--inactive');
  defaultButtonElement.addEventListener('click', debounce((evt) => {
    deleteActiveClass();
    if (evt.target === defaultButtonElement) {
      defaultButtonElement.classList.add('img-filters__button--active');
      renderFilteredPhotos(createDefaultFilter(photos));
    }
  }));
  randomButtonElement.addEventListener('click', debounce((evt) => {
    deleteActiveClass();
    if (evt.target === randomButtonElement) {
      randomButtonElement.classList.add('img-filters__button--active');
      renderFilteredPhotos(createRandomFilter(photos));
    }
  }));
  discussedButtonElement.addEventListener('click', debounce((evt) => {
    deleteActiveClass();
    if (evt.target === discussedButtonElement) {
      discussedButtonElement.classList.add('img-filters__button--active');
      renderFilteredPhotos(createSortedFilter(photos));
    }
  }));
};

export {showFilteredPhotos};
