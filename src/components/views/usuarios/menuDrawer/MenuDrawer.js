import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ButtomFloating from '../../../../components/generalComponent/ButtomFloating';
import colors from '../../../../res/colors';

const itemsMenu = [
  {
    id: '1',
    nombre: 'Mi cuenta',
    icon: 'user',
    action: () => console.log('Mi cuenta'),
  },
  {
    id: '2',
    nombre: 'Registrar comercio',
    icon: 'plus-circle',
    action: () => console.log('Registrar comercio'),
  },
  {
    id: '3',
    nombre: 'Mis favoritos',
    icon: 'heart',
    action: () => console.log('Mis favoritos'),
  },
  {
    id: '4',
    nombre: 'Mis registros',
    icon: 'file-text',
    action: () => console.log('Mis registros'),
  },
  {
    id: '5',
    nombre: 'Mis comisiones',
    icon: 'dollar-sign',
    action: () => console.log('Mis comisiones'),
  },
  {
    id: '6',
    nombre: 'Mi comercio',
    icon: 'shopping-bag',
    action: () => console.log('Mi comercio'),
  },
];

const MenuDrawer = () => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Image
        source={require('../../../../assets/usuario.jpg')}
        style={styles.userPhoto}
      />
      <Text style={styles.userName}>Julian Ricardo Camargo Manrique</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={item.action}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={28} color={colors.secondary} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{item.nombre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={itemsMenu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 130 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.yellow,
    paddingVertical: 20,
    borderRadius: 16,
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
  backgroundColor: '#fff',
  padding: 12,
  flexDirection: 'row',
  alignItems: 'center',
  borderTopWidth: 1,
  borderTopColor: colors.ligthGray, 
},

  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default MenuDrawer;
