import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable, Text, Modal } from 'react-native';
import colors from '../../../../res/colors';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const ListEmp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.general}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Image
                source={require('../../../../assets/mapache.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <View style={styles.headerTextContainer}>
                <Text style={styles.companyName}>Nombre empresa</Text>
                <Text style={styles.location}>Departamento - Municipio</Text>
                <Text style={styles.description}>
                  Descripción de la empresa - Descripción de la empresa - Descripción de la empresa.
                </Text>
              </View>
              <Pressable onPress={toggleModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>
            </View>

            <View style={styles.contactInfo}>
              {[
                { icon: 'store-alt', text: 'Restaurante y Comidas Rápidas' },
                { icon: 'globe-americas', text: 'Sogamoso' },
                { icon: 'map-marker-alt', text: 'Av norte # 35 - 64 - Mesopotamia' },
                { icon: 'phone-alt', text: '3044254590' },
                { icon: 'envelope', text: 'Joselui.28@hotmail.com' },
                { icon: 'clock', text: 'Lunes a viernes: 8:00 am a 12:00 m / 2:00 pm a 6:30 pm' },
                { icon: 'clock', text: 'Sábados: 9:00 am a 2:00 pm' },
              ].map((item, index) => (
                <View key={index} style={styles.contactRow}>
                  <View style={styles.iconContainer}>
                    <IconFontAwesome5 name={item.icon} size={20} color={colors.white} />
                  </View>
                  <Text style={styles.infoText}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.listaempre}>
        <ScrollView
          style={styles.scroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.touch}></View>
        </ScrollView>
      </View>

      <View style={styles.list}>
        <Pressable style={styles.circulo} onPress={toggleModal}>
          <Image
            source={require('../../../../assets/mapache.png')}
            style={[styles.icon, { tintColor: 'black' }]}
            resizeMode="contain"
          />
          <Text style={styles.texto}>Favoritos</Text>
        </Pressable>

        <Pressable style={styles.circulo} onPress={() => navigation.navigate('PerfilUno')}>
          <Image
            source={require('../../../../assets/lavadora.png')}
            style={[styles.icon, { tintColor: 'black' }]}
            resizeMode="contain"
          />
          <Text style={styles.texto}>PerfilUno</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  general: {
    height: 'auto',
    zIndex: 1,
  },
  listaempre: {
    bottom: 80,
    left: -178,
    width: 800,
    height: 800,
    alignItems: 'center',
    justifyContent: 'flex-start',
    transform: [{ rotate: '30deg' }],
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
    padding: 20,
    position: 'relative',
  },
  list: {
    left: 10,
    top: -20,
    position: 'absolute',
    width: '100%',
    height: 500,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  circulo: {
    width: 85,
    height: 85,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 42.5,
    borderWidth: 2,
    borderColor: colors.secondary,
    backgroundColor: 'white',
  },
  texto: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#f1c40f',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    borderWidth: 2,  
    borderColor: 'white',
    backgroundColor: 'black', 
    padding: 25,
  },
  headerTextContainer: {
    flex: 1,
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  location: {
    fontSize: 14,
    color: 'gray',
  },
  description: {
    fontSize: 12,
    color: 'black',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  contactInfo: {
    padding: 15,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'black',
  },
});

export default ListEmp;
