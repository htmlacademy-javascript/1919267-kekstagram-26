import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentTemplateElement = commentsContainerElement.querySelector('.social__comment');
const commentAuthorIcon = commentTemplateElement.querySelector('.social__picture');
const commentTextElement = commentTemplateElement.querySelector('.social__text');


const renderComment = ({ avatar, userName, message }) => {
  const newComment = commentTemplateElement.cloneNode(true);
  commentAuthorIcon.src = avatar;
  commentAuthorIcon.alt = userName;
  commentTextElement.textContent = message;
  return newComment;
};

const renderComments = (comments) => {
  const newCommentsFragment = document.createDocumentFragment();
  commentsContainerElement.innerHTML = '';
  for (let i = 0; i < comments.length; i++) {
    newCommentsFragment.append(renderComment(comments[i]));
  }
  commentsContainerElement.append(newCommentsFragment);
};

const renderBigPicture = ({ url, likes, comments, description }) => {
  bigPictureElement.querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  renderComments(comments);
};

const showBigPicture = (photo) => {
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  document.body.classList.add('.modal-open');
  renderBigPicture(photo);

  document.addEventListener('keydown', escKeydownHandler);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', escKeydownHandler);
};

function escKeydownHandler(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    closeBigPicture();
  }
}

bigPictureCloseElement.addEventListener('click', closeBigPicture);

export { showBigPicture };
