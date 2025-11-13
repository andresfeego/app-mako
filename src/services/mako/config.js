// Central config for Mako backend access in React Native
// Update HOST_NAME to point to your API base URL, e.g. "https://api.mako.com"

// Local backend default (adjust per environment)
import { Platform } from 'react-native';

// Si usas dispositivo físico en la misma red Wi‑Fi,
// pon aquí la IP de tu máquina (ajústala):
export const LAN_IP = '192.168.20.21'; // <- cambia a la IP de tu PC
export const USE_LAN = false; // pon true para forzar IP LAN en todos los casos

// Resolve base URL según entorno
export const HOST_NAME = (() => {
  const base = `http://${LAN_IP}:3020/api/responseMako`;
  if (USE_LAN) return base;
  // Simuladores
  if (Platform.OS === 'android') return 'http://192.168.80.21:3020/api/responseMako'; // Android emulator
  if (Platform.OS === 'ios') return 'http://192.168.80.21:3020/api/responseMako'; // iOS simulator
  // Fallback (por si RN Web u otros):
  return base;
})();

export const LOG_GETDB = true; // habilitado para depurar llamadas
