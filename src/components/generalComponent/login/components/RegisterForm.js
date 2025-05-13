import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../../../res/colors';

const RegisterForm = ({ navegarA, volver }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
    nombre: '',
    apellido: '',
    genero: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCreate = () => {
    console.log('Registrando:', form);
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
        value={form.email}
        onChangeText={(val) => handleChange('email', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#666"
        secureTextEntry
        value={form.password}
        onChangeText={(val) => handleChange('password', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#666"
        secureTextEntry
        value={form.confirm}
        onChangeText={(val) => handleChange('confirm', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres"
        placeholderTextColor="#666"
        value={form.nombre}
        onChangeText={(val) => handleChange('nombre', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        placeholderTextColor="#666"
        value={form.apellido}
        onChangeText={(val) => handleChange('apellido', val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Género"
        placeholderTextColor="#666"
        value={form.genero}
        onChangeText={(val) => handleChange('genero', val)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleCreate}>
        <Text style={styles.loginButtonText}>Crear cuenta</Text>
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
});

export default RegisterForm;
