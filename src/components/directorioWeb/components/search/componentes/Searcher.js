import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Seacher extends React.Component {
  render() {
    const { query } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Resultado para: {query}</Text>
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
