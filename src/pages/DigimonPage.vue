<template>
  <div class="digimon-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">🔥 Digimon World</h1>
          <p class="page-subtitle">Explora el mundo digital</p>
        </div>
        <button @click="handleLogout" class="logout-button">
          <span class="logout-icon">🚪</span>
          Cerrar Sesión
        </button>
      </div>
    </header>

    <div class="page-content">
      <!-- Filtros -->
      <DigimonFilter
        :levels="uniqueLevels"
        :total-results="filteredDigimons.length"
        @search="handleSearch"
        @level-change="handleLevelChange"
      />

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">Cargando Digimons...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">⚠️</div>
        <h3 class="error-title">Error al cargar Digimons</h3>
        <p class="error-message">{{ error }}</p>
        <button @click="loadDigimons" class="retry-button">
          Reintentar
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredDigimons.length === 0" class="empty-container">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">No se encontraron Digimons</h3>
        <p class="empty-message">
          Intenta con otros términos de búsqueda o filtros
        </p>
      </div>

      <!-- Digimon Grid -->
      <div v-else class="digimon-grid">
        <DigimonCard
          v-for="digimon in filteredDigimons"
          :key="digimon.name"
          :digimon="digimon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DigimonCard from '../components/digimon/DigimonCard.vue';
import DigimonFilter from '../components/digimon/DigimonFilter.vue';
import { getAllDigimons, filterDigimons, getUniqueLevels } from '../services/digimonApi';
import { logout } from '../services/authApi';

export default {
  name: 'DigimonPage',
  components: {
    DigimonCard,
    DigimonFilter
  },
  setup() {
    const router = useRouter();
    const digimons = ref([]);
    const loading = ref(true);
    const error = ref('');
    const searchTerm = ref('');
    const selectedLevel = ref('all');

    // Computed: Digimons filtrados
    const filteredDigimons = computed(() => {
      return filterDigimons(digimons.value, searchTerm.value, selectedLevel.value);
    });

    // Computed: Niveles únicos para el filtro
    const uniqueLevels = computed(() => {
      return getUniqueLevels(digimons.value);
    });

    // Cargar Digimons desde la API
    const loadDigimons = async () => {
      loading.value = true;
      error.value = '';

      try {
        const data = await getAllDigimons();
        digimons.value = data;
      } catch (err) {
        error.value = err.message || 'Error al cargar los Digimons';
        console.error('Error:', err);
      } finally {
        loading.value = false;
      }
    };

    // Manejar búsqueda
    const handleSearch = (term) => {
      searchTerm.value = term;
    };

    // Manejar cambio de nivel
    const handleLevelChange = (level) => {
      selectedLevel.value = level;
    };

    // Manejar logout
    const handleLogout = () => {
      logout();
      router.push('/login');
    };

    // Cargar datos al montar el componente
    onMounted(() => {
      loadDigimons();
    });

    return {
      digimons,
      loading,
      error,
      filteredDigimons,
      uniqueLevels,
      handleSearch,
      handleLevelChange,
      handleLogout,
      loadDigimons
    };
  }
};
</script>

<style scoped>
.digimon-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Header */
.page-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #2d3436;
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #636e72;
  margin: 0;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #ff7675 0%, #d63031 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(214, 48, 49, 0.3);
}

.logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(214, 48, 49, 0.4);
}

.logout-icon {
  font-size: 20px;
}

/* Content */
.page-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
}

/* Error State */
.error-container {
  background: white;
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.error-title {
  font-size: 24px;
  font-weight: 700;
  color: #2d3436;
  margin: 0 0 12px 0;
}

.error-message {
  font-size: 16px;
  color: #636e72;
  margin: 0 0 24px 0;
}

.retry-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Empty State */
.empty-container {
  background: white;
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: #2d3436;
  margin: 0 0 12px 0;
}

.empty-message {
  font-size: 16px;
  color: #636e72;
  margin: 0;
}

/* Digimon Grid */
.digimon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 1200px) {
  .digimon-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 20px;
    flex-direction: column;
    gap: 16px;
  }

  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .logout-button {
    width: 100%;
    justify-content: center;
  }

  .page-content {
    padding: 20px;
  }

  .digimon-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-content {
    padding: 16px;
  }

  .digimon-grid {
    grid-template-columns: 1fr;
  }

  .error-container,
  .empty-container {
    padding: 32px 20px;
  }
}
</style>
