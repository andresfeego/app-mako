import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable, Text, Modal } from 'react-native';
import { TextInput } from 'react-native-paper';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../res/colors';

const ListEmp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  return (
    <View style={styles.general}>
      <Modal transparent visible={isModalVisible} animationType="fade" onRequestClose={toggleModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Image source={require('../../../../../assets/mapache.png')} style={styles.logo} resizeMode="contain" />
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

      <Modal transparent visible={isFilterModalVisible} animationType="fade" onRequestClose={toggleFilterModal}>
        <View style={styles.modalBackground}>
          <View style={styles.filterCard}>
            <Pressable onPress={toggleFilterModal} style={styles.closeFilter}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
            <TextInput
              placeholder="¿Qué buscas?"
              outlineStyle={styles.textInput}
              mode="outlined"
              style={{ width: '100%', marginBottom: 20 }}
            />
            <TextInput
              placeholder="Filtrar por ciudad"
              outlineStyle={styles.textInput}
              mode="outlined"
              style={{ width: '100%', marginBottom: 20 }}
            />
            <Pressable style={styles.searchiconModal}>
              <IconFontAwesome5 name="search" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.listaempre}>
        <View style={styles.shadowUp} />
        <Pressable style={styles.filterButton} onPress={toggleFilterModal}>
          <IconFontAwesome5 name="filter" size={24} color={colors.white} />
        </Pressable>
        <ScrollView
          style={styles.scroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 300 }}
        >
          <View style={styles.touch} />
        </ScrollView>
      </View>

      <View style={styles.list}>
        <Pressable style={styles.circulo} onPress={toggleModal}>
          <Image source={require('../../../../../assets/mapache.png')} style={[styles.icon, { tintColor: 'black' }]} resizeMode="contain" />
          <Text style={styles.texto}>Favoritos</Text>
        </Pressable>
        <Pressable style={styles.circulo} onPress={() => navigation.navigate('PerfilUno')}>
          <Image source={require('../../../../../assets/lavadora.png')} style={[styles.icon, { tintColor: 'black' }]} resizeMode="contain" />
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
    width: '100%'
  },
  listaempre: {
    backgroundColor: colors.grisFondo,
    top: 20,
    right: 50,
    width: 800,
    height: 300,
    alignItems: 'center',
    justifyContent: 'flex-start',
    transform: [{ rotate: '20deg' }],
    borderRadius: 100,
    padding: 20,
  },
  shadowUp: {
    position: 'absolute',
    top: -8,
    left: -4,
    right: 0,
    height: '100%',
    width: '100%',
    borderRadius: 100,
    zIndex: -1000000,
    elevation: 4
  },
  list: {
    backgroundColor: colors.grisFondo,
    left: 0,
    top: 50,
    position: 'absolute',
    width: '98%',
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
  scroll: {},
  touch: {},
  icon: {
    width: 40,
    height: 40,
  },
  filterButton: {
    position: 'absolute',
    top: 40,
    left: 60,
    elevation: 1,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gray7,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-20deg' }],
  },
  filterCard: {
    width: 320,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  closeFilter: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 11,
  },
  textInput: {
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    borderColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  searchiconModal: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
});

export default ListEmp;
