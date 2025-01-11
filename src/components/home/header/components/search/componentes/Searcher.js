import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Seacher extends React.Component {
  render() {
    // Obtén el parámetro `query` de la navegación
    const { query } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Resultado para: {query}</Text>
        {/* Aquí puedes agregar la lógica para mostrar los resultados */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Seacher;
