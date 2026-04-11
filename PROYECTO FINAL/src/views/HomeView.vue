<template>
  <section class="home">
    <div class="hero">
      <h1>LexRD Buscador Legal</h1>
      <p>
        Busca leyes, artículos y temas jurídicos de la República Dominicana
        escribiendo una palabra clave.
      </p>
    </div>

    <div class="category-buttons">
      <button
        :class="{ active: categoriaSeleccionada === 'Todas' }"
        @click="filtrarCategoria('Todas')"
      >
        Todas
      </button>
      <button
        :class="{ active: categoriaSeleccionada === 'Penal' }"
        @click="filtrarCategoria('Penal')"
      >
        Penal
      </button>
      <button
        :class="{ active: categoriaSeleccionada === 'Civil' }"
        @click="filtrarCategoria('Civil')"
      >
        Civil
      </button>
      <button
        :class="{ active: categoriaSeleccionada === 'Laboral' }"
        @click="filtrarCategoria('Laboral')"
      >
        Laboral
      </button>
      <button
        :class="{ active: categoriaSeleccionada === 'Tránsito' }"
        @click="filtrarCategoria('Tránsito')"
      >
        Tránsito
      </button>
      <button
        :class="{ active: categoriaSeleccionada === 'Constitucional' }"
        @click="filtrarCategoria('Constitucional')"
      >
        Constitucional
      </button>
      <button
        :class="{ active: categoriaSeleccionada === 'Administrativo' }"
        @click="filtrarCategoria('Administrativo')"
      >
        Administrativo
      </button>
    </div>

    <div class="search-box">
      <input
        type="text"
        v-model="busqueda"
        placeholder="Ej: tránsito, robo, allanamiento, contrato..."
      />
      <button @click="limpiarBusqueda">Limpiar</button>
    </div>

    <div class="info">
      <p>
        Resultados encontrados:
        <strong>{{ resultados.length }}</strong>
      </p>
    </div>

    <div v-if="resultados.length > 0" class="cards">
      <div v-for="ley in resultados" :key="ley.id" class="card">
        <h3>{{ ley.titulo }}</h3>
        <p><strong>Artículo:</strong> {{ ley.articulo }}</p>
        <p><strong>Categoría:</strong> {{ ley.categoria }}</p>
        <p>{{ ley.descripcion }}</p>

        <div class="tags">
          <span v-for="(palabra, index) in ley.palabras" :key="index">
            {{ palabra }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="no-results">
      <p>No se encontraron resultados para esa búsqueda.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const busqueda = ref('')
const categoriaSeleccionada = ref('Todas')

const leyes = [
  {
    id: 1,
    titulo: 'Ley 63-17 de Movilidad, Transporte Terrestre, Tránsito y Seguridad Vial',
    articulo: 'Art. 220',
    categoria: 'Tránsito',
    descripcion: 'Regula la circulación vehicular, infracciones, multas y seguridad vial en la República Dominicana.',
    palabras: ['transito', 'vehiculo', 'multa', 'licencia', 'conducir', 'accidente']
  },
  {
    id: 2,
    titulo: 'Código Procesal Penal de la República Dominicana',
    articulo: 'Art. 180',
    categoria: 'Penal',
    descripcion: 'Contiene disposiciones sobre allanamientos, registros y autorizaciones judiciales.',
    palabras: ['allanamiento', 'registro', 'fiscal', 'orden judicial', 'penal']
  },
  {
    id: 3,
    titulo: 'Código Penal Dominicano',
    articulo: 'Art. 379',
    categoria: 'Penal',
    descripcion: 'Define y sanciona el robo dentro del sistema penal dominicano.',
    palabras: ['robo', 'hurto', 'delito', 'sancion', 'pena']
  },
  {
    id: 4,
    titulo: 'Código Civil de la República Dominicana',
    articulo: 'Art. 544',
    categoria: 'Civil',
    descripcion: 'Regula aspectos relacionados con la propiedad y los derechos reales.',
    palabras: ['propiedad', 'bienes', 'posesion', 'civil', 'inmueble']
  },
  {
    id: 5,
    titulo: 'Código de Trabajo de la República Dominicana',
    articulo: 'Art. 88',
    categoria: 'Laboral',
    descripcion: 'Establece causas justificadas para el despido de un trabajador.',
    palabras: ['trabajo', 'despido', 'empleado', 'empresa', 'laboral', 'salario']
  },
  {
    id: 6,
    titulo: 'Constitución de la República Dominicana',
    articulo: 'Art. 40',
    categoria: 'Constitucional',
    descripcion: 'Reconoce derechos fundamentales, libertad personal y garantías de seguridad.',
    palabras: ['constitucion', 'derechos', 'libertad', 'garantias', 'seguridad']
  },
  {
    id: 7,
    titulo: 'Ley 108-05 de Registro Inmobiliario',
    articulo: 'Art. 1',
    categoria: 'Civil',
    descripcion: 'Regula el saneamiento y el registro de los inmuebles en la República Dominicana.',
    palabras: ['registro', 'inmobiliario', 'terreno', 'titulo', 'casa', 'solar']
  },
  {
    id: 8,
    titulo: 'Ley 136-03 sobre Protección de Niños, Niñas y Adolescentes',
    articulo: 'Art. 12',
    categoria: 'Civil',
    descripcion: 'Protege los derechos fundamentales de niños, niñas y adolescentes.',
    palabras: ['niños', 'adolescentes', 'familia', 'proteccion', 'menores', 'custodia']
  },
  {
    id: 9,
    titulo: 'Ley 53-07 sobre Crímenes y Delitos de Alta Tecnología',
    articulo: 'Consulta general',
    categoria: 'Penal',
    descripcion: 'Regula conductas delictivas cometidas mediante sistemas informáticos o medios tecnológicos.',
    palabras: ['cibercrimen', 'hackeo', 'fraude digital', 'delitos informaticos', 'phishing', 'tecnologia']
  },
  {
    id: 10,
    titulo: 'Ley 172-13 sobre Protección de Datos Personales',
    articulo: 'Consulta general',
    categoria: 'Civil',
    descripcion: 'Protege datos personales contenidos en registros públicos o privados y regula su tratamiento.',
    palabras: ['datos personales', 'privacidad', 'informacion personal', 'base de datos', 'intimidad']
  },
  {
    id: 11,
    titulo: 'Ley 107-13 sobre Procedimiento Administrativo',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula derechos de los ciudadanos frente a la Administración Pública y el procedimiento administrativo.',
    palabras: ['procedimiento administrativo', 'administracion publica', 'recurso administrativo', 'tramite', 'debido proceso']
  },
  {
    id: 12,
    titulo: 'Ley 140-15 del Notariado',
    articulo: 'Consulta general',
    categoria: 'Civil',
    descripcion: 'Regula la función notarial y el marco legal de los notarios en la República Dominicana.',
    palabras: ['notario', 'notariado', 'acto autentico', 'legalizacion', 'firma', 'documento']
  },
  {
    id: 13,
    titulo: 'Ley 137-11 del Tribunal Constitucional y los Procedimientos Constitucionales',
    articulo: 'Consulta general',
    categoria: 'Constitucional',
    descripcion: 'Establece reglas del control constitucional y de acciones como amparo y otros procedimientos constitucionales.',
    palabras: ['tribunal constitucional', 'amparo', 'constitucional', 'derechos fundamentales', 'inconstitucionalidad']
  },
  {
    id: 14,
    titulo: 'Ley 200-04 General de Libre Acceso a la Información Pública',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Reconoce el derecho de acceso a la información pública y regula solicitudes de información al Estado.',
    palabras: ['informacion publica', 'transparencia', 'acceso a la informacion', 'documentos publicos', 'estado']
  },
  {
    id: 15,
    titulo: 'Ley 50-88 sobre Drogas y Sustancias Controladas',
    articulo: 'Consulta general',
    categoria: 'Penal',
    descripcion: 'Regula delitos, control y sanciones vinculadas a drogas y sustancias controladas.',
    palabras: ['drogas', 'narcotrafico', 'sustancias controladas', 'posesion', 'distribucion']
  },
  {
    id: 16,
    titulo: 'Ley 24-97 sobre Violencia Intrafamiliar y contra la Mujer',
    articulo: 'Consulta general',
    categoria: 'Penal',
    descripcion: 'Fortalece la protección frente a la violencia intrafamiliar y la violencia contra la mujer.',
    palabras: ['violencia intrafamiliar', 'violencia de genero', 'mujer', 'agresion', 'familia', 'maltrato']
  },
  {
    id: 17,
    titulo: 'Ley 155-17 contra el Lavado de Activos y el Financiamiento del Terrorismo',
    articulo: 'Consulta general',
    categoria: 'Penal',
    descripcion: 'Regula la prevención, persecución y sanción del lavado de activos y del financiamiento del terrorismo.',
    palabras: ['lavado de activos', 'terrorismo', 'dinero ilicito', 'investigacion financiera', 'bienes']
  },
  {
    id: 18,
    titulo: 'Ley 113-21 del Sistema Penitenciario y Correccional',
    articulo: 'Consulta general',
    categoria: 'Penal',
    descripcion: 'Establece el marco legal del sistema penitenciario y correccional dominicano.',
    palabras: ['carcel', 'prision', 'penitenciario', 'correccional', 'interno', 'condena']
  },
  {
    id: 19,
    titulo: 'Ley 33-18 de Partidos, Agrupaciones y Movimientos Políticos',
    articulo: 'Consulta general',
    categoria: 'Constitucional',
    descripcion: 'Regula la organización y funcionamiento de partidos, agrupaciones y movimientos políticos.',
    palabras: ['partidos politicos', 'politica', 'movimientos politicos', 'elecciones', 'agrupaciones']
  },
  {
    id: 20,
    titulo: 'Ley 87-01 que crea el Sistema Dominicano de Seguridad Social',
    articulo: 'Consulta general',
    categoria: 'Laboral',
    descripcion: 'Organiza el sistema de seguridad social, salud, pensiones y riesgos laborales.',
    palabras: ['seguridad social', 'afp', 'ars', 'pensiones', 'salud', 'riesgos laborales']
  },
  {
    id: 21,
    titulo: 'Ley 92-04 sobre Riesgos Laborales',
    articulo: 'Consulta general',
    categoria: 'Laboral',
    descripcion: 'Regula la cobertura y protección de accidentes y riesgos en el trabajo.',
    palabras: ['riesgos laborales', 'accidente laboral', 'trabajo', 'empleado', 'seguridad']
  },
  {
    id: 22,
    titulo: 'Ley 340-06 sobre Compras y Contrataciones Públicas',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula los procesos de compras y contrataciones de bienes, servicios, obras y concesiones del Estado.',
    palabras: ['compras publicas', 'contrataciones', 'licitacion', 'estado', 'proveedores']
  },
  {
    id: 23,
    titulo: 'Ley 448-06 sobre Soborno en el Comercio y la Inversión',
    articulo: 'Consulta general',
    categoria: 'Penal',
    descripcion: 'Sanciona el soborno y prácticas corruptas vinculadas al comercio y la inversión.',
    palabras: ['soborno', 'corrupcion', 'comercio', 'inversion', 'cohecho']
  },
  {
    id: 24,
    titulo: 'Ley 183-02 Monetaria y Financiera',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Establece el régimen monetario, bancario y financiero de la República Dominicana.',
    palabras: ['banco central', 'finanzas', 'dinero', 'bancos', 'monetaria']
  },
  {
    id: 25,
    titulo: 'Ley 358-05 de Protección al Consumidor o Usuario',
    articulo: 'Consulta general',
    categoria: 'Civil',
    descripcion: 'Protege los derechos de los consumidores y usuarios de bienes y servicios.',
    palabras: ['consumidor', 'usuario', 'compra', 'servicio', 'reclamacion']
  },
  {
    id: 26,
    titulo: 'Ley 41-08 de Función Pública',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula las relaciones de empleo público y el régimen del servidor público.',
    palabras: ['funcion publica', 'empleado publico', 'estado', 'servidor publico', 'administracion']
  },
  {
    id: 27,
    titulo: 'Ley 64-00 General sobre Medio Ambiente y Recursos Naturales',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Establece normas para la protección ambiental y el uso sostenible de los recursos naturales.',
    palabras: ['medio ambiente', 'recursos naturales', 'ecologia', 'contaminacion', 'naturaleza']
  },
  {
    id: 28,
    titulo: 'Ley 20-00 sobre Propiedad Industrial',
    articulo: 'Consulta general',
    categoria: 'Civil',
    descripcion: 'Regula las marcas, nombres comerciales, patentes y demás derechos de propiedad industrial.',
    palabras: ['marca', 'patente', 'propiedad industrial', 'nombre comercial', 'registro']
  },
  {
    id: 29,
    titulo: 'Ley 5-13 sobre Discapacidad',
    articulo: 'Consulta general',
    categoria: 'Civil',
    descripcion: 'Promueve la igualdad de derechos y la inclusión de las personas con discapacidad.',
    palabras: ['discapacidad', 'inclusion', 'derechos', 'accesibilidad', 'proteccion']
  },
  {
    id: 30,
    titulo: 'Ley 66-97 General de Educación',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Organiza el sistema educativo dominicano en sus niveles y modalidades.',
    palabras: ['educacion', 'escuela', 'docente', 'estudiante', 'sistema educativo']
  },
  {
    id: 31,
    titulo: 'Ley 139-01 de Educación Superior, Ciencia y Tecnología',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula la educación superior, la investigación científica y la tecnología.',
    palabras: ['universidad', 'educacion superior', 'ciencia', 'tecnologia', 'investigacion']
  },
  {
    id: 32,
    titulo: 'Ley 153-98 General de Telecomunicaciones',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula los servicios públicos y privados de telecomunicaciones en el país.',
    palabras: ['telecomunicaciones', 'internet', 'telefono', 'indotel', 'redes']
  },
  {
    id: 33,
    titulo: 'Ley 57-07 de Incentivo al Desarrollo de Fuentes Renovables de Energía',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Promueve el desarrollo de fuentes de energía renovable y sus incentivos.',
    palabras: ['energia renovable', 'solar', 'eolica', 'energia limpia', 'incentivo']
  },
  {
    id: 34,
    titulo: 'Ley 42-01 General de Salud',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Establece el marco general del sistema nacional de salud.',
    palabras: ['salud', 'hospital', 'medico', 'sistema de salud', 'paciente']
  },
  {
    id: 35,
    titulo: 'Ley 13-20 de Aduanas',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula el régimen aduanero, importaciones, exportaciones y control de mercancías.',
    palabras: ['aduanas', 'importacion', 'exportacion', 'mercancias', 'arancel']
  },
  {
    id: 36,
    titulo: 'Ley 15-19 Orgánica de Régimen Electoral',
    articulo: 'Consulta general',
    categoria: 'Constitucional',
    descripcion: 'Regula los procesos electorales, el voto y la organización electoral.',
    palabras: ['regimen electoral', 'voto', 'elecciones', 'jce', 'candidatos']
  },
  {
    id: 37,
    titulo: 'Ley 1-12 Estrategia Nacional de Desarrollo 2030',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Define los objetivos y metas estratégicas para el desarrollo nacional.',
    palabras: ['desarrollo nacional', 'planificacion', 'estado', 'objetivos', 'politicas publicas']
  },
  {
    id: 38,
    titulo: 'Ley 491-06 de Aviación Civil',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula la actividad aeronáutica civil en la República Dominicana.',
    palabras: ['aviacion', 'aeropuerto', 'vuelo', 'aeronautica', 'avion']
  },
  {
    id: 39,
    titulo: 'Ley 188-11 sobre Seguridad Aeroportuaria y Aviación Civil',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Establece medidas de seguridad vinculadas al sistema aeroportuario y aeronáutico.',
    palabras: ['seguridad aeroportuaria', 'aeropuerto', 'aviacion', 'control', 'vuelo']
  },
  {
    id: 40,
    titulo: 'Ley 311-14 sobre Declaración Jurada de Patrimonio',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Obliga a determinados funcionarios a declarar su patrimonio.',
    palabras: ['declaracion jurada', 'patrimonio', 'funcionario', 'bienes', 'transparencia']
  },
  {
    id: 41,
    titulo: 'Ley 340-19 sobre Alianzas Público-Privadas',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula la participación conjunta del Estado y el sector privado en proyectos públicos.',
    palabras: ['alianzas publico privadas', 'estado', 'empresa', 'proyectos', 'inversion']
  },
  {
    id: 42,
    titulo: 'Ley 249-17 del Mercado de Valores',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula la oferta pública de valores y el funcionamiento del mercado de valores.',
    palabras: ['mercado de valores', 'acciones', 'bonos', 'oferta publica', 'finanzas']
  },
  {
    id: 43,
    titulo: 'Ley 189-11 para el Desarrollo del Mercado Hipotecario y el Fideicomiso',
    articulo: 'Consulta general',
    categoria: 'Civil',
    descripcion: 'Regula el fideicomiso y promueve el desarrollo del mercado hipotecario.',
    palabras: ['hipoteca', 'fideicomiso', 'banco', 'vivienda', 'prestamo']
  },
  {
    id: 44,
    titulo: 'Ley 479-08 General de las Sociedades Comerciales y Empresas Individuales de Responsabilidad Limitada',
    articulo: 'Consulta general',
    categoria: 'Civil',
    descripcion: 'Regula la constitución, funcionamiento y disolución de sociedades comerciales.',
    palabras: ['sociedad comercial', 'empresa', 'compania', 'accionistas', 'negocio']
  },
  {
    id: 45,
    titulo: 'Ley 31-11 sobre el Colegio de Abogados de la República Dominicana',
    articulo: 'Consulta general',
    categoria: 'Civil',
    descripcion: 'Regula aspectos institucionales del ejercicio profesional vinculado al colegio de abogados.',
    palabras: ['abogados', 'colegio de abogados', 'ejercicio profesional', 'juridico', 'abogacia']
  },
  {
    id: 46,
    titulo: 'Ley 3-19 sobre Colegiación Notarial',
    articulo: 'Consulta general',
    categoria: 'Civil',
    descripcion: 'Fortalece la organización y regulación del ejercicio notarial.',
    palabras: ['notario', 'colegiacion', 'notarial', 'documento', 'firma']
  },
  {
    id: 47,
    titulo: 'Ley 176-07 del Distrito Nacional y los Municipios',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula la organización, competencias y funcionamiento de gobiernos locales.',
    palabras: ['municipio', 'ayuntamiento', 'distrito nacional', 'alcaldia', 'gobierno local']
  },
  {
    id: 48,
    titulo: 'Ley 10-04 de la Cámara de Cuentas',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Regula el órgano de control externo de los recursos públicos.',
    palabras: ['camara de cuentas', 'auditoria', 'control', 'fondos publicos', 'estado']
  },
  {
    id: 49,
    titulo: 'Ley 247-12 Orgánica de la Administración Pública',
    articulo: 'Consulta general',
    categoria: 'Administrativo',
    descripcion: 'Organiza la estructura y principios de funcionamiento de la Administración Pública.',
    palabras: ['administracion publica', 'ministerios', 'estado', 'organizacion', 'gestion publica']
  },
  {
    id: 50,
    titulo: 'Ley 137-03 sobre Tráfico Ilícito de Migrantes y Trata de Personas',
    articulo: 'Consulta general',
    categoria: 'Penal',
    descripcion: 'Sanciona el tráfico ilícito de migrantes y la trata de personas.',
    palabras: ['trata de personas', 'migrantes', 'trafico ilicito', 'explotacion', 'penal']
  }
]

const resultados = computed(() => {
  let lista = leyes

  if (categoriaSeleccionada.value !== 'Todas') {
    lista = lista.filter((ley) => ley.categoria === categoriaSeleccionada.value)
  }

  if (!busqueda.value.trim()) {
    return lista
  }

  const texto = busqueda.value.toLowerCase()

  return lista.filter((ley) => {
    return (
      ley.titulo.toLowerCase().includes(texto) ||
      ley.articulo.toLowerCase().includes(texto) ||
      ley.categoria.toLowerCase().includes(texto) ||
      ley.descripcion.toLowerCase().includes(texto) ||
      ley.palabras.some((palabra) => palabra.toLowerCase().includes(texto))
    )
  })
})

function limpiarBusqueda() {
  busqueda.value = ''
  categoriaSeleccionada.value = 'Todas'
}

function filtrarCategoria(categoria) {
  categoriaSeleccionada.value = categoria
}
</script>

<style scoped>
.home {
  width: 100%;
  padding: 40px 24px 60px;
}

.hero {
  text-align: center;
  margin-bottom: 28px;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  margin-bottom: 12px;
  color: #f8fafc;
}

.hero p {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #cbd5e1;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.6;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 28px 0 22px;
  justify-content: center;
}

.category-buttons button {
  background: #1e293b;
  color: white;
  border: 1px solid #334155;
  padding: 12px 18px;
  border-radius: 999px;
  font-weight: 600;
  transition: 0.3s;
}

.category-buttons button:hover {
  background: #2563eb;
  border-color: #2563eb;
}

.category-buttons button.active {
  background: #3b82f6;
  border-color: #3b82f6;
}

.search-box {
  display: flex;
  gap: 14px;
  margin-bottom: 22px;
  width: min(100%, 1100px);
  margin-left: auto;
  margin-right: auto;
}

.search-box input {
  flex: 1;
  min-width: 0;
  padding: 16px 18px;
  border-radius: 12px;
  background: #1e293b;
  color: white;
  border: 1px solid #334155;
  font-size: 17px;
}

.search-box input::placeholder {
  color: #94a3b8;
}

.search-box button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 15px 24px;
  border-radius: 12px;
  font-weight: 700;
  transition: 0.3s;
  white-space: nowrap;
}

