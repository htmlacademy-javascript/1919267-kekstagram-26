// Константы для масштабирования изображения

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;

const uploadFormElement = document.querySelector('#upload-select-image');
const scaleSmallerButtonElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleValueInputElement = uploadFormElement.querySelector('.scale__control--value');
const imageUploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview').querySelector('img');

// Константы для наложения эффекта на изображение

const EFFECT_NAMES = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

const EFFECT_PARAMETERS = {
  'chrome': {range: {min: 0, max: 1}, step: 0.1, start: 1},
  'sepia': {range: {min: 0, max: 1}, step: 0.1, start: 1},
  'marvin': {range: {min: 0, max: 100}, step: 1, start: 100},
  'phobos': {range: {min: 0, max: 3}, step: 0.1, start: 3},
  'heat': {range: {min: 1, max: 3}, step: 0.1, start: 3},
};

const listOfEffectsContainer = uploadFormElement.querySelector('.effects__list');
// const effectsRadioInputs = listOfEffectsContainer.querySelectorAll('.effects__radio');
const imageUploadEffectLevelElement = uploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelValueInputElement = uploadFormElement.querySelector('.effect-level__value');
const effectLevelSliderElement = uploadFormElement.querySelector('.effect-level__slider');

// Изменение масштаба изображения

let scaleValue = DEFAULT_SCALE_VALUE;

const changeScaleValue = () => {
  imageUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  scaleValueInputElement.value = `${scaleValue}%`;
};

const makeScaleValueBigger = () => {
  if (scaleValue < MAX_SCALE_VALUE) {
    scaleValue += SCALE_VALUE_STEP;
  }
  changeScaleValue();
  return scaleValue;
};

const makeScaleValueSmaller = () => {
  if (scaleValue > MIN_SCALE_VALUE) {
    scaleValue -= SCALE_VALUE_STEP;
  }
  changeScaleValue();
  return scaleValue;
};

const addImagePreviewScale = () => {
  changeScaleValue();

  scaleBiggerButtonElement.addEventListener('click', makeScaleValueBigger);
  scaleSmallerButtonElement.addEventListener('click', makeScaleValueSmaller);
};

// Добавление эффекта на изображение

// Создаем слайдер
noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  step: 0.1,
  start: 100,
  connect: 'lower',
});

const addEffectFilter = (filter, filterValue) => {
  if (filter === 'marvin') {
    imageUploadPreviewElement.style.filter = `${EFFECT_NAMES[filter]}(${filterValue}%)`;
    effectLevelValueInputElement.value = `${filterValue}%`;
  } else {
    if (filter === 'phobos') {
      imageUploadPreviewElement.style.filter = `${EFFECT_NAMES[filter]}(${filterValue}px)`;
      effectLevelValueInputElement.value = `${filterValue}px`;
    } else {
      imageUploadPreviewElement.style.filter = `${EFFECT_NAMES[filter]}(${filterValue})`;
      effectLevelValueInputElement.value = `${filterValue}`;
    }
  }
};

const addSlider = (item) => {
  if (item.value === 'none') {
    imageUploadEffectLevelElement.classList.add('hidden');
    effectLevelValueInputElement.value = '';
    imageUploadPreviewElement.style.removeProperty('filter');
  } else {
    effectLevelSliderElement.noUiSlider.updateOptions(EFFECT_PARAMETERS[`${item.value}`]);
    imageUploadEffectLevelElement.classList.remove('hidden');
    imageUploadPreviewElement.classList.add(`effects__preview--${item.value}`);
    addEffectFilter(item.value, effectLevelSliderElement.noUiSlider.get());
  }
};

const changeEffectHandler = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    imageUploadPreviewElement.removeAttribute('class');
    addSlider(evt.target);
  }
};

const addEffectOnImage = () => {
  listOfEffectsContainer.addEventListener('click', changeEffectHandler);
};

export {addImagePreviewScale, addEffectOnImage};
