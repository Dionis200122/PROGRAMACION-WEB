<template>
  <div class="app-shell">
    <header class="navbar">
      <div class="navbar-inner">
        <div class="logo">LexRD</div>

        <nav class="nav-links">
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/">Leyes</RouterLink>
          <RouterLink to="/about">Acerca de</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  width: 100%;
  min-height: 100vh;
}

.navbar {
  width: 100%;
  background: #0b1220;
  border-bottom: 1px solid #1e293b;
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar-inner {
  width: 100%;
  padding: 18px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 32px;
  font-weight: 700;
  color: #60a5fa;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
}

.nav-links a {
  color: white;
  font-weight: 500;
  transition: 0.3s;
}

.nav-links a:hover {
  color: #60a5fa;
}

.nav-links a.router-link-active {
  color: #60a5fa;
}

.main-content {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar-inner {
    padding: 16px 18px;
    flex-direction: column;
    gap: 12px;
  }

  .logo {
    font-size: 28px;
  }

  .nav-links {
    justify-content: center;
  }
}
</style>