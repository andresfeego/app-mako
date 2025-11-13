import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verificarSesionEnBackend } from '../helpersGetDB';
import { setUsuario as setUsuarioAction, clearUsuario as clearUsuarioAction } from '../../../res/localStore/Actions';

export default function useSesionValida() {
  const [cargando, setCargando] = useState(true);
  const [autenticado, setAutenticado] = useState(false);
  const usuario = useSelector((state) => state.usuario);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancel = false;
    async function validar() {
      setCargando(true);
      const userId = await verificarSesionEnBackend();

      if (cancel) return;

      if (userId) {
        setAutenticado(true);
        // Asegura que el store esté sincronizado si fuera necesario
        if (!usuario?.id) {
          dispatch(setUsuarioAction({ id: userId }));
        }
      } else {
        dispatch(clearUsuarioAction());
        setAutenticado(false);
      }

      setCargando(false);
    }
    validar();
    return () => {
      cancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario?.id]);

  return { autenticado, cargando };
}

