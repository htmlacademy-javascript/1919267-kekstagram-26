/* Объект состоит из 5 ключей:
id - число, генерируется в диапазоне от 1 до 25
url - строка, адрес вида photos/{{i}}.jpg
description - строка, описание фото
likes - число, генерируется в диапазоне от 15 до 200
comments - массив объектов. Объект состоит из 4 ключей:
1) id - генерируется в диапазоне от 1 до 1000
2) avatar - строка, типа img/avatar-{{случайное число от 1 до 6}}.svg
3) message - строка, генерируется из текста
4) name - строка, генерируется из списка имен
*/

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

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const commentIds = [];

const getRandomCommentId = (a, b) => {
  const randomCommentId = getRandomPositiveInteger(a, b);
  if (commentIds.includes(randomCommentId)) {
    return getRandomPositiveInteger(a, b);
  } else {
    commentIds.push(randomCommentId);
    return randomCommentId;
  }
};

const createNewComment = () => ({
  id: getRandomCommentId(1, 100),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(USERS_NAMES),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: 2}, createNewComment),
});

const createNewPhotos = (count) => {
  const newPhotos = [];
  for (let i = 1; i <= count; i++) {
    newPhotos.push(createPhoto(i));
  }
  return newPhotos;
};

createNewPhotos(25);
