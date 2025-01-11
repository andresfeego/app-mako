import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../res/colors';
import MenuHeader from '../MenuHeader/MenuHeader';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
          <MenuHeader />
      <View style={styles.headerimage}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../../../../assets/logomako.png')}
            style={styles.icon}
          />
        </Pressable>
      </View>

      <View style={styles.headersearch}>
        <TextInput
          placeholder="Que buscas ?"
          outlineStyle={styles.textInput}
          mode={'outlined'}
        />
        <TextInput
          placeholder="En que ciudad lo buscas ?"
          outlineStyle={styles.textInput}
          mode={'outlined'}
        />
      </View>

      <View style={styles.icons}>
        <Pressable style={styles.searchicon} onPress={() => navigation.goBack()}>
          <Icon size={33} name="search" color="black" />
        </Pressable>
       {/*  <Pressable style={styles.user} onPress={() => navigation.navigate("")}>
          <Icon1 size={33} name="user" color="black" />
        </Pressable> */}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    zIndex: 20,
    width: '100%',
    height: '9%',
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  headerimage: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 70,
    height: 70,
  },
  headersearch: {
    flex: 1,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  textInput: {
    marginBottom: 12,
    marginTop: 12,
    top: '5%',
    borderRadius: 40,
    marginVertical: 8,
  },
  icons: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  searchicon: {
    marginTop: 0,
  },
  user: {
    marginTop: 0,
  },
});

export default Header;

