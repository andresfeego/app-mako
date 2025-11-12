import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import colors from '../../../../../res/colors';

class SlideCat extends Component {
  render() {
    const items = [
      { key: 'spacer-start' },
      { key: 'asesor', icon: require('../../../../../assets/mapache.png'), label: 'Asesor MAKO' },
      { key: 'domicilios', icon: require('../../../../../assets/domi.png'), label: 'Domicilios' },
      { key: 'taxis', icon: require('../../../../../assets/taxi.png'), label: 'Taxis' },
      { key: 'lavadoras', icon: require('../../../../../assets/lavadora.png'), label: 'Alquiler de lavadoras' },
      { key: 'cerrajerias', icon: require('../../../../../assets/cerradura.png'), label: 'Cerrajerias' },
      { key: 'acarreos', icon: require('../../../../../assets/acarreos.png'), label: 'Acarreos' },
      { key: 'asaderos', icon: require('../../../../../assets/asaderos.png'), label: 'Asaderos' },
      { key: 'bares', icon: require('../../../../../assets/bares.png'), label: 'Bares' },
      { key: 'cafes', icon: require('../../../../../assets/cafe.png'), label: 'Cafes' },
      { key: 'china', icon: require('../../../../../assets/china.png'), label: 'Comida china' },
      { key: 'asaderos-2', icon: require('../../../../../assets/asaderos.png'), label: 'Asaderos' },
      { key: 'spacer-end-1' },
      { key: 'spacer-end-2' },
    ];
    return (
      <View style={styles.buscat}>
        <ScrollView style={styles.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.touch}>
            {items.map((item) => (
              <Pressable key={item.key} style={styles.circulo}>
                {item.icon ? (
                  <View style={styles.cajaicono}>
                    <Image source={item.icon} style={styles.icono} resizeMode="contain" />
                  </View>
                ) : (
                  <View />
                )}
                <View style={styles.cajatexto}>
                  <Text style={styles.texto}>{item.label || ''}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buscat: {
    width: 700,
    height: '10%',
    zIndex: -1000,
    top: -35,
    right: 80,
    transform: [{ rotate: '20deg' }],
  },
  scroll: {
    zIndex: 10000,
  },
  touch: {
    gap: 8,
    bottom: 60,
    alignItems: 'flex-start',
    width: 'auto',
    height: 200,
    flexDirection: 'row',
  },
  circulo: {
    width: 55,
    height: 75,
    margin: 8,
    top: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    transform: [{ rotate: '-20deg' }],
  },
  cajaicono: {
    padding: 22,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 70,
    borderColor: colors.secondary,
    borderWidth: 1
  },
  icono: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    tintColor: '#34C1BB',
    opacity: 0.8,
  },
  cajatexto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  texto: {
    fontSize: 8,
    fontFamily: 'CaviarDreams',
    fontWeight: 'bold',
    color: colors.gray4,
    textAlign: 'center',
  },
});

export default SlideCat;
