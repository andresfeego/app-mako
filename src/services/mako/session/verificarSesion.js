import store from '../../../res/localStore/LocalStore';
import { clearUsuario as clearUsuarioAction } from '../../../res/localStore/Actions';
import { verificarSesionEnBackend } from '../helpersGetDB';

export async function verificarSesionActiva() {
  try {
    const userId = await verificarSesionEnBackend();
    if (!userId) {
      store.dispatch(clearUsuarioAction());
    }
    return userId || null;
  } catch (err) {
    store.dispatch(clearUsuarioAction());
    return null;
  }
}

