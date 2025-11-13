// Firebase Auth (stub for React Native)
// If you want Google/Facebook login in RN, install and configure:
// @react-native-firebase/app and @react-native-firebase/auth, or expo-auth-session (Expo).
// This stub keeps the same interface used on web.

export const authProvider = async (provider) => {
  return Promise.reject(
    new Error(
      `authProvider(${provider}) no está implementado en React Native. ` +
        'Instala y configura RN Firebase Auth para habilitar login social.'
    )
  );
};

