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

/**
 * Realiza signin usando el endpoint proporcionado.
 * Guarda el `token` y el `user` en localStorage si la petición es exitosa.
 * @param {{email:string,password:string}} creds
 */
export const signin = async (creds) => {
  const url = 'https://storedb-api.onrender.com/node-api/users/signin'

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
    },
    body: JSON.stringify(creds),
  })

  if (!res.ok) {
    // intentar leer mensaje de error
    let payload = null
    try { payload = await res.json() } catch { /* ignore */ }
    const msg = (payload && (payload.message || payload.error)) || `HTTP ${res.status}`
    throw new Error(msg)
  }

  const data = await res.json()

  try {
    if (data.token) localStorage.setItem('token', data.token)
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user))
  } catch {
    // fallthrough: no romper en entornos sin localStorage
  }

  return data
}

export default {
  signin,
  logout,
}