.search-box button:hover {
  background: #1d4ed8;
}

.info {
  margin-bottom: 24px;
  color: #cbd5e1;
  font-size: 17px;
  text-align: center;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
  width: 100%;
}

.card {
  background: #1e293b;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
  border-left: 6px solid #3b82f6;
  transition: transform 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.card h3 {
  margin-top: 0;
  color: #f8fafc;
  margin-bottom: 14px;
  font-size: 24px;
  line-height: 1.4;
}

.card p {
  color: #cbd5e1;
  line-height: 1.7;
  font-size: 16px;
}

.tags {
  margin-top: 15px;
}

.tags span {
  display: inline-block;
  background: #0f172a;
  color: #93c5fd;
  padding: 7px 11px;
  margin: 4px 6px 0 0;
  border-radius: 999px;
  font-size: 13px;
  border: 1px solid #1e3a8a;
}

.no-results {
  background: #1e293b;
  color: #fca5a5;
  padding: 20px;
  border-radius: 14px;
  text-align: center;
  border: 1px solid #7f1d1d;
  width: min(100%, 900px);
  margin: 0 auto;
}

@media (max-width: 768px) {
  .home {
    padding: 32px 16px 50px;
  }

  .search-box {
    flex-direction: column;
  }

  .search-box button {
    width: 100%;
  }
}
</style>