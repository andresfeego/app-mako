import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import colors from '../../../../../res/colors';

class Header extends Component {


  render() {
    return (
      <View style={styles.buscat}>
        <ScrollView style={styles.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.touch}>

            <Pressable style={styles.circulo}>
              <View>
                <Image />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                ></Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/mapache.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />

              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Asesor MAKO</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/domi.png')}
                  style={styles.icono}
                  resizeMode='contain'

                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Domicilios</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/taxi.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Taxis</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/lavadora.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Alquiler de lavadoras</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/cerradura.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Cerrajerias</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/acarreos.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Acarreos</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/asaderos.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Asaderos</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/asaderos.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Asaderos</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/asaderos.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Asaderos</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/asaderos.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Asaderos</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View style={styles.cajaicono}>
                <Image
                  source={require('../../../../../assets/asaderos.png')}
                  style={styles.icono}
                  resizeMode='contain'
                />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                >Asaderos</Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View>
                <Image />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                ></Text>
              </View>
            </Pressable>

            <Pressable style={styles.circulo}>
              <View>
                <Image />
              </View>
              <View style={styles.cajatexto}>
                <Text
                  style={styles.texto}
                ></Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  buscat: {
    width: 700,
    height: ' 10%',
    zIndex: -1000,
    bottom: 75,
    right: 80,
    transform: [{ rotate: '23deg' }],
  },
  scroll: {
    zIndex:10000,
  },
  touch: {
    bottom: 60,
    alignItems: 'start',
    width: 'auto',
    height: 200,
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
  cajaicono: {
    padding: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.secondary
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


export default Header;
