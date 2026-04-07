<script setup>
import { ref } from 'vue'

const nombre = ref('')
const apellido = ref('')
const genero = ref('')
const carrera = ref('')

const registros = ref([])

const agregar = () => {
  if (!nombre.value || !apellido.value || !genero.value || !carrera.value) {
    alert('Completa todos los campos')
    return
  }

  registros.value.push({
    nombre: nombre.value,
    apellido: apellido.value,
    genero: genero.value,
    carrera: carrera.value
  })

  nombre.value = ''
  apellido.value = ''
  genero.value = ''
  carrera.value = ''
}

const eliminar = (index) => {
  registros.value.splice(index, 1)
}
</script>

<template>
  <div class="pagina">
    <div class="contenedor">
      <div class="panel formulario-panel">
        <h1>Formulario de Estudiantes</h1>
        <p class="subtitulo">Registro dinámico con Vue.js</p>

        <div class="formulario">
          <div class="campo">
            <label>Nombre</label>
            <input v-model="nombre" type="text" placeholder="Ingrese el nombre" />
          </div>

          <div class="campo">
            <label>Apellido</label>
            <input v-model="apellido" type="text" placeholder="Ingrese el apellido" />
          </div>

          <div class="campo">
            <label>Género</label>
            <div class="radios">
              <label class="radio-opcion">
                <input type="radio" value="Masculino" v-model="genero" />
                Masculino
              </label>
              <label class="radio-opcion">
                <input type="radio" value="Femenino" v-model="genero" />
                Femenino
              </label>
            </div>
          </div>

          <div class="campo">
            <label>Carrera</label>
            <select v-model="carrera">
              <option disabled value="">Seleccione una carrera</option>
              <option>Ingeniería</option>
              <option>Medicina</option>
              <option>Derecho</option>
              <option>Administración</option>
              <option>Contabilidad</option>
            </select>
          </div>

          <button class="btn-agregar" @click="agregar">Agregar estudiante</button>
        </div>
      </div>

      <div class="panel tabla-panel">
        <h2>Lista de Registros</h2>

        <p v-if="registros.length === 0" class="mensaje-vacio">
          Aún no hay estudiantes registrados.
        </p>

        <div v-else class="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Género</th>
                <th>Carrera</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in registros" :key="index">
                <td>{{ item.nombre }}</td>
                <td>{{ item.apellido }}</td>
                <td>{{ item.genero }}</td>
                <td>{{ item.carrera }}</td>
                <td>
                  <button class="btn-eliminar" @click="eliminar(index)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.pagina {
  min-height: 100vh;
  background: linear-gradient(135deg, #1f2937, #111827, #0f172a);
  padding: 40px 20px;
  font-family: Arial, sans-serif;
}

.contenedor {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 30px;
  align-items: start;
}

.panel {
  background: rgba(31, 41, 55, 0.95);
  border: 1px solid #334155;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  padding: 28px;
}

.formulario-panel h1 {
  margin: 0;
  font-size: 34px;
  color: #f3f4f6;
}

.subtitulo {
  margin-top: 8px;
  margin-bottom: 25px;
  color: #93c5fd;
  font-size: 15px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo label {
  color: #cbd5e1;
  font-weight: bold;
  font-size: 14px;
}

input,
select {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #475569;
  background-color: #0f172a;
  color: #e5e7eb;
  font-size: 15px;
  outline: none;
  transition: 0.3s;
}

input:focus,
select:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

.radios {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.radio-opcion {
  color: #dbeafe;
  font-size: 15px;
}

.btn-agregar {
  margin-top: 10px;
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  color: white;
  border: none;
  padding: 13px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-agregar:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.35);
}

.tabla-panel h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #f3f4f6;
  font-size: 28px;
}

.mensaje-vacio {
  color: #94a3b8;
  background-color: #0f172a;
  padding: 18px;
  border-radius: 12px;
  border: 1px dashed #475569;
  text-align: center;
}

.tabla-contenedor {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 14px;
}

thead {
  background: linear-gradient(90deg, #1d4ed8, #2563eb);
}

th {
  color: white;
  padding: 15px;
  font-size: 15px;
  text-align: center;
}

td {
  padding: 14px;
  text-align: center;
  color: #e2e8f0;
  border-bottom: 1px solid #334155;
  background-color: #111827;
}

tr:hover td {
  background-color: #1e293b;
}

.btn-eliminar {
  background-color: #475569;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-eliminar:hover {
  background-color: #64748b;
}

@media (max-width: 900px) {
  .contenedor {
    grid-template-columns: 1fr;
  }

  .formulario-panel h1 {
    font-size: 28px;
  }

  .tabla-panel h2 {
    font-size: 24px;
  }
}
</style>