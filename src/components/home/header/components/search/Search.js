import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { List, Searchbar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import colors from '../../../../../res/colors';

class Header extends Component {


  render() {
    return (
        <View style={styles.header}>

          <View style={styles.headerimage}>
            <Image
              source={require('../../../../../assets/logomako.png')}
              style={styles.icon}
            />
          </View>


          <View style={styles.headersearch}>
            <TextInput
              placeholder="Que buscas ?"
              outlineStyle={styles.text1}
              mode={'outlined'}
            />
            <TextInput
              placeholder="En que ciudad lo buscas ?"
              outlineStyle={styles.text2}
              mode={'outlined'}
            />
          </View>


          <View style={styles.icons}>
            <Pressable style={styles.searchicon} onPress={() => this.props.navigation.goBack()}>
              <Icon size={33} name='search' color={'black'}></Icon>
            </Pressable>
            <Pressable style={styles.user} onPress={() => this.props.navigation.goBack()}>
              <Icon1 size={33} name='user' color={'black'}></Icon1>
            </Pressable>
          </View>

        </View>

    );
  }
}


const styles = StyleSheet.create({

  header: {
    zIndex: 20,
    width: '100%',
    height: '10%',
    padding: 3,
    flexDirection: 'row',
    alignItems: 'start',
    backgroundColor: colors.primary
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
    width: '60%',
    justifyContent: 'center',
    alignItems: 'start',
  },
  text1: {
    borderRadius: 30,
    margin: 6
  },
  text2: {
    borderRadius: 30,
    margin: 6
  },
  icons: {
    width: '20%',
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'center',
  },
  searchicon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
  },
  user: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
  },
});


export default Header;
