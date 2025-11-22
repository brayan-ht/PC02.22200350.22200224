<template>
  <div class="digimon-card">
    <div class="card-image-container">
      <img
        :src="digimon.img"
        :alt="digimon.name"
        class="card-image"
        @error="handleImageError"
      >
      <div class="level-badge" :class="getLevelClass(digimon.level)">
        {{ digimon.level }}
      </div>
    </div>

    <div class="card-content">
      <h3 class="card-title">{{ digimon.name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigimonCard',
  props: {
    digimon: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleImageError(event) {
      // Imagen por defecto si falla la carga
      event.target.src = 'https://via.placeholder.com/200x200?text=Digimon';
    },
    getLevelClass(level) {
      // Normalizar el nivel para la clase CSS
      return level.toLowerCase().replace(/\s+/g, '-');
    }
  }
};
</script>

<style scoped>
.digimon-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.digimon-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-image-container {
  position: relative;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.card-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.digimon-card:hover .card-image {
  transform: scale(1.1);
}

.level-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Colores por nivel */
.level-badge.fresh {
  background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
  color: #2d3436;
}

.level-badge.in-training {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  color: white;
}

.level-badge.rookie {
  background: linear-gradient(135deg, #55efc4 0%, #00b894 100%);
  color: white;
}

.level-badge.champion {
  background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
  color: white;
}

.level-badge.ultimate {
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  color: white;
}

.level-badge.mega {
  background: linear-gradient(135deg, #ff7675 0%, #d63031 100%);
  color: white;
}

.level-badge.armor {
  background: linear-gradient(135deg, #fab1a0 0%, #e17055 100%);
  color: white;
}

/* Default para niveles no específicos */
.level-badge:not(.fresh):not(.in-training):not(.rookie):not(.champion):not(.ultimate):not(.mega):not(.armor) {
  background: linear-gradient(135deg, #dfe6e9 0%, #b2bec3 100%);
  color: #2d3436;
}

.card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #2d3436;
  text-align: center;
  margin: 0;
  line-height: 1.3;
}

/* Responsive */
@media (max-width: 768px) {
  .card-image {
    width: 150px;
    height: 150px;
  }

  .card-title {
    font-size: 18px;
  }

  .level-badge {
    font-size: 10px;
    padding: 4px 8px;
  }
}
</style>
