import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../../../res/colors';

const EmpresaCard = ({ item, onPress }) => {
  if (!item) return null;

  const nombre = item?.nombre || item?.razonSocial || 'Altezza Eventos';
  const slogan = item?.slogan || 'Eventos inolvidables';
  const descripcion = item?.descripcion || 'Decoración para bodas, 15 años temáticos, fiestas infantiles, sonido e iluminación.';
  const logo = item?.logoUrl ? { uri: item.logoUrl } : require('../../../../../assets/mapache.png');

  return (
    <Pressable style={styles.card} onPress={() => onPress && onPress(item)}>
      <View style={styles.cardLeft}>
        <Image source={logo} style={styles.cardLogo} resizeMode="cover" />
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.cardTitle} numberOfLines={1}>{nombre}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>{slogan}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{descripcion}</Text>
        <View style={styles.cardMetaRow}>
          <View style={styles.metaItem}>
            <IconFontAwesome5 name="star" size={14} color={colors.warn} />
            <Text style={styles.metaText}>5.0</Text>
          </View>
          <View style={styles.metaItem}>
            <IconFontAwesome5 name="comment-alt" size={14} color={colors.gray3} />
            <Text style={styles.metaText}>25</Text>
          </View>
          <View style={styles.metaItem}>
            <IconFontAwesome5 name="bookmark" size={14} color={colors.gray3} />
            <Text style={styles.metaText}>2</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLeft: {
    marginRight: 12,
  },
  cardLogo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#000',
  },
  cardRight: {
    flex: 1,
  },
  cardTitle: {
    color: colors.secondary,
    fontFamily: 'CaviarDreams_Bold',
    fontSize: 16,
    marginBottom: 2,
  },
  cardSubtitle: {
    color: colors.gray2,
    fontSize: 13,
    marginBottom: 4,
  },
  cardDesc: {
    color: colors.gray1,
    fontSize: 12,
  },
  cardMetaRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    marginLeft: 6,
    color: colors.gray2,
    fontSize: 12,
  },
});

export default EmpresaCard;

