import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import DirectorioWeb from '../views/directorioWeb/DirectorioWeb';
import GeneralMenu from '../views/directorioWeb/components/generalMenu/GeneralMenu';
import { type } from '../generalComponent/BotonMenu';
import MiDirectorio from '../views/miDirectorio/MiDirectorio';
import MenuHeader from '../views/directorioWeb/components/menuHeader/MenuHeader';
import LoginOptions from '../generalComponent/login/LoginOptions';
import Usuario from '../views/usuarios/Usuario';
import FusionMenuSvg from '../views/directorioWeb/components/generalMenu/FusionMenuSvg';

const buttons = [
  {
    nombre: 'Mi directorio',
    icon: 'favorite-outline',
    idMenu: 1,
    type: type.MaterialIcons,
    idInterface: 1,
  },
  {
    nombre: 'Directorio',
    icon: 'home-outline',
    idMenu: 2,
    type: type.Ionicons,
    idInterface: 2,
  },
  {
    nombre: 'Usuario',
    icon: 'menu',
    idMenu: 3,
    type: type.Feather,
    idInterface: 3,
  },
];

const MENU_HEIGHT = 64;

const GeneralContainer = () => {
  const [activeView, setActiveView] = useState(2);
  const [showLogin, setShowLogin] = useState(false);

  const renderContenido = () => {
    switch (activeView) {
      case 1:
        return <MiDirectorio />;
      case 2:
        return <DirectorioWeb />;
      case 3:
        return <Usuario />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}> 
      <View style={styles.content}>{renderContenido()}</View>

      <View
        style={[
          styles.menu,
          {
            height: MENU_HEIGHT + (Platform.OS === 'ios' ? 26 : 0),
            paddingBottom: Platform.OS === 'ios' ? 26 : 0,
          },
        ]}
      >
        <FusionMenuSvg activeButtons={buttons} onChangeTab={setActiveView} />
      </View>

      {showLogin && (
        <View style={[StyleSheet.absoluteFillObject, styles.loginOverlay]}>
          <LoginOptions
            onMakoPress={() => {}}
            onLoginSuccess={() => setShowLogin(false)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: MENU_HEIGHT,
  },
  loginOverlay: {
    backgroundColor: 'transparent',
  },
  blankView: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default GeneralContainer;
