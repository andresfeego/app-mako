import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../../res/colors';
import BotonMenu, { type } from '../../../generalComponent/BotonMenu';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const offSetHorizontal = windowWidth * 0.83;

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abierto: false,
      menuAbierto: new Animated.Value(-1 * offSetHorizontal),
      fondoOpacity: new Animated.Value(0),
      verFondo: 'none'
    };
  }

  abirMenu() {
    this.setState({
      abierto: true,
      verFondo: 'flex'
    })

    Animated.timing(
      this.state.menuAbierto,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }
    ).start();

    Animated.timing(
      this.state.fondoOpacity,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }
    ).start();
  }

  cerrarMenu() {
    this.setState({
      abierto: false
    })

    Animated.timing(
      this.state.menuAbierto,
      {
        toValue: (-1 * offSetHorizontal),
        duration: 300,
        useNativeDriver: false
      }
    ).start();

    Animated.timing(
      this.state.fondoOpacity,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }
    ).start();

    setTimeout(() => {
      this.setState({
        verFondo: 'none'
      })
    }, 500);
  }

  render() {

    let { menuAbierto, fondoOpacity, verFondo } = this.state;


    return (
      [
        <Pressable key='menupress' style={styles.menu} onPress={() => this.abirMenu()}>
          <Icon name="person" size={30} color={colors.black} />
        </Pressable>,

        <Animated.View key='menucontainer' style={[styles.menuContainer, { left: menuAbierto }]}>

          <Pressable style={styles.menuClose} onPress={() => this.cerrarMenu()} >
            <Icon name="close" size={30} color={colors.white} />
          </Pressable>

          <View style={styles.header}>
            <Pressable style={styles.button} onPress={() => console.log("Iniciar sesión")}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => console.log("Registrarse")}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </Pressable>
          </View>

          <View style={styles.listaMenu}>

            <BotonMenu color="black" type={type.FontAwesome} icon='user' label={'  Mi cuenta'} goTo={'ViewDependencias'} labelStyle={{ color: colors.gray1, fontSize: 18, fontWeight: 'bold' }}></BotonMenu>
            <BotonMenu color="black" type={type.AntDesign} icon='pluscircleo' label={'Registrar comercio'} goTo={'ViewOrganismos'} labelStyle={{ color: colors.gray1, fontSize: 18, fontWeight: 'bold' }}></BotonMenu>
            <BotonMenu color="black" type={type.AntDesign} icon='hearto' label={'Mis favoritos'} goTo={'ViewAuditores'} labelStyle={{ color: colors.gray1, fontSize: 18, fontWeight: 'bold' }}></BotonMenu>
            <BotonMenu color="black" type={type.MaterialIcons} icon='app-registration' label={'Mis registros'} goTo={'ViewReportantes'} labelStyle={{ color: colors.gray1, fontSize: 18, fontWeight: 'bold' }}></BotonMenu>
            <BotonMenu color="black" type={type.MaterialIcons} icon='attach-money' label={'Mis comisiones'} goTo={'ViewManualesFunciones'} labelStyle={{ color: colors.gray1, fontSize: 18, fontWeight: 'bold' }}></BotonMenu>
            <BotonMenu color="black" type={type.AntDesign} icon='isv' label={'Mi comercio'} goTo={'ViewManualesObligaciones'} labelStyle={{ color: colors.gray1, fontSize: 18, fontWeight: 'bold' }}></BotonMenu>

          </View>

        </Animated.View>,

        <Animated.View key='fondoMenu' style={[styles.fondoMenu, { display: verFondo, opacity: fondoOpacity }]} onPress={() => this.cerrarMenu()} >
          <Pressable style={[styles.fondoMenu, { backgroundColor: 'none' }]} onPress={() => this.cerrarMenu()} />
        </Animated.View>
      ]
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    alignSelf: 'flex-start',
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  menuContainer: {
    width: offSetHorizontal,
    height: windowHeight,
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    display: 'flex'
  },
  menuClose: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: '16%',
    backgroundColor: colors.gray5,
    alignItems: 'center',
    paddingTop: 25
  },
  fondoMenu: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.85)',
    top: 0,
    left: 0,
  },
  button: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  buttonText: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    color: colors.gray0,
    borderRadius: 40,
    paddingLeft: 19,
    paddingRight: 19,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  botonMenu: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  textMenu: {
    color: 'black', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  listaMenu: {
    width: '100%',
  },
  iconMenu: {
    paddingHorizontal: 20
  },
})


export default MenuHeader;
