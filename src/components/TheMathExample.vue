<!-- src/components/MathExample.vue -->
<template>
  <div class="example-container">
    <p class="example">{{ currentExample }}</p>
    <input type="number" v-model="userAnswer" class="answer-input" placeholder="Введите ответ" />
    <button @click="checkAnswer" class="check-button">Проверить</button>
    <p v-if="feedback" class="feedback">{{ feedback }}</p>
    <button @click="nextExample" class="next-button">Следующий пример</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMathExamples } from '../composables/useMathExamples'

const props = defineProps({
  difficulty: {
    type: String,
    default: 'easy'
  },
  operationType: {
    type: String,
    default: 'addition'
  }
})

// Подключение логики генерации примеров
const { currentExample, currentAnswer, generateNewExample } = useMathExamples()

// Состояние для ответа пользователя
const userAnswer = ref('')
const feedback = ref('')

// Генерируем первый пример при монтировании компонента
generateNewExample(props.difficulty, props.operationType)

// Функция проверки ответа
const checkAnswer = () => {
  if (parseFloat(userAnswer.value) === parseFloat(currentAnswer.value)) {
    feedback.value = 'Правильно!'
  } else {
    feedback.value = `Неправильно. Правильный ответ: ${currentAnswer.value}`
  }
}

// Функция генерации следующего примера
const nextExample = () => {
  feedback.value = ''
  userAnswer.value = ''
  generateNewExample(props.difficulty, props.operationType)
}
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.example {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.answer-input {
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.check-button,
.next-button {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  cursor: pointer;
}

.feedback {
  font-size: 1.2rem;
  color: green;
  margin-top: 1rem;
}
</style>
