import { defineStore } from 'pinia'

import type { Question } from '../types/Quiz'
import { getAIQuizzes, getRandomQuizzes } from '../services/quiz-services'

export const useQuizStore = defineStore('quiz', () => {})

// export const useQuizStore = defineStore('quiz', {
//   state: () => ({
//     systemQuestions: [] as Question[],
//     aiQuestions: [] as Question[],
//   }),
//   getters: {
//     getQuestionsForLevel: (state) => (level: number) => {
//       const baseQuestions = [...state.systemQuestions, ...state.aiQuestions]
//       return baseQuestions.filter((q) => q.level === level).slice(0, 5)
//     },
//     getAllQuestions(): Question[] {
//       return [...this.systemQuestions, ...this.aiQuestions]
//     },
//   },
//   actions: {
//     addAIQuestions(questions: Question[]) {
//       this.aiQuestions.push(...questions)
//     },
//     addSystemQuestions(questions: Question[]) {
//       this.systemQuestions.push(...questions)
//     },
//     async addAIQuestion() {
//       const response = await getAIQuizzes(5)
//       this.aiQuestions.push(...response)
//     },
//     async addSystemQuestion() {
//       const response = await getRandomQuizzes(5)
//       this.systemQuestions.push(...response)
//     },
//   },
// })
