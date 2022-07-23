import { photoModel } from './photo-model.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('#picture-cancel');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentTemplateElement = commentsContainerElement.querySelector('.social__comment');
const totalCommentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsLoaderButtonElement = document.querySelector('.comments-loader');

const renderComment = ({ avatar, name, message }) => {
  const newComment = commentTemplateElement.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

const renderComments = (comments) => {
  const newCommentsFragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    newCommentsFragment.append(renderComment(comments[i]));
  }
  commentsContainerElement.append(newCommentsFragment);
};

const clearComments = () => {
  commentsContainerElement.innerHTML = '';
};

const renderLoadButton = (showedComments, totalComments) => {
  if (totalComments === showedComments) {
    commentsLoaderButtonElement.classList.add('hidden');
  } else {
    commentsLoaderButtonElement.classList.remove('hidden');
  }
};

const renderBigPicture = ({ url, likes, comments, description }) => {
  bigPictureElement.querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  totalCommentsCountElement.textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const renderCommentsStatistic = (showedComments, totalComments) => {
  bigPictureElement.querySelector('.social__comment-count').textContent = `${showedComments} из ${totalComments} комментариев`;
};

const commentsLoaderButtonHandler = () => {
  photoModel.setNextPortionComments();
  renderCommentsStatistic(photoModel.getShowedComments(), photoModel.getCommentsTotalNumber());
  renderComments(photoModel.getPortionComments());
  renderLoadButton(photoModel.getShowedComments(), photoModel.getCommentsTotalNumber());
};

const showBigPicture = (photo) => {
  photoModel.setStartModel(photo);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  renderBigPicture(photo);
  renderCommentsStatistic(photoModel.getShowedComments(), photoModel.getCommentsTotalNumber());
  clearComments();
  renderComments(photoModel.getPortionComments());
  renderLoadButton(photoModel.getShowedComments(), photoModel.getCommentsTotalNumber());

  document.addEventListener('keydown', escKeydownHandler);
  commentsLoaderButtonElement.addEventListener('click', commentsLoaderButtonHandler);
};

const closeBigPicture = () => {
  commentsLoaderButtonElement.classList.remove('hidden');
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsContainerElement.innerHTML = '';

  document.removeEventListener('keydown', escKeydownHandler);
  commentsLoaderButtonElement.removeEventListener('click', commentsLoaderButtonHandler);
};

function escKeydownHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

bigPictureCloseElement.addEventListener('click', closeBigPicture);

export { showBigPicture, closeBigPicture };
