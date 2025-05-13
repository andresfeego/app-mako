import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ButtomFloating from '../../../components/generalComponent/ButtomFloating';
import LoginOptions from '../../generalComponent/login/LoginOptions';
import colors from '../../../res/colors';
import { AuthContext } from '../../../context/AuthContext';

const comercios = [
  {
    id: '1',
    nombre: 'Restaurante El Sabor',
    telefono: '3101234567',
    ciudad: 'Bogotá',
    logo: require('../../../assets/logomako.png'),
  },
  {
    id: '2',
    nombre: 'Lavandería CleanFast',
    telefono: '3179876543',
    ciudad: 'Medellín',
    logo: require('../../../assets/logomako.png'),
  },
  {
    id: '3',
    nombre: 'Barbería Don Juan',
    telefono: '3015678901',
    ciudad: 'Cali',
    logo: require('../../../assets/logomako.png'),
  },
  {
    id: '4',
    nombre: 'Panadería PanDelicioso',
    telefono: '3123456789',
    ciudad: 'Bucaramanga',
    logo: require('../../../assets/logomako.png'),
  },
  {
    id: '5',
    nombre: 'Papelería Escolar',
    telefono: '3209876543',
    ciudad: 'Barranquilla',
    logo: require('../../../assets/logomako.png'),
  },
];

const MiDirectorio = () => {
  const { logueado, setLogueado } = useContext(AuthContext);

  const llamar = (telefono) => {
    Linking.openURL(`tel:${telefono}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => llamar(item.telefono)}>
      <Image source={item.logo} style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.ciudad}>{item.ciudad}</Text>
      </View>
      <View style={styles.telefonoContainer}>
        <Icon name="phone" size={18} color={colors.primary} />
        <Text style={styles.telefono}>{item.telefono}</Text>
      </View>
    </TouchableOpacity>
  );

  if (!logueado) {
    return (
      <View style={styles.container}>
        <LoginOptions onLoginSuccess={() => setLogueado(true)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comercios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 130 }}
      />
      <ButtomFloating />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  ciudad: {
    fontSize: 14,
    color: '#777',
  },
  telefonoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  telefono: {
    fontSize: 15,
    marginLeft: 6,
    color: colors.primary,
    fontWeight: '500',
  },
});

export default MiDirectorio;
