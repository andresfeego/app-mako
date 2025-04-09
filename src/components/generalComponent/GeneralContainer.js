import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DirectorioWeb from '../directorioWeb/DirectorioWeb';
import GeneralMenu from '../directorioWeb/components/generalMenu/GeneralMenu';
import { type } from '../generalComponent/BotonMenu';


const buttons = [

  {
    nombre: "Boton 1",
    icon: 'weather-lightning-rainy',
    idMenu: 1,
    type: type.MaterialCommunityIcons,
    idInterface: 2

  },
  {
    nombre: "Boton 2",
    icon: 'tasks',
    idMenu: 2,
    type: type.FontAwesome5,
    idInterface: 3

  },
  {
    nombre: "Boton 3",
    icon: 'DirectorioWeb',
    idMenu: 3,
    type: type.AntDesign,
    idInterface: 4

  },
  {
    nombre: "Boton 3",
    icon: 'alert-triangle',
    idMenu: 4,
    type: type.Feather,
    idInterface: 5

  },
  {
    nombre: "Boton 3",
    icon: 'notification',
    idMenu: 5,
    type: type.AntDesign,
    idInterface: 6

  }
]
 



const GeneralContainer = () => {
  return (
      <View style={styles.container}>
        <DirectorioWeb />
        <GeneralMenu activeButtons={buttons}/>  
      </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',

  },
});

export default GeneralContainer;

