import { createClient } from '@supabase/supabase-js'

// URL correcta del proyecto
const supabaseUrl = 'https://ayoinukrsxcpsdotinxf.supabase.co'

// PEGA AQUÍ tu ANON PUBLIC KEY real
const supabaseKey = 'sb_publishable_Zuq9SeosDCc2KrQCm8GeLg_g6QET_yQ'

const supabase = createClient(supabaseUrl, supabaseKey)

// Elementos del HTML
const btn = document.getElementById('btnCargar')
const tabla = document.getElementById('tablaDatos')

btn.addEventListener('click', async () => {
  console.log('Botón funcionando')

  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')

    console.log('DATA:', data)
    console.log('ERROR:', error)

    if (error) {
      console.error('Error de Supabase:', error.message)
      alert('Ocurrió un error al cargar los datos: ' + error.message)
      return
    }

    tabla.innerHTML = ''

    if (!data || data.length === 0) {
      tabla.innerHTML = `
        <tr>
          <td colspan="4">No hay datos para mostrar</td>
        </tr>
      `
      return
    }

    data.forEach((item) => {
      const tr = document.createElement('tr')

      const tdId = document.createElement('td')
      tdId.textContent = item.id

      const tdNombre = document.createElement('td')
      tdNombre.textContent = item.nombre

      const tdPrecio = document.createElement('td')
      tdPrecio.textContent = item.precio

      const tdCategoria = document.createElement('td')
      tdCategoria.textContent = item.categoria

      tr.appendChild(tdId)
      tr.appendChild(tdNombre)
      tr.appendChild(tdPrecio)
      tr.appendChild(tdCategoria)

      tabla.appendChild(tr)
    })
  } catch (err) {
    console.error('Error general:', err)
    alert('No se pudo conectar con Supabase')
  }
})