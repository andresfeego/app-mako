import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../../res/colors';
import Search from './components/search/Search';
import SlideBig from './components/slideBig/SlideBig';
import SlideCat from './components/slideCat/SlideCat';
import ListEmp from './components/listEmp/ListEmp';


class Header extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Search style={styles.header} />
        <View style={styles.contcateg}>
          <SlideBig />
          <SlideCat />
          <ListEmp/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '20%',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'start',
    backgroundColor: colors.primary,
  },
  contcateg: {
    flex: 1,
    width: 460,
  },
});


export default Header;
