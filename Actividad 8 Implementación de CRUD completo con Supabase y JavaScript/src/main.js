import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const btn = document.getElementById('btnCargar')
const tabla = document.getElementById('tablaDatos')

btn.addEventListener('click', async () => {
  console.log('Botón funcionando')

  const { data, error } = await supabase
    .from('Productos')
    .select('*')

  console.log('DATA:', data)
  console.log('ERROR:', error)

  if (error) {
    console.error(error)
    return
  }

  tabla.innerHTML = ''

  data.forEach(item => {
    const fila = `
      <tr>
        <td>${item.identificador}</td>
        <td>${item.nombre}</td>
        <td>${item.precio}</td>
        <td>${item["categorías"]}</td>
      </tr>
    `
    tabla.innerHTML += fila
  })
})