const DIGIMON_API_URL = 'https://digimon-api.vercel.app/api/digimon'

/**
 * Obtiene todos los Digimons de la API
 * @returns {Promise<Array>} - Lista de todos los Digimons
 */
export const getAllDigimons = async () => {
  try {
    const response = await fetch(DIGIMON_API_URL)

    if (!response.ok) {
      throw new Error('Error al obtener los Digimons')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error en getAllDigimons:', error)
    throw error
  }
}

/**
 * Filtra Digimons por nombre
 * @param {Array} digimons - Lista de Digimons
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Array} - Digimons filtrados
 */
export const filterByName = (digimons, searchTerm) => {
  if (!searchTerm.trim()) {
    return digimons
  }

  return digimons.filter((digimon) => digimon.name.toLowerCase().includes(searchTerm.toLowerCase()))
}

/**
 * Filtra Digimons por nivel
 * @param {Array} digimons - Lista de Digimons
 * @param {string} level - Nivel a filtrar
 * @returns {Array} - Digimons filtrados
 */
export const filterByLevel = (digimons, level) => {
  if (!level || level === 'all') {
    return digimons
  }

  return digimons.filter((digimon) => digimon.level === level)
}

/**
 * Obtiene todos los niveles únicos de los Digimons
 * @param {Array} digimons - Lista de Digimons
 * @returns {Array} - Lista de niveles únicos
 */
export const getUniqueLevels = (digimons) => {
  const levels = digimons.map((digimon) => digimon.level)
  return [...new Set(levels)].sort()
}

/**
 * Filtra Digimons por nombre Y nivel
 * @param {Array} digimons - Lista de Digimons
 * @param {string} searchTerm - Término de búsqueda
 * @param {string} level - Nivel a filtrar
 * @returns {Array} - Digimons filtrados
 */
export const filterDigimons = (digimons, searchTerm, level) => {
  let filtered = digimons

  // Filtrar por nombre
  if (searchTerm.trim()) {
    filtered = filterByName(filtered, searchTerm)
  }

  // Filtrar por nivel
  if (level && level !== 'all') {
    filtered = filterByLevel(filtered, level)
  }

  return filtered
}
