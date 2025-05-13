import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../../../res/colors';

const LoginMakoForm = ({ navegarA, volver, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Este campo no puede estar vacío';
    if (!password) newErrors.password = 'Este campo no puede estar vacío';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (email === 'usuario' && password === '0000') {
      onLoginSuccess();
    } else {
      setErrors({
        email: '',
        password: 'Credenciales incorrectas',
      });
    }
  };

  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={volver}>
        <Icon name="arrow-left" size={22} color="black" />
      </TouchableOpacity>

      <Image
        source={require('../../../../assets/logomako.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navegarA('crear-cuenta')}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { width: '100%', alignItems: 'center' },
  backButton: { position: 'absolute', top: -10, left: -10 },
  logo: { width: 80, height: 80, marginBottom: 25, marginTop: 30 },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    marginBottom: 20,
    paddingVertical: 5,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#FFC107',
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
  loginButtonText: { fontWeight: '600', fontSize: 16, color: 'black' },
  link: { fontSize: 16, color: '#00C8B0', fontWeight: '500' },
  errorText: { width: '100%', color: 'red', marginTop: -15, marginBottom: 10, fontSize: 13 },
});

export default LoginMakoForm;
