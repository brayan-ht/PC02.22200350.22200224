// Simple auth helper utilities

/**
 * Realiza el logout del usuario eliminando tokens/localStorage.
 */
export const logout = () => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  } catch {
    // No hacer nada si el entorno no soporta localStorage
    // (por ejemplo durante pruebas o SSR)
    // Mantener silencioso el error para no romper la app
  }
}

export default {
  logout,
}
