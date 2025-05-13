import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import colors from '../../../res/colors';
import Search from './components/search/Search';
import SlideBig from './components/slideBig/SlideBig';
import SlideCat from './components/slideCat/SlideCat';
import ListEmp from './components/listEmp/ListEmp';

class DirectorioWeb extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Search style={styles.header} />
        <View style={styles.contcateg}>
          <SlideBig />
          <SlideCat />
          <ListEmp />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  container: {
   position:"relative"
  },
  header: {
    width: '100%',
    height: '20%',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
  },
  contcateg: {
    flex: 1,
    width: 460,
   position:"relative"

  },
});

export default DirectorioWeb;
