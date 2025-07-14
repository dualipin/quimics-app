<template>
  <div class="p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">Gráfico de Interacciones</h2>
    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
    <p v-else>Cargando datos...</p>
  </div>
</template>

<script lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import axios from '@/services/api'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

export default {
  name: 'LineChart',
  components: { Line },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Interacciones',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    }
  },
  async mounted() {
    try {
      const response = await axios.get('/interacciones')
      if (response.data && response.data) {
        const interacciones = response.data

        const elementCount = {}
        interacciones.forEach((i) => {
          if (elementCount[i.elemento]) {
            elementCount[i.elemento]++
          } else {
            elementCount[i.elemento] = 1
          }
        })

        this.chartData.labels = Object.keys(elementCount)
        this.chartData.datasets[0].data = Object.values(elementCount)
        this.loaded = true
      } else {
        console.error('No se encontraron interacciones en la respuesta de la API')
      }
    } catch (error) {
      console.error('Error al obtener interacciones:', error)
    }
  },
}
</script>

<style scoped>
/* TailwindCSS ya se usa para los estilos */
</style>
