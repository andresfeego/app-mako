import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DirectorioWeb from '../views/directorioWeb/DirectorioWeb';
import GeneralMenu from '../views/directorioWeb/components/generalMenu/GeneralMenu';
import { type } from '../generalComponent/BotonMenu';
import MiDirectorio from '../views/miDirectorio/MiDirectorio';
import MenuHeader from '../views/directorioWeb/components/menuHeader/MenuHeader';
import LoginOptions from '../generalComponent/login/LoginOptions';
import Usuario from '../views/usuarios/Usuario';

const buttons = [
  {
    nombre: 'Mi directorio',
    icon: 'telephone',
    idMenu: 1,
    type: type.Foundation,
    idInterface: 1,
  },
  {
    nombre: 'Directorio',
    icon: 'phone-portrait-outline',
    idMenu: 2,
    type: type.Ionicons,
    idInterface: 2,
  },
  {
    nombre: 'Usuario',
    icon: 'user',
    idMenu: 3,
    type: type.Feather,
    idInterface: 3,
  },
];

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
      {renderContenido()}
      <GeneralMenu activeButtons={buttons} onChangeTab={setActiveView} />
      
      {showLogin && (
        <View style={StyleSheet.absoluteFillObject}>
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
  blankView: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default GeneralContainer;
