const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('#picture-cancel');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentTemplateElement = commentsContainerElement.querySelector('.social__comment');
const commentAuthorIcon = commentTemplateElement.querySelector('.social__picture');
const commentTextElement = commentTemplateElement.querySelector('.social__text');
const totalCommentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsLoaderButtonElement = document.querySelector('.comments-loader');


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
  totalCommentsCountElement.textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  renderComments(comments);
};


const showBigPicture = (photo) => {
  bigPictureElement.classList.remove('hidden');

  document.body.classList.add('.modal-open');
  renderBigPicture(photo);

  document.addEventListener('keydown', escKeydownHandler);

  // Показываем только 5 комментариев на странице
  const listOfComments = Array.from(document.querySelectorAll('.social__comment'));
  if (listOfComments.length < 5) {
    bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
    commentsLoaderButtonElement.classList.add('hidden');
  } else {
    listOfComments.slice(5).forEach((item) => item.classList.add('hidden'));

    // Показываем оставшиеся комментарии при нажатии на кнопку ЗАГРУЗИТЬ ЕЩЕ
    let numberOfComments = 5;

    commentsLoaderButtonElement.addEventListener('click', () => {
      numberOfComments += 5;
      if (numberOfComments < listOfComments.length) {
        bigPictureElement.querySelector('.social__comment-count').textContent = `${numberOfComments} из ${totalCommentsCountElement.textContent} комментариев`;
      } else {
        bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
      }

      if (numberOfComments < listOfComments.length) {
        for (let i = 0; i < numberOfComments; i++) {
          listOfComments[i].classList.remove('hidden');
        }
      } else {
        for (let i = 0; i < listOfComments.length; i++) {
          listOfComments[i].classList.remove('hidden');
          commentsLoaderButtonElement.classList.add('hidden');
        }
      }
    });
  }
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', escKeydownHandler);
};

function escKeydownHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

bigPictureCloseElement.addEventListener('click', closeBigPicture);

export { showBigPicture, closeBigPicture };
