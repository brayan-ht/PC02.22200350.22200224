<template>
  <div class="filter-container">
    <div class="filter-wrapper">
      <!-- Buscador por nombre -->
      <div class="search-box">
        <div class="search-icon">
          🔍
        </div>
        <input
          type="text"
          v-model="searchTerm"
          @input="handleSearch"
          placeholder="Buscar Digimon por nombre..."
          class="search-input"
        >
        <button
          v-if="searchTerm"
          @click="clearSearch"
          class="clear-button"
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      </div>

      <!-- Filtro por nivel -->
      <div class="level-filter">
        <div class="filter-icon">
          ⚡
        </div>
        <select
          v-model="selectedLevel"
          @change="handleLevelChange"
          class="level-select"
        >
          <option value="all">Todos los niveles</option>
          <option
            v-for="level in levels"
            :key="level"
            :value="level"
          >
            {{ level }}
          </option>
        </select>
      </div>
    </div>

    <!-- Contador de resultados -->
    <div class="results-info" v-if="totalResults !== null">
      <span class="results-count">
        {{ totalResults }} {{ totalResults === 1 ? 'resultado' : 'resultados' }}
      </span>
      <button
        v-if="searchTerm || selectedLevel !== 'all'"
        @click="clearAllFilters"
        class="clear-all-button"
      >
        Limpiar filtros
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigimonFilter',
  props: {
    levels: {
      type: Array,
      default: () => []
    },
    totalResults: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      searchTerm: '',
      selectedLevel: 'all'
    };
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchTerm);
    },
    handleLevelChange() {
      this.$emit('level-change', this.selectedLevel);
    },
    clearSearch() {
      this.searchTerm = '';
      this.handleSearch();
    },
    clearAllFilters() {
      this.searchTerm = '';
      this.selectedLevel = 'all';
      this.$emit('search', '');
      this.$emit('level-change', 'all');
    }
  }
};
</script>

<style scoped>
.filter-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.filter-wrapper {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  margin-bottom: 16px;
}

/* Search Box */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 12px;
  padding: 0 16px;
  transition: all 0.3s ease;
}

.search-box:focus-within {
  background: #e8ecef;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-icon {
  font-size: 20px;
  margin-right: 12px;
  opacity: 0.6;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 14px 0;
  font-size: 16px;
  color: #2d3436;
  outline: none;
}

.search-input::placeholder {
  color: #636e72;
  opacity: 0.7;
}

.clear-button {
  background: #dfe6e9;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  color: #636e72;
  transition: all 0.2s ease;
  margin-left: 8px;
}

.clear-button:hover {
  background: #b2bec3;
  color: #2d3436;
  transform: rotate(90deg);
}

/* Level Filter */
.level-filter {
  position: relative;
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 12px;
  padding: 0 16px;
  min-width: 250px;
}

.filter-icon {
  font-size: 20px;
  margin-right: 12px;
  opacity: 0.6;
}

.level-select {
  flex: 1;
  border: none;
  background: transparent;
  padding: 14px 8px 14px 0;
  font-size: 16px;
  color: #2d3436;
  cursor: pointer;
  outline: none;
  font-weight: 500;
}

.level-select:focus {
  background: transparent;
}

/* Results Info */
.results-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #dfe6e9;
}

.results-count {
  font-size: 14px;
  color: #636e72;
  font-weight: 500;
}

.clear-all-button {
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-all-button:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .filter-wrapper {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .level-filter {
    min-width: 100%;
  }

  .search-input,
  .level-select {
    font-size: 14px;
  }

  .results-info {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .clear-all-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .filter-container {
    padding: 16px;
  }

  .search-box,
  .level-filter {
    padding: 0 12px;
  }

  .search-icon,
  .filter-icon {
    font-size: 18px;
  }
}
</style>
