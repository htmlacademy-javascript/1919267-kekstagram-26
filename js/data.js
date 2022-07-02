import {getRandomPositiveInteger, getRandomArrayElement} from './utils.js';

const DESCRIPTIONS = [
  'котик',
  'собачка',
  'птичка',
  'закат на море',
  'озеро в лесу',
  'караван в пустыне',
  'у бабушки на даче',
  'город в дожде',
  'зимняя прогулка',
  'поездка на велосипедах',
  'мои друзья',
];

const USERS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const Avatar = {
  MIN: 1,
  MAX: 6,
};

const Likes = {
  MIN: 15,
  MAX: 200,
};

const CommentID = {
  MIN: 1,
  MAX: 1000,
};

const getRandomCommentId = () => {
  const arrayOfComments = [];
  const randomCommentId = getRandomPositiveInteger(CommentID.MIN, CommentID.MAX);
  if (arrayOfComments.includes(randomCommentId)) {
    return getRandomPositiveInteger(CommentID.MIN, CommentID.MAX);
  } else {
    arrayOfComments.push(randomCommentId);
    return randomCommentId;
  }
};

const createNewComment = () => ({
  id: getRandomCommentId(CommentID.MIN, CommentID.MAX),
  avatar: `img/avatar-${getRandomPositiveInteger(Avatar.MIN, Avatar.MAX)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(USERS_NAMES),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(Likes.MIN, Likes.MAX),
  comments: Array.from({ length: 2 }, createNewComment),
});

const createNewPhotos = (count) => {
  const newPhotos = [];
  for (let i = 1; i <= count; i++) {
    newPhotos.push(createPhoto(i));
  }
  return newPhotos;
};

export {createNewPhotos};
