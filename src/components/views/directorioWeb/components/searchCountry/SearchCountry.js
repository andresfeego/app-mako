import React from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../res/colors';
import MenuHeader from '../menuHeader/MenuHeader';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const SearchCountry = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.searchcountry} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Sogamoso - Boyacá</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLight,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textDecorationLine: 'underline',
    fontFamily: 'CaviarDreams_Bold',
  }
  
});

export default SearchCountry;
