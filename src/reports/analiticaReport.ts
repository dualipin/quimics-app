import jsPDF from 'jspdf'

export function analiticaReport(
  data: {
    pageviews: number
    users: number
    sessions: number
    avgSessionDuration: number
    bounceRate: number
  },
  title: string,
) {
  const doc = new jsPDF({
    format: 'letter',
  })

  doc.setFontSize(20)
  doc.text('Analítica Web', 10, 10)
  doc.setFontSize(16)
  doc.text('Reporte de analítica web', 10, 20)
  doc.setFontSize(14)
  doc.text(title, 10, 30)
  doc.setFontSize(12)
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 30)

  doc.setFontSize(12)
  doc.text('Paginas Vistas:', 10, 50)
  doc.text(data.pageviews.toString(), 100, 50)

  doc.text('Usuarios:', 10, 60)
  doc.text(data.users.toString(), 100, 60)

  doc.text('Sesiones:', 10, 70)
  doc.text(data.sessions.toString(), 100, 70)

  doc.text('Duración promedio de sesión:', 10, 80)
  doc.text(data.avgSessionDuration.toString(), 100, 80)

  doc.text('Porcentaje de rebote:', 10, 90)
  doc.text(data.bounceRate.toString(), 100, 90)

  doc.save('a4.pdf')
}
