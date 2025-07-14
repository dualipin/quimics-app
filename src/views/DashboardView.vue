<template>
  <!-- Título principal de la aplicación -->
  <h1 class="text-4xl font-bold mb-8">Dashboard</h1>

  <!-- Formulario de Creación de Usuario -->
  <section class="mt-8">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Crear Nuevo Usuario</h2>

      <form @submit.prevent="crearUsuario" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
          <input
            v-model="nuevoUsuario.nombre"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            v-model="nuevoUsuario.contrasena"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <select
            v-model="nuevoUsuario.role"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <div>
          <VaButton type="submit" color="success" class="w-full"> Crear Usuario </VaButton>
        </div>
      </form>

      <div
        v-if="mensaje"
        class="mt-4 p-3 rounded"
        :class="
          mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        "
      >
        {{ mensaje.texto }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Importa los componentes de los gráficos
import api from '@/services/api'
import { onMounted, ref } from 'vue'
import { useToast } from 'vuestic-ui'

const toast = useToast()

const tiempoPromedio = ref([
  {
    tiempo: '00:00:00',
    page: 'Tabla periódica',
  },
])

// Estado para el formulario de usuario
const nuevoUsuario = ref({
  nombre: '',
  contrasena: '',
  role: 'estudiante',
})

const mensaje = ref<null | { tipo: string; texto: string }>(null)

// Función para crear usuario
const crearUsuario = async () => {
  try {
    let response = null
    if (nuevoUsuario.value.role == 'estudiante') {
      response = await api.post('/crear_estudiante/', {
        username: nuevoUsuario.value.nombre,
        password: nuevoUsuario.value.contrasena,
      })
    } else if (nuevoUsuario.value.role == 'profesor') {
      response = await api.post('/crear_profesor/', {
        username: nuevoUsuario.value.nombre,
        password: nuevoUsuario.value.contrasena,
      })
    } else if (nuevoUsuario.value.role == 'administrador') {
      response = await api.post('/crear_administrador/', {
        username: nuevoUsuario.value.nombre,
        password: nuevoUsuario.value.contrasena,
      })
    }

    toast.init({
      message: 'Usuario Creado',
    })

    mensaje.value = {
      tipo: 'exito',
      texto: 'Usuario creado correctamente!',
    }
    // Limpiar formulario
    nuevoUsuario.value = {
      nombre: '',
      contrasena: '',
      role: 'estudiante',
    }

    mensaje.value = null

    console.log(response)
  } catch (error) {
    console.error(error)
    mensaje.value = {
      tipo: 'error',
      texto: 'Error al crear usuario. Inténtelo de nuevo.',
    }
  }
}

onMounted(async () => {
  try {
    const response = await api.get('/tiempos_pagina')
    if (response.data && response.data.length > 0) {
      const tiemposPorPagina: { [page: string]: number } = {}
      response.data.forEach((item: { page: string | number; tiempo: number }) => {
        if (item.page) {
          tiemposPorPagina[item.page] = (tiemposPorPagina[item.page] || 0) + item.tiempo
        }
      })

      tiempoPromedio.value = Object.entries(tiemposPorPagina).map(([page, tiempo]) => {
        const horas = Math.floor(tiempo / 3600)
        const minutos = Math.floor((tiempo % 3600) / 60)
        const segundos = Math.floor(tiempo % 60)
        return {
          tiempo: `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(
            segundos,
          ).padStart(2, '0')}`,
          page: page,
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
})
</script>
