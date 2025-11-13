import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../../../res/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { closeFilterModal, setListaMunicipios } from '../../../../../res/localStore/Actions';
import { getListaMunicipios } from '../../../../../services/mako/helpersGetDB';
import KeywordFilter from './filters/KeywordFilter';
import CityFilter from './filters/CityFilter';
import CategoryFilter from './filters/CategoryFilter';

export default function FilterModal() {
  const dispatch = useDispatch();
  const isFilterModalVisible = useSelector((state) => state.uiFilter?.filterModalVisible);
  const listaMunicipios = useSelector((state) => state.catalog?.listaMunicipios || []);

  useEffect(() => {
    if (isFilterModalVisible && listaMunicipios.length === 0) {
      getListaMunicipios()
        .then((data) => {
          if (Array.isArray(data)) dispatch(setListaMunicipios(data));
        })
        .catch(() => {});
    }
  }, [isFilterModalVisible, listaMunicipios.length, dispatch]);

  const toggleFilterModal = () => {
    dispatch(closeFilterModal());
  };

  return (
    <Modal transparent visible={!!isFilterModalVisible} animationType="fade" onRequestClose={toggleFilterModal}>
      <View style={styles.modalBackground}>
        <View style={styles.filterCard}>
          <Pressable onPress={toggleFilterModal} style={styles.closeFilter} hitSlop={8}>
            <Icon name="close" size={18} color={colors.secondary} />
          </Pressable>

          <KeywordFilter />
          <CityFilter />
          <CategoryFilter />

          <Pressable style={styles.filterCta} onPress={toggleFilterModal}>
            <Text style={styles.filterCtaText}>Filtrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterCard: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 24,
    paddingTop: 52,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 10,
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
