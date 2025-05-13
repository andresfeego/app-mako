import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginOptionMenu from '../login/components/LoginOptionMenu';
import LoginMakoForm from '../login/components/LoginMakoForm';
import RegisterForm from '../login/components/RegisterForm';

const LoginOptions = ({ onMakoPress, onLoginSuccess }) => {
  const [pantallaInterna, setPantallaInterna] = useState('options');
  const [historial, setHistorial] = useState([]);

  const navegarA = (nuevaPantalla) => {
    setHistorial((prev) => [...prev, pantallaInterna]);
    setPantallaInterna(nuevaPantalla);
  };

  const volver = () => {
    if (historial.length > 0) {
      const anterior = historial[historial.length - 1];
      setHistorial((prev) => prev.slice(0, -1));
      setPantallaInterna(anterior);
    }
  };

  const renderContenido = () => {
    if (pantallaInterna === 'options')
      return <LoginOptionMenu navegarA={navegarA} />;
    if (pantallaInterna === 'login-mako')
      return <LoginMakoForm navegarA={navegarA} volver={volver} onLoginSuccess={onLoginSuccess} />;
    return <RegisterForm navegarA={navegarA} volver={volver} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {renderContenido()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
});

export default LoginOptions;
