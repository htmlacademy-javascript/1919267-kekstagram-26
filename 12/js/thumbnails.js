// import { createNewPhotos } from './data.js';
import { showBigPicture } from './big-photo.js';

const picturesContainerElement = document.querySelector('.pictures');

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// const thumbnails = createNewPhotos();

const renderSimilarPhotos = (thumbnails) => {
  const thumbnailsFragment = document.createDocumentFragment();

  thumbnails.forEach((photo) => {
    const newThumbnail = thumbnailTemplate.cloneNode(true);
    newThumbnail.querySelector('.picture__img').src = photo.url;
    newThumbnail.querySelector('.picture__img').alt = photo.description;
    newThumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    newThumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnailsFragment.append(newThumbnail);
    newThumbnail.addEventListener('click', () => showBigPicture(photo));
  });

  picturesContainerElement.append(thumbnailsFragment);
};

export {renderSimilarPhotos};
