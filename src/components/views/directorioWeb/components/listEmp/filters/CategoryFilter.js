import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../../../../../res/localStore/Actions';
import BusquedaCategoria from '../BusquedaCategoria';
import styles from './FilterSectionStyles';

export default function CategoryFilter() {
  const dispatch = useDispatch();

  return (
    <View>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>Filtrar por categoría</Text>
        <View style={styles.sectionDivider} />
      </View>
      <BusquedaCategoria
        onSelect={(item) => {
          if (item) {
            dispatch(setSearch({ categoria: item.id, lblCategoria: item.nombreSub2 }));
          } else {
            dispatch(setSearch({ categoria: '', lblCategoria: '' }));
          }
        }}
      />
    </View>
  );
}

