import { setDB } from './SetDB';

export async function crearEmpresaBasica(data) {
  return await setDB('/crearEmpresaBasica', data);
}

export async function uploadLogo(image) {
  const formData = new FormData();
  formData.append('image', image);
  return await setDB('/uploadLogo', formData);
}

export async function nuevoUsuario(nombre, apellido, correo, pass, genero, tkgoogle, tkfacebook) {
  const data = { nombre, apellido, correo, pass, genero, tkgoogle, tkfacebook };
  return await setDB('/usuario/nuevoUsuario', data);
}

export async function saveBit(data) {
  return await setDB('/bitacora/nuevoEvento', data);
}

export async function logoutUsuario() {
  return await setDB('/usuario/logout', { method: 'POST' });
}

export async function guardarRolesUsuario(idUsuario, roles) {
  return await setDB('/usuario/actualizarRolesUsuario', {
    method: 'POST',
    body: { idUsuario, roles },
  });
}

export async function crearUiPermission(slug, descripcion, id_tipo) {
  return await setDB('/interface/crearUiPermission', {
    method: 'POST',
    body: { slug, descripcion, id_tipo },
  });
}

export async function actualizarUiPermissionsRol(idRol, permisos) {
  return await setDB('/interface/actualizarUiPermissionsRol', {
    method: 'POST',
    body: { idRol, permisos },
  });
}

export async function actualizarRolesDeUiPermission(idUiPermission, roles) {
  return await setDB('/interface/actualizarRolesDeUiPermission', {
    method: 'POST',
    body: { idUiPermission, roles },
  });
}

export async function actualizarUiPermission(id, descripcion, id_tipo) {
  return await setDB('/interface/actualizarUiPermission', {
    method: 'POST',
    body: { id, descripcion, id_tipo },
  });
}

export async function eliminarUiPermission(id) {
  return await setDB(`/interface/eliminarUiPermission/${id}`, { method: 'DELETE' });
}

export async function crearEmpresaRapida(payload) {
  return await setDB('/empresas/crearEmpresaRapida', { method: 'POST', body: payload });
}

export async function crearFavorito(idUsuario, codigo_empresa, label, nota = '', notificar = 0, origen = 'app') {
  const body = { idUsuario, codigo_empresa, label, nota, notificar, origen };
  return await setDB('/favoritos/crear', { method: 'POST', body });
}

export async function extraerDatosTarjeta(files) {
  if (!files?.length) throw new Error('No se proporcionaron imágenes.');
  const formData = new FormData();
  files.forEach((f) => formData.append('images', f));
  return await setDB('/gpt/extraerDatosTarjeta', formData);
}

