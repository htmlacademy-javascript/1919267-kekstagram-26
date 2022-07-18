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
const effectLevelFieldsetElement = uploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelValueInputElement = uploadFormElement.querySelector('.effect-level__value');
const effectLevelSliderElement = uploadFormElement.querySelector('.effect-level__slider');

// ********************Изменение масштаба изображения **********************************************************

let scaleValue = DEFAULT_SCALE_VALUE;

const changeScaleValueInHTML = () => {
  imageUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  scaleValueInputElement.value = `${scaleValue}%`;
};

const makeScaleValueBigger = () => {
  if (scaleValue + SCALE_VALUE_STEP <= MAX_SCALE_VALUE) {
    scaleValue += SCALE_VALUE_STEP;
    changeScaleValueInHTML();
  }
};

const makeScaleValueSmaller = () => {
  if (scaleValue - SCALE_VALUE_STEP >= MIN_SCALE_VALUE) {
    scaleValue -= SCALE_VALUE_STEP;
    changeScaleValueInHTML();
  }
};

const scaleToDefault = () => {
  imageUploadPreviewElement.style.transform = `scale(${DEFAULT_SCALE_VALUE / 100})`;
  scaleValueInputElement.value = `${DEFAULT_SCALE_VALUE}%`;
  scaleValue = DEFAULT_SCALE_VALUE;
};

const addImagePreviewScale = () => {
  scaleToDefault();

  scaleBiggerButtonElement.addEventListener('click', makeScaleValueBigger);
  scaleSmallerButtonElement.addEventListener('click', makeScaleValueSmaller);
};

// ******************** Добавление эффекта на изображение *******************************************

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

const showSlider = () => {
  effectLevelSliderElement.classList.remove('hidden');
  effectLevelFieldsetElement.classList.remove('hidden');
  effectLevelValueInputElement.value = '';
};

const addClassToPreviewImage = (string) => {
  imageUploadPreviewElement.classList.add(`effects__preview--${string}`);
};

const hideSlider = () => {
  effectLevelSliderElement.classList.add('hidden');
  effectLevelFieldsetElement.classList.add('hidden');
  imageUploadPreviewElement.style.filter = '';
};

const addEffectFilterToPreview = (filter, filterValue) => {
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
    hideSlider();
  } else {
    effectLevelSliderElement.noUiSlider.updateOptions(EFFECT_PARAMETERS[`${item.value}`]);
    showSlider();
    addEffectFilterToPreview();
    addClassToPreviewImage(item.value);
    effectLevelValueInputElement.value = effectLevelSliderElement.noUiSlider.get();
    effectLevelSliderElement.noUiSlider.on('update', () => {
      addEffectFilterToPreview(item.value, effectLevelSliderElement.noUiSlider.get());
    });
  }
};

const addEffectsToPreviewImage = () => {
  effectLevelFieldsetElement.classList.add('hidden');
  imageUploadPreviewElement.style.filter = '';
  imageUploadPreviewElement.removeAttribute('class');
  imageUploadPreviewElement.classList.add('effects__preview--none');
  listOfEffectsContainer.addEventListener('change', (evt) => {
    if (evt.target.name === 'effect') {
      imageUploadPreviewElement.removeAttribute('class');
      addSlider(evt.target);
    }
  });
};

export {scaleToDefault, addImagePreviewScale, addEffectsToPreviewImage};
