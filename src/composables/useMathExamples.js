// src/composables/useMathExamples.js
import { ref } from 'vue';

// Генерация случайного числа в пределах от min до max
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Получение диапазона чисел по уровню сложности
const getRangeByDifficulty = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { min: 1, max: 10 };
    case 'medium':
      return { min: 10, max: 100 };
    case 'hard':
      return { min: 100, max: 1000 };
    default:
      return { min: 1, max: 10 };
  }
};

// Функция для генерации примера в зависимости от типа операции
const generateExample = (difficulty, operationType) => {
  const range = getRangeByDifficulty(difficulty);
  const num1 = getRandomNumber(range.min, range.max);
  const num2 = getRandomNumber(range.min, range.max);

  let example = '';
  let correctAnswer = 0;

  switch (operationType) {
    case 'addition':
      example = `${num1} + ${num2}`;
      correctAnswer = num1 + num2;
      break;
    case 'subtraction':
      example = `${num1} - ${num2}`;
      correctAnswer = num1 - num2;
      break;
    case 'multiplication':
      example = `${num1} * ${num2}`;
      correctAnswer = num1 * num2;
      break;
    case 'division':
      example = `${num1} / ${num2}`;
      correctAnswer = (num1 / num2).toFixed(2); // Округление для деления
      break;
    default:
      example = `${num1} + ${num2}`;
      correctAnswer = num1 + num2;
      break;
  }

  return { example, correctAnswer };
};

// Основной хук, который будет использоваться в компонентах
export const useMathExamples = () => {
  const currentExample = ref('');
  const currentAnswer = ref(0);

  const generateNewExample = (difficulty, operationType) => {
    const { example, correctAnswer } = generateExample(difficulty, operationType);
    currentExample.value = example;
    currentAnswer.value = correctAnswer;
  };

  return {
    currentExample,
    currentAnswer,
    generateNewExample,
  };
};
