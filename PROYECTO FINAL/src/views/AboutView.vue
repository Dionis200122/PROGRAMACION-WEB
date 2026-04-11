<template>
  <section class="about">
    <h1>Acerca de LexRD</h1>

    <div class="box">
      <p>
        LexRD Buscador Legal es una aplicación web desarrollada para ayudar a
        abogados y estudiantes de Derecho de la República Dominicana a buscar
        leyes, artículos y temas jurídicos de forma más rápida.
      </p>

      <p>
        El usuario solo necesita escribir una palabra clave, como tránsito,
        robo, allanamiento o trabajo, y la aplicación muestra resultados
        relacionados con el tema buscado.
      </p>

      <p>
        Este proyecto fue creado como una solución útil, práctica y aplicable
        al área legal, utilizando Vue.js como framework principal.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  width: 100%;
  padding: 50px 60px 70px;
}

.about h1 {
  text-align: center;
  color: #f8fafc;
  margin-bottom: 30px;
  font-size: 48px;
}

.box {
  background: #1e293b;
  padding: 32px;
  border-radius: 18px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
  border-left: 6px solid #3b82f6;
  width: 100%;
}

.box p {
  color: #cbd5e1;
  line-height: 1.9;
  font-size: 18px;
  margin-bottom: 18px;
}

@media (max-width: 768px) {
  .about {
    padding: 40px 20px 60px;
  }

  .about h1 {
    font-size: 36px;
  }

  .box p {
    font-size: 16px;
  }
}
</style>