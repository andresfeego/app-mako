import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable, Text } from 'react-native';
import colors from '../../../../../res/colors';

class ListEmp extends Component {
  render() {
    return (
      <View style={styles.general}>
        <View style={styles.listaempre}>
          <ScrollView style={styles.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.touch}>
              <Pressable style={styles.circulo}>
                <View>
                  <Image
                    source={require('../../../../../assets/asaderos.png')}
                    style={styles.icono}
                    resizeMode='contain'
                  />
                </View>
                <View style={styles.cajatexto}>
                  <Text style={styles.texto}>Asaderos</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  general: {
    height: 'auto',
    zIndex: 10000,
  },
  listaempre: {
    bottom: 80,
    width: 'auto',
    height: 'auto',
    alignItems: 'start',
    justifyContent: 'center',
    transform: [{ rotate: '23deg' }],
    borderRadius: 60,
    left: -28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
  },
  touch: {
    bottom: 150,
    alignItems: 'start',
    width: 'auto',
    height: 400,
    display: 'flex',
    flexDirection: 'row',
  },
  circulo: {
    width: 68,
    margin: 5,
    top: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    transform: [{ rotate: '-23deg' }],
  },
  icono: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cajatexto: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    display: 'flex',
  },
});

export default ListEmp;
