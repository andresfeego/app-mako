import React, { Component } from 'react';
import { View, StyleSheet, Image} from 'react-native';
import colors from '../../../../../res/colors';


class SlideBig extends Component {


  render() {
    return (

      <View style={styles.headerslide}>
        <Image
          source={require('../../../../../assets/logomako.png')}
          style={styles.image}
        />
      </View>

    );
  }
}


const styles = StyleSheet.create({

  headerslide: {
    zIndex: -100,
    transform: [{ rotate: '23deg' }],
    height: 400,
    width: 600,
    left: -90,
    bottom: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
  image: {
    bottom: -150,
    right: -245,
    transform: [{ rotate: '-23deg' }],
    width: 70,
    height: 70,
  },
});


export default SlideBig;
