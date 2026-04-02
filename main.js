import { createClient } from '@supabase/supabase-js'

// URL correcta del proyecto
const supabaseUrl = 'https://ayoinukrsxcpsdotinxf.supabase.co'

// PEGA AQUÍ tu ANON PUBLIC KEY real
const supabaseKey = 'sb_publishable_Zuq9SeosDCc2KrQCm8GeLg_g6QET_yQ'

const supabase = createClient(supabaseUrl, supabaseKey)

const btnCargar = document.getElementById('btnCargar')
const btnGuardar = document.getElementById('btnGuardar')
const btnCancelar = document.getElementById('btnCancelar')
const tabla = document.getElementById('tablaDatos')

const inputNombre = document.getElementById('nombre')
const inputPrecio = document.getElementById('precio')
const inputCategoria = document.getElementById('categoria')

let idEditando = null

function limpiarFormulario() {
  inputNombre.value = ''
  inputPrecio.value = ''
  inputCategoria.value = ''
  idEditando = null
  btnGuardar.textContent = 'Guardar'
  btnCancelar.style.display = 'none'
}

async function cargarDatos() {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error de Supabase:', error.message)
      alert('Ocurrió un error al cargar los datos: ' + error.message)
      return
    }

    tabla.innerHTML = ''

    if (!data || data.length === 0) {
      tabla.innerHTML = `
        <tr>
          <td colspan="5">No hay datos para mostrar</td>
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

      const tdAcciones = document.createElement('td')

      const btnEditar = document.createElement('button')
      btnEditar.textContent = 'Editar'
      btnEditar.addEventListener('click', () => {
        inputNombre.value = item.nombre
        inputPrecio.value = item.precio
        inputCategoria.value = item.categoria

        idEditando = item.id
        btnGuardar.textContent = 'Actualizar'
        btnCancelar.style.display = 'inline-block'
      })

      const btnEliminar = document.createElement('button')
      btnEliminar.textContent = 'Eliminar'
      btnEliminar.style.marginLeft = '10px'

      btnEliminar.addEventListener('click', async () => {
        const confirmar = confirm(`¿Seguro que deseas eliminar el producto "${item.nombre}"?`)

        if (!confirmar) return

        const { error } = await supabase
          .from('productos')
          .delete()
          .eq('id', item.id)

        if (error) {
          console.error('Error al eliminar:', error)
          alert('No se pudo eliminar el producto')
          return
        }

        alert('Producto eliminado correctamente')

        if (idEditando === item.id) {
          limpiarFormulario()
        }

        cargarDatos()
      })

      tdAcciones.appendChild(btnEditar)
      tdAcciones.appendChild(btnEliminar)

      tr.appendChild(tdId)
      tr.appendChild(tdNombre)
      tr.appendChild(tdPrecio)
      tr.appendChild(tdCategoria)
      tr.appendChild(tdAcciones)

      tabla.appendChild(tr)
    })
  } catch (err) {
    console.error('Error general:', err)
    alert('No se pudo conectar con Supabase')
  }
}

btnCargar.addEventListener('click', cargarDatos)

btnGuardar.addEventListener('click', async () => {
  const nombre = inputNombre.value.trim()
  const precio = inputPrecio.value.trim()
  const categoria = inputCategoria.value.trim()

  if (!nombre || !precio || !categoria) {
    alert('Completa todos los campos')
    return
  }

  if (isNaN(precio) || Number(precio) <= 0) {
    alert('El precio debe ser un número válido mayor que cero')
    return
  }

  let error = null

  if (idEditando) {
    const respuesta = await supabase
      .from('productos')
      .update({
        nombre: nombre,
        precio: Number(precio),
        categoria: categoria
      })
      .eq('id', idEditando)

    error = respuesta.error
  } else {
    const respuesta = await supabase
      .from('productos')
      .insert([
        {
          nombre: nombre,
          precio: Number(precio),
          categoria: categoria
        }
      ])

    error = respuesta.error
  }

  if (error) {
    console.error('Error al guardar:', error)
    alert('No se pudo guardar el producto')
    return
  }

  alert(idEditando ? 'Producto actualizado correctamente' : 'Producto guardado correctamente')

  limpiarFormulario()
  cargarDatos()
})

btnCancelar.addEventListener('click', () => {
  limpiarFormulario()
})

// Cargar automáticamente al abrir la página
cargarDatos()