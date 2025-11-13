import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text, Modal } from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../res/colors';
import { useDispatch, useSelector } from 'react-redux';
import { closeFilterModal, openFilterModal, setSearch } from '../../../../../res/localStore/Actions';
import FilterModal from './FilterModal';
import { getTodasLasEmpresas } from '../../../../../services/mako/helpersGetDB';
import EmpresasList from './EmpresasList';



const ListEmp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [empresaModal, setEmpresaModal] = useState(null);
  const dispatch = useDispatch();
  const isFilterModalVisible = useSelector((state) => state.uiFilter?.filterModalVisible);
  const navigation = useNavigation();

  const toggleModal = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
      setEmpresaModal(null);
    } else {
      setIsModalVisible(true);
    }
  };

  const toggleFilterModal = () => {
    if (isFilterModalVisible) dispatch(closeFilterModal());
    else dispatch(openFilterModal());
  };

  const onChangeBusqueda = (text) => {
    dispatch(setSearch({ busqueda: text }));
  };

  // Fetch empresas (estructura) y cargar lista
  useEffect(() => {
    const ctrl = new AbortController();
    async function load() {
      try {
        setLoading(true);
        // Intenta filtro actual desde store si existe
        const state = undefined; // puedes tomar de Redux si lo tienes mapeado
        const resp = await getTodasLasEmpresas();
        // resp puede ser {status:..., data:...} o arreglo directamente; normalizamos
        const data = Array.isArray(resp) ? resp : (resp?.data || []);
        // eslint-disable-next-line no-console
        console.log('[ListEmp] empresas sample:', data && data.length ? data[0] : resp);
        setEmpresas(data || []);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('[ListEmp] error cargando empresas:', e?.message || e);
        setEmpresas([]);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ctrl.abort();
  }, []);

  // Agrupa en columnas de 2 cards para scroll horizontal
  const handleCardPress = (item) => {
    const tipo = item?.tipo || item?.type || 1;
    if (tipo === 1) {
      navigation.navigate('PerfilUno');
    } else {
      // Perfil 0: mostramos modal con info básica
      setEmpresaModal(item);
      setIsModalVisible(true);
    }
  };

  return (
    <View style={styles.general}>
      <Modal transparent visible={isModalVisible} animationType="fade" onRequestClose={toggleModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Image source={empresaModal?.logoUrl ? { uri: empresaModal.logoUrl } : require('../../../../../assets/mapache.png')} style={styles.logo} resizeMode="contain" />
              <View style={styles.headerTextContainer}>
                <Text style={styles.companyName}>{empresaModal?.nombre || empresaModal?.razonSocial || 'Nombre empresa'}</Text>
                <Text style={styles.location}>{empresaModal?.ciudad || 'Departamento - Municipio'}</Text>
                <Text style={styles.description}>
                  {empresaModal?.descripcion || 'Descripción de la empresa - Descripción de la empresa - Descripción de la empresa.'}
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

      <FilterModal />

      <View style={styles.listaempre}>
        <View style={styles.shadowUp} />
        <Pressable style={styles.filterButton} onPress={toggleFilterModal}>
          <IconFontAwesome5 name="filter" size={24} color={colors.white} />
        </Pressable>
      </View>

      <EmpresasList data={empresas} loading={loading} onPressCard={handleCardPress} />
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
    borderColor: colors.gray6,
    borderWidth: 1,
  },
  // styles for old placeholders removed; card styles moved to EmpresaCard
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
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 10,
  },
  sectionRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    color: colors.secondary,
    fontSize: 14,
    marginRight: 8,
    marginBottom: 16,
    fontFamily: 'CaviarDreams_Bold',
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray7,
    marginLeft: 8,
  },
  filterInput: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#111',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  keywordCheck: {
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  selectedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  selectedText: {
    color: '#111',
    flex: 1,
  },
  selectedClose: {
    marginLeft: 8,
  },
  closeFilter: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 11,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 12,
    padding: 6,
    backgroundColor: '#fff',
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
  catContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  catChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f1f1f1',
    marginRight: 6,
    marginBottom: 6,
  },
  catChipActive: {
    backgroundColor: colors.secondary,
  },
  catChipText: {
    color: '#333',
    fontSize: 12,
  },
  catChipTextActive: {
    color: '#fff',
  },
  filterCta: {
    alignSelf: 'stretch',
    backgroundColor: colors.secondary,
    borderRadius: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  filterCtaText: {
    color: colors.white,
    textAlign: 'center',
    padding: 16,
    fontFamily: 'CaviarDreams_Bold',
  },
});

export default ListEmp;
