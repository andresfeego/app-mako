import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../res/colors';
import MenuHeader from '../menuHeader/MenuHeader';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Search = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerimage}>
        <Image source={require('../../../../../assets/logo_Mako_Directorio_Comercial_Colombia_512x512-2.webp')} style={styles.icon} />
      </View>
      <View style={styles.headersearch}>
        <TextInput
          placeholder="Que buscas ?                             "
          mode="outlined"
          dense
          style={styles.textInput}
          outlineStyle={styles.textInputOutline}
          contentStyle={styles.textInputContent}
        />
        
      </View>
      <View style={styles.icons}>
        <Pressable style={styles.searchicon} onPress={() => navigation.goBack()}>
          <Icon size={38} name="search" color="black" />
        </Pressable>
        <Pressable style={styles.searchicon} onPress={() => navigation.goBack()}>
          <IconAwe size={38} name="user" color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 20,
    width: '100%',
    height: '72px',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  headerimage: {
    width: '40px',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  headersearch: {
    flex: 1,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  textInput: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    height: 32,
    backgroundColor: '#FFFFFF',
  },
  textInputOutline: {
    borderRadius: 20,
    borderWidth: 0,
  },
  textInputContent: {
    height: 32,
    paddingVertical: 0,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  searchicon: {
    marginTop: 0,
    height: '100%',
    padding: 10,
  },
});

export default Search;
