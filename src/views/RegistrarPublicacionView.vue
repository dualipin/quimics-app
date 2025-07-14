<template>
  <div class="container mx-auto my-5 px-4">
    <!-- Tabs de navegación -->
    <ul class="flex mb-4 border-b" role="tablist">
      <li class="mr-2">
        <button
          class="py-2 px-4 text-blue-600 border-b-2 border-blue-600 font-medium"
          id="tabPublicar"
          data-bs-toggle="tab"
          data-bs-target="#moduloPublicar"
          type="button"
        >
          Publicar
        </button>
      </li>
      <!-- <li class="mr-2">
        <button
          class="py-2 px-4 text-gray-500 hover:text-blue-600"
          id="tabMetricas"
          data-bs-toggle="tab"
          data-bs-target="#moduloMetricas"
          type="button"
        >
          Métricas
        </button>
      </li> -->
    </ul>

    <div class="tab-content flex flex-col gap-10">
      <!-- Módulo Publicar -->
      <div class="tab-pane fade show active" id="moduloPublicar" role="tabpanel">
        <div class="bg-white rounded-lg shadow-lg p-5">
          <div class="text-lg font-bold pb-4 border-b mb-4">
            <i class="fas fa-pen-nib"></i> Crear nueva publicación
          </div>

          <div
            id="mensajeExito"
            class="hidden bg-green-100 text-green-700 p-4 rounded mt-3"
            role="alert"
          >
            ¡Publicación enviada con éxito!
          </div>

          <form id="formPublicacion">
            <div class="mb-4">
              <label for="titulo" class="block text-sm font-bold mb-2">Título</label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded"
                id="titulo"
                required
              />
            </div>

            <div class="mb-4">
              <label for="descripcion" class="block text-sm font-bold mb-2">Descripción</label>
              <textarea
                class="w-full px-3 py-2 border border-gray-300 rounded"
                id="descripcion"
                rows="4"
                required
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="imagen" class="block text-sm font-bold mb-2">Imagen (opcional)</label>
              <input
                class="w-full px-3 py-2 border border-gray-300 rounded"
                type="file"
                id="imagen"
                accept="image/*"
              />
              <img id="preview" src="#" alt="Vista previa" class="max-w-full mt-3 hidden" />
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <i class="fas fa-share-square"></i> Publicar
            </button>
          </form>
        </div>
      </div>

      <!-- Módulo Métricas -->
      <div class="tab-pane fade" id="moduloMetricas" role="tabpanel">
        <div class="bg-white rounded-lg shadow-lg p-5">
          <div class="text-lg font-bold pb-4 border-b mb-4">
            <i class="fas fa-chart-bar"></i> Reporte de Métricas
          </div>

          <div class="my-4">
            <label for="fechaInicio" class="block text-sm font-bold mb-2">Fecha inicio:</label>
            <input
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              id="fechaInicio"
              required
            />

            <label for="fechaFin" class="block text-sm font-bold mb-2">Fecha fin:</label>
            <input
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              id="fechaFin"
              required
            />

            <button
              id="btnCargarMetricas"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <i class="fas fa-sync"></i> Cargar Métricas
            </button>
          </div>

          <div id="reporteCompleto" class="hidden my-5">
            <div id="resultadosMetricas" class="mb-5"></div>
            <canvas id="graficaMetricas" height="100"></canvas>
            <div id="publicacionLink" class="mt-3">
              <a href="" id="linkFacebook" class="text-blue-600 hover:underline" target="_blank"
                >Ver publicación en Facebook</a
              >
            </div>
          </div>

          <button
            id="btnDescargarPDF"
            class="hidden w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <i class="fas fa-file-pdf"></i> Descargar Reporte en PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'
//@ts-ignore
import html2pdf from 'html2pdf.js'

const pageId = '628293773697077' // Tu ID de página
const accessToken =
  'EAAQniVqlkXkBOwHZBVAQmpwRz8CA9Xz1XYvbnoVZBbhvW0JL8T5SeCN9LNCcaceD3WZBIRYL6lrE8W1l257NF5olhHtx81jEdUg1do2mRRp5HiQslGjbrqBe3dc0lMuPGBWBiLZBcVdLyuiPSgPSsctzIO34ZAnkj5VafZAlIckYgYXUSihjlLkiHZCtSC4RL34EiRvmdKbo2ADeIHEAX6QVQZDZD'

const grafica = ref(null)
const publicacionId = ref('')

// Publicar
async function publicar(mensaje: string, imagenFile?: File) {
  if (imagenFile) {
    const formData = new FormData()
    formData.append('source', imagenFile)
    formData.append('message', mensaje)
    formData.append('access_token', accessToken)

    const res = await fetch(`https://graph.facebook.com/${pageId}/photos`, {
      method: 'POST',
      body: formData,
    })
    return await res.json()
  } else {
    const params = new URLSearchParams({ message: mensaje, access_token: accessToken })
    const res = await fetch(`https://graph.facebook.com/${pageId}/feed?${params.toString()}`, {
      method: 'POST',
    })
    return await res.json()
  }
}

