<template>
    <div
        class="create-question-form p-8 bg-gradient-to-br from-white via-gray-100 to-blue-50 rounded-2xl shadow-xl dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <h2 class="text-2xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 tracking-tight">Crear nueva pregunta
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
                <label class="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Pregunta</label>
                <input v-model="form.question" type="text"
                    class="w-full p-3 border-2 border-blue-400 dark:border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                    required />
            </div>
            <div>
                <label class="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Opciones</label>
                <div v-for="(option, idx) in form.options" :key="idx" class="flex items-center mb-2 gap-2">
                    <input v-model="form.options[idx]" type="text"
                        class="flex-1 p-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-gray-100"
                        required />
                    <button type="button" @click="removeOption(idx)"
                        class="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-colors duration-150 shadow">
                        Eliminar
                    </button>
                </div>
                <button type="button" @click="addOption"
                    class="mt-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold transition-colors duration-150 shadow">
                    Agregar opción
                </button>
            </div>
            <div>
                <label class="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Respuesta correcta</label>
                <input v-model="form.answer" type="text"
                    class="w-full p-3 border-2 border-green-400 dark:border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-100"
                    required />
            </div>
            <div>
                <label class="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Dificultad</label>
                <select v-model="form.difficulty"
                    class="w-full p-3 border-2 border-purple-400 dark:border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-gray-100">
                    <option value="easy">Fácil</option>
                    <option value="medium">Medio</option>
                    <option value="hard">Difícil</option>
                </select>
            </div>
            <button type="submit"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-150 shadow-lg">
                Crear pregunta
            </button>
        </form>
        <div v-if="success"
            class="mt-6 p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-semibold shadow">
            ¡Pregunta creada exitosamente!
        </div>
        <div v-if="error"
            class="mt-6 p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 font-semibold shadow">
            Error al crear la pregunta.
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createQuestion } from '../services/quiz-services'
import { useAuthStore } from '@/modules/auth/stores/auth-store'

const authStore = useAuthStore()
const user = authStore.user

const form = ref({
    question: '',
    options: ['', ''],
    answer: '',
    difficulty: 'easy',
})

const success = ref(false)
const error = ref(false)

function addOption() {
    form.value.options.push('')
}
function removeOption(idx: number) {
    form.value.options.splice(idx, 1)
}

async function handleSubmit() {
    if (user?.role !== 'profesor') {
        error.value = true
        success.value = false
        return
    }
    try {
        await createQuestion({
            id: null,
            question: form.value.question,
            options: form.value.options,
            answer: form.value.answer,
            difficulty: form.value.difficulty as 'easy' | 'medium' | 'hard',
            created_by: user.full_name || 'profesor',
        })
        success.value = true
        error.value = false
        form.value = { question: '', options: ['', ''], answer: '', difficulty: 'easy' }
    } catch (e) {
        error.value = true
        success.value = false
    }
}
</script>

<style scoped>
.create-question-form {
    max-width: 500px;
    margin: 2rem auto;
}
</style>
