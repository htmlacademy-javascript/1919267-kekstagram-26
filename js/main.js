function getRandomNumber (firstNumber, secondNumber) {
  const MIN = Math.min(firstNumber, secondNumber);
  const MAX = Math.max(firstNumber, secondNumber);

  return  Math.round(Math.random() * (MAX - MIN) + MIN);
}

getRandomNumber(0, 8);

function isEnoughLength (enteredString, maxLength) {
  const ARRAY_FROM_STRING = Array.from(enteredString);
  if (ARRAY_FROM_STRING.length > maxLength) {
    return false;
  }

  return true;
}

isEnoughLength('Hello, world!', 15);
