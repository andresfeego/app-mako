import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './header/Header';

const Home = () => {
  return (
    <ScrollView >
      <View style={styles.container}>
        <Header />
      </View >
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',

  },
});

export default Home;
