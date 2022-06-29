import { createNewPhotos } from './data.js';

const picturesContainer = document.querySelector('.pictures');

const newPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const newPhotos = createNewPhotos(25);

const newPhotosFragment = document.createDocumentFragment();

newPhotos.forEach((photo) => {
  const photoElement = newPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  newPhotosFragment.append(photoElement);
});

picturesContainer.append(newPhotosFragment);
