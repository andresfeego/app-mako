import { getDB } from './GetDB';
import store from '../../res/localStore/LocalStore';
import { clearUsuario as clearUsuarioAction, setUsuario as setUsuarioAction } from '../../res/localStore/Actions';

// Empresas y contenido
export async function getEmpresas(busqueda, ciudad, categoria, signal, limInf = 0, limSup = 9000000000) {
  const options = {
    method: 'POST',
    body: { ciudad, busServicios: busqueda, busCategoria: categoria, limInf, limSup },
    signal,
  };
  return await getDB('/empresas', options);
}

export async function getEmpresa(id) {
  return await getDB(`/empresas/${id}`, { method: 'GET' });
}

export async function getTelefonosEmpresa(id) {
  return await getDB(`/empresas/telefonos/${id}`, { method: 'GET' });
}

export async function getEmailsEmpresa(id) {
  return await getDB(`/empresas/emails/${id}`, { method: 'GET' });
}

export async function getRedesEmpresa(id) {
  return await getDB(`/empresas/redes/${id}`, { method: 'GET' });
}

export async function getHorariosEmpresa(id) {
  return await getDB(`/empresas/horarios/${id}`, { method: 'GET' });
}

export async function getImagenesSlideEmpresa(id) {
  return await getDB(`/empresas/imagenesSlide/${id}`, { method: 'GET' });
}

export async function getListaMunicipios() {

  const data = await getDB('/listaMunicipios', { method: 'GET' });
  try {
    // eslint-disable-next-line no-console
    console.log('[getListaMunicipios] total:', Array.isArray(data) ? data.length : 'resp no-array');
    if (Array.isArray(data) && data.length) {
      // eslint-disable-next-line no-console
      console.log('[getListaMunicipios] sample:', data.slice(0, 3));
    } else {
      // eslint-disable-next-line no-console
      console.log('[getListaMunicipios] respuesta:', data);
    }
  } catch {}
  return data;
}

export async function getSlides() {
  return await getDB('/slides', { method: 'GET' });
}

// Bitácora / Analítica (lectura)
export async function getBusquedasPalabra() {
  return await getDB('/bitacora/busquedasPalabra', { method: 'GET' });
}

export async function getFlujosNavegacion() {
  return await getDB('/bitacora/flujosNavegacion', { method: 'GET' });
}

// Categorías y datos de catálogo
export async function getCategoriasCompletas(cat) {
  // En backend Next se usa '/categoriasCompletas/:cat'.
  const data = await getDB(`/categoriasCompletas/${cat}`, { method: 'GET' });
  try {
    console.log('[getCategoriasCompletas] cat=', cat, '→', Array.isArray(data) ? data.length : 'resp');
  } catch {}
  return data;
}

export async function getCategoriasConEmpresas() {
  return await getDB('/categoriasConEmpresas', { method: 'GET' });
}

export async function getCiudadesConEmpresas() {
  return await getDB('/ciudadesConEmpresas', { method: 'GET' });
}

export async function getCiudadYCategoriaConEmpresas() {
  return await getDB('/ciuycatConEmpresas', { method: 'GET' });
}

export async function getTodasLasEmpresas() {
  return await getDB('/empresas', {
    body: { ciudad: '', busServicios: '', busCategoria: '', limInf: 0, limSup: 999999 },
  });
}

export async function getSubcategoria2Xid(idCat) {
  return await getDB(`/subcategoria2Xid/${idCat}`, { method: 'GET' });
}

// Usuario / Sesión / Roles
export async function usuarioExiste(idUsuario) {
  const data = await getDB(`/usuario/usuarioExiste/${idUsuario}`, { method: 'GET' });
  return data && data.length > 0 ? data[0] : null;
}

export async function loginUsuario(correo, pass) {
  return await getDB('/usuario/loginUsuario', { method: 'POST', body: { correo, pass } });
}

export async function loginSocial(correo) {
  return await getDB('/usuario/loginSocial', { method: 'POST', body: { correo } });
}

export async function getRolesUsuario(idUser) {
  return await getDB(`/usuario/rolesXid/${idUser}`, { method: 'GET' });
}

export async function getUsuario(idUser) {
  const data = await getDB(`/usuario/usuarioXid/${idUser}`, { method: 'GET' });
  return data && typeof data === 'object' ? data : null;
}

export async function getUsuarios() {
  return await getDB('/usuario/listarUsuarios', { method: 'GET' });
}

export async function getRolesDisponibles() {
  return await getDB('/usuario/listarRolesDisponibles', { method: 'GET' });
}

export async function getRolesPorUsuario(idUsuario) {
  return await getDB(`/usuario/rolesXid/${idUsuario}`, { method: 'GET' });
}

export async function getTiposInterfaces() {
  return await getDB('/interface/listarTiposInterfaces', { method: 'GET' });
}

export async function getUiPermissions() {
  return await getDB('/interface/listarUiPermissions', { method: 'GET' });
}

export async function getUiPermissionsPorRol(idRol) {
  return await getDB(`/interface/uiPermissionsPorRol/${idRol}`, { method: 'GET' });
}

export async function getRolesPorUiPermission(idUiPermission) {
  return await getDB(`/interface/rolesPorUiPermission/${idUiPermission}`, { method: 'GET' });
}

export async function actualizarPermisos(idUsuario) {
  try {
    const permisos = await getDB(`/usuario/uiPermisosXid/${idUsuario}`, { method: 'GET' });
    // Persist into Redux store under usuario.roles/uiPermisos if you keep it there
    const current = store.getState().usuario || {};
    const merged = { ...current, uiPermisos: permisos };
    store.dispatch(setUsuarioAction(merged));
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[actualizarPermisos] Error:', err);
    return false;
  }
}

export async function verificarSesionEnBackend() {
  // Mirror web behavior: trust local store for active session id
  const state = store.getState();
  const user = state?.usuario;
  return user?.id || null;
  // If later you want server validation:
  // const res = await getDB('/usuario/sessionActiva', { method: 'GET' });
  // if (!res?.active) { store.dispatch(clearUsuarioAction()); return null; }
  // return res.userId;
}

export async function cargarDataUsuario(idUser) {
  const data = await getUsuario(idUser);
  if (!data || typeof data !== 'object') {
    throw new Error('No se pudo obtener la información del usuario');
  }
  const current = store.getState().usuario || {};
  const merged = { ...current, dataUsuario: data };
  store.dispatch(setUsuarioAction(merged));
}
