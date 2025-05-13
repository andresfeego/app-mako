import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../res/colors';
import MenuHeader from '../menuHeader/MenuHeader';

const Search = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerimage}>
        <Image source={require('../../../../../assets/logomako.png')} style={styles.icon} />
      </View>
      <View style={styles.headersearch}>
        <TextInput
          placeholder="Que buscas ?                             "
          outlineStyle={styles.textInput}
          mode="outlined"
        />
        
      </View>
      <View style={styles.icons}>
        <Pressable style={styles.searchicon} onPress={() => navigation.goBack()}>
          <Icon size={33} name="search" color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 20,
    width: '100%',
    height: '7%',
    padding: -40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  headerimage: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 70,
    height: 70,
  },
  headersearch: {
    flex: 1,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'baseline',
    marginEnd: -100
  },
  textInput: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    borderColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icons: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  searchicon: {
    marginTop: 0,
  },
});

export default Search;
