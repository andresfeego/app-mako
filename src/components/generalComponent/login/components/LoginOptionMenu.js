import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../../../../res/colors';

const LoginOptionMenu = ({ navegarA }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Continuar con</Text>

      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../../../../assets/google.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navegarA('login-mako')}>
        <Image
          source={require('../../../../assets/logomako.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>Mako</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { width: '100%', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 30, fontWeight: 'bold', color: colors.black },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFC107',
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
  },
  icon: { width: 24, height: 24, marginRight: 15 },
  buttonText: { fontSize: 16, fontWeight: '600', color: colors.black },
});

export default LoginOptionMenu;
