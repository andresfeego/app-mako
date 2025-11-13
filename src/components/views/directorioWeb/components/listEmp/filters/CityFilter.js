import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../../../../../res/localStore/Actions';
import SearchCountry from '../../searchCountry/SearchCountry';
import styles from './FilterSectionStyles';

export default function CityFilter() {
  const dispatch = useDispatch();
  const search = useSelector((s) => s.search);

  const onCiudadSeleccionada = (label, id) => {
    dispatch(setSearch({ ciudad: label, ciudadId: id }));
  };

  return (
    <View>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>Filtrar por ciudad</Text>
        <View style={styles.sectionDivider} />
      </View>
      <View style={{ marginBottom: 16, alignSelf: 'stretch' }}>
        <SearchCountry initialValue={search?.ciudad || ''} onSelect={onCiudadSeleccionada} />
      </View>
    </View>
  );
}