onMounted(() => {
  // Vista previa imagen
  const imagenInput = document.getElementById('imagen') as HTMLInputElement
  imagenInput?.addEventListener('change', function (e: Event) {
    const target = e.target as HTMLInputElement
    const file = target?.files?.[0]
    const preview = document.getElementById('preview') as HTMLImageElement

    if (file) {
      const reader = new FileReader()
      reader.onload = function (e) {
        if (preview && e.target) {
          preview.src = e.target.result as string
          preview.classList.remove('hidden')
        }
      }
      reader.readAsDataURL(file)
    } else if (preview) {
      preview.classList.add('hidden')
    }
  })

  // Formulario de publicación
  const formPublicacion = document.getElementById('formPublicacion') as HTMLFormElement
  formPublicacion?.addEventListener('submit', async function (e) {
    e.preventDefault()
    const titulo = (document.getElementById('titulo') as HTMLInputElement).value.trim()
    const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value.trim()
    const mensajeFinal = `📝 ${titulo}\n\n${descripcion}`
    const imagenFile = (document.getElementById('imagen') as HTMLInputElement).files?.[0]

    try {
      const resultado = await publicar(mensajeFinal, imagenFile)
      if (resultado.id) {
        const mensajeExito = document.getElementById('mensajeExito')
        mensajeExito?.classList.remove('hidden')
        formPublicacion.reset()
        const preview = document.getElementById('preview')
        preview?.classList.add('hidden')
        publicacionId.value = resultado.id // Guardar el ID de la publicación
      } else {
        alert('No se pudo publicar.')
      }
    } catch (error) {
      console.error(error)
      alert('Error al publicar.')
    }
  })

  // Cargar métricas entre fechas
  const btnCargarMetricas = document.getElementById('btnCargarMetricas')
  btnCargarMetricas?.addEventListener('click', async function () {
    const fechaInicio = (document.getElementById('fechaInicio') as HTMLInputElement).value
    const fechaFin = (document.getElementById('fechaFin') as HTMLInputElement).value
    const resultados = document.getElementById('resultadosMetricas')
    const canvas = document.getElementById('graficaMetricas') as HTMLCanvasElement
    const reporte = document.getElementById('reporteCompleto')
    const btnPDF = document.getElementById('btnDescargarPDF')
    const linkFacebook = document.getElementById('linkFacebook') as HTMLAnchorElement

    if (!fechaInicio || !fechaFin) {
      alert('Por favor selecciona ambas fechas.')
      return
    }

    if (resultados) resultados.innerHTML = 'Cargando métricas...'
    reporte?.classList.remove('hidden')

    try {
      // Obtener datos de visitas
      const visitasRes = await fetch(
        `https://graph.facebook.com/${pageId}/insights/page_impressions?period=day&since=${fechaInicio}&until=${fechaFin}&access_token=${accessToken}`,
      )
      const visitasData = await visitasRes.json()
      const visitas =
        visitasData.data[0]?.values.reduce((acc: number, v: any) => acc + v.value, 0) || 0

      // Obtener likes actuales
      const likesRes = await fetch(
        `https://graph.facebook.com/${pageId}?fields=fan_count&access_token=${accessToken}`,
      )
      const likesData = await likesRes.json()
      const likes = likesData.fan_count || 0

      // Obtener publicaciones
      const postsRes = await fetch(
        `https://graph.facebook.com/${pageId}/posts?since=${fechaInicio}&until=${fechaFin}&access_token=${accessToken}`,
      )
      const postsData = await postsRes.json()
      const cantidadPosts = postsData.data.length

      // Obtener mensaje de la publicación
      let mensajePublicacion = ''
      if (publicacionId.value) {
        const publicacionRes = await fetch(
          `https://graph.facebook.com/${publicacionId.value}?fields=message&access_token=${accessToken}`,
        )
        const publicacionData = await publicacionRes.json()
        mensajePublicacion = publicacionData.message || '(Sin mensaje)'
      }

      if (resultados) {
        resultados.innerHTML = `
          <div class="alert alert-info">
            📆 Rango: <strong>${fechaInicio}</strong> a <strong>${fechaFin}</strong><br>
            📈 Visitas acumuladas: <strong>${visitas}</strong><br>
            👍 Likes actuales: <strong>${likes}</strong><br>
            📝 Publicaciones realizadas: <strong>${cantidadPosts}</strong><br>
            <hr>
            <strong>🖋 Publicación Asociada:</strong><br>
            <div class="p-3 bg-light rounded">${mensajePublicacion}</div>
          </div>
        `
      }

      // Crear o actualizar gráfica
      if (grafica.value) {
        //@ts-ignore
        grafica.value.destroy()
      }

      const ctx = canvas.getContext('2d')
      if (ctx) {
        //@ts-ignore
        grafica.value = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Visitas', 'Likes', 'Publicaciones'],
            datasets: [
              {
                label: 'Métricas',
                data: [visitas, likes, cantidadPosts],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: true, text: 'Métricas de la página' },
            },
            scales: {
              y: { beginAtZero: true },
            },
          },
        })
      }

      if (linkFacebook) {
        linkFacebook.href = `https://www.facebook.com/${pageId}/posts/${publicacionId.value}`
        linkFacebook.classList.remove('hidden')
      }

      btnPDF?.classList.remove('hidden')
    } catch (error) {
      console.error(error)
      if (resultados) {
        resultados.innerHTML = '<div class="alert alert-danger">Error al cargar métricas.</div>'
      }
    }
  })

  // Descargar reporte en PDF
  const btnDescargarPDF = document.getElementById('btnDescargarPDF')
  btnDescargarPDF?.addEventListener('click', function () {
    const reporte = document.getElementById('reporteCompleto')
    const opt = {
      margin: 0.5,
      filename: `Reporte_Facebook_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }
    if (reporte) html2pdf().set(opt).from(reporte).save()
  })
})
</script>
