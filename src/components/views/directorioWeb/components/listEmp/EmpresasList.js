import React, { useMemo } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../../../../res/colors';
import EmpresaCard from './EmpresaCard';

const EmpresasList = ({ data = [], loading = false, onPressCard }) => {
  const columnas = useMemo(() => {
    const arr = Array.isArray(data) ? data : [];
    const out = [];
    for (let i = 0; i < arr.length; i += 2) {
      out.push([arr[i], arr[i + 1]].filter(Boolean));
    }
    return out;
  }, [data]);

  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.content}
      >
        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color={colors.secondary} />
          </View>
        )}
        {!loading && columnas.map((pair, idx) => (
          <View key={`col-${idx}`} style={styles.col}>
            <EmpresaCard item={pair[0]} onPress={onPressCard} />
            <EmpresaCard item={pair[1]} onPress={onPressCard} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
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
  content: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  loadingBox: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    width: 280,
    marginRight: 16,
  },
});

export default EmpresasList;

