import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import GeneralMenu from '../../views/directorioWeb/components/generalMenu/GeneralMenu';
import LoginOptions from '../../generalComponent/login/LoginOptions';
import MenuDrawer from '../../views/usuarios/menuDrawer/MenuDrawer';
import { AuthContext } from '../../../context/AuthContext';

const Usuario = () => {
  const { logueado, setLogueado } = useContext(AuthContext);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.avoider}
    >
      <View style={styles.container}>
        {!logueado && (
          <LoginOptions onLoginSuccess={() => setLogueado(true)} />
        )}
        {logueado && <MenuDrawer />}
        
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoider: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    position: 'relative',
  },
});

export default Usuario;
