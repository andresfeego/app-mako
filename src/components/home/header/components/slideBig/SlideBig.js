import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import colors from '../../../../../res/colors';

class SlideBig extends Component {
  state = {
    slides: [
      {
        image: require('../../../../../assets/vet.jpg'),
        text: "Tienes una emergencia \nveterinaria?",
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/alt.jpg'),
        text: "Ocasion especial? Nosotros te \ndecoramos el lugar.",
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/cocinero.jpg'),
        text: "Almuerzo ejecutivo,encuentra \naquí nuestro menú \ndiario.",
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/carne.jpg'),
        text: "Se te antoja un buen asado de\ncarne.",
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/bar.jpg'),
        text: "Buscas algo de diversión en tu\nciudad?",
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/postre.jpg'),
        text: "Necesitas un pastel para celebrar\nuna ocasión especial.",
        iconImage: require('../../../../../assets/logomako.png'),
      },
    ],
    iconAnimation: new Animated.Value(0),
  };

  componentDidMount() {
    this.startIconAnimation(); 
  }

  
  startIconAnimation = () => {
    this.state.iconAnimation.setValue(0);
    Animated.timing(this.state.iconAnimation, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  
  renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      
      <Image
        source={item.image}
        style={styles.carouselImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.gradient} />
        <Text style={styles.overlayText}>{item.text}</Text>
        <Animated.View
          style={[
            styles.overlayIconContainer,
            {
              opacity: this.state.iconAnimation,
              transform: [
                {
                  translateY: this.state.iconAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0], 
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={item.iconImage}
            style={styles.overlayIcon}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.headerslide1}>
        <View style={styles.headerslide}>
          <Carousel
            data={this.state.slides}
            renderItem={this.renderCarouselItem}
            sliderWidth={800}
            itemWidth={600}
            autoplay={true}
            loop={true}
            onSnapToItem={this.startIconAnimation} 
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerslide1: {
    zIndex: -100,
    transform: [{ rotate: '30deg' }],
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
    overflow: 'hidden',
  },
  headerslide: {
    top: 40,
    left: 150,
    right: 20,
    transform: [{ rotate: '-30deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    overflow: 'hidden',
  },
  carouselItem: {
    top: -5,
    height: 450,
    width: 450,
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  overlayText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    right: 80,
    top: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
    textShadowColor: '#000', 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 6,
  },
  overlayIconContainer: {
    marginTop: 10,
  },
  overlayIcon: {
    left: 95,
    top: 90,
    width: 80,
    height: 80,
  },
});

export default SlideBig;
