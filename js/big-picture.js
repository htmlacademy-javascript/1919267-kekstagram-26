import { photoModel } from "./photo-model.js";

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('#picture-cancel');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentTemplateElement = commentsContainerElement.querySelector('.social__comment');
const commentAuthorIcon = commentTemplateElement.querySelector('.social__picture');
const commentTextElement = commentTemplateElement.querySelector('.social__text');
const totalCommentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsLoaderButtonElement = document.querySelector('.comments-loader');
const COMMENTS_PER_CLICK = 5;
let shownComments = COMMENTS_PER_CLICK;

const renderComment = ({ avatar, name, message }) => {
  const newComment = commentTemplateElement.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  // commentAuthorIcon.src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  // commentAuthorIcon.alt = userName;
  newComment.querySelector('.social__text').textContent = message;
  // console.log(newComment.innerHTML);
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

const renderBigPicture = ({ url, likes, comments, description }) => {
  bigPictureElement.querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  totalCommentsCountElement.textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  // renderComments(comments);
};

const renderCommentsStatistic = (showedComments, totalComments) => {
  if (showedComments < totalComments) {
    // shownComments = totalCommentsCountElement.textContent;
    bigPictureElement.querySelector('.social__comment-count').textContent = `${showedComments} из ${totalComments} комментариев`;
  } else {
    // listOfComments.slice(5).forEach((item) => item.classList.add('hidden'));
    // bigPictureElement.querySelector('.social__comment-count').textContent = `${shownComments} из ${totalCommentsCountElement.textContent} комментариев`;

    // commentsLoaderButtonElement.addEventListener('click', commentsLoaderButtonHandler);
  }
};

const commentsLoaderButtonHandler = () => {
  photoModel.setNextPortionComments();
  renderCommentsStatistic(photoModel.getShowedComments(), photoModel.getCommentsTotalNumber());
  renderComments(photoModel.getPortionComments());
  // const listOfComments = Array.from(document.querySelectorAll('.social__comment'));
  // const tempComments = listOfComments.slice(shownComments, shownComments + COMMENTS_PER_CLICK);
  // tempComments.forEach((item) => item.classList.remove('hidden'));
  // shownComments += COMMENTS_PER_CLICK;
  // if (shownComments < listOfComments.length) {
  //   bigPictureElement.querySelector('.social__comment-count').textContent = `${shownComments} из ${totalCommentsCountElement.textContent} комментариев`;
  // } else {
  //   shownComments = listOfComments.length;
  //   bigPictureElement.querySelector('.social__comment-count').textContent = `${shownComments} из ${totalCommentsCountElement.textContent} комментариев`;
  //   commentsLoaderButtonElement.classList.add('hidden');
  // }
};

const showBigPicture = (photo) => {
  photoModel.setStartModel(photo);
  console.log(photoModel.getModel());
  bigPictureElement.classList.remove('hidden');

  document.body.classList.add('.modal-open');
  renderBigPicture(photo);
  renderCommentsStatistic(photoModel.getShowedComments(), photoModel.getCommentsTotalNumber());
  clearComments();
  renderComments(photoModel.getPortionComments());

  document.addEventListener('keydown', escKeydownHandler);
  commentsLoaderButtonElement.addEventListener('click', commentsLoaderButtonHandler);

  // Показываем только 5 комментариев на странице

  // const listOfComments = Array.from(document.querySelectorAll('.social__comment'));
  // shownComments = COMMENTS_PER_CLICK;
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
