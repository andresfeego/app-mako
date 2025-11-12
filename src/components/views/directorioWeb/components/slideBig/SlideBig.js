import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import colors from '../../../../../res/colors';

class SlideBig extends Component {
  state = {
    slides: [
      {
        image: require('../../../../../assets/vet.jpg'),
        title: 'Tienes una emergencia             \nveterinaria?',
        subtitle: 'Veterinaria',
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/alt.jpg'),
        title: 'Ocasion especial? Nosotros te \ndecoramos el lugar.',
        subtitle: 'Eventos',
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/cocinero.jpg'),
        title: 'Almuerzo ejecutivo, encuentra \naquí nuestro menú \ndiario.',
        subtitle: 'Asaderos',
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/carne.jpg'),
        title: 'Se te antoja un buen asado de\ncarne.',
        subtitle: 'Asaderos',
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/bar.jpg'),
        title: 'Buscas algo de diversión en tu\nciudad?',
        subtitle: 'Bares',
        iconImage: require('../../../../../assets/logomako.png'),
      },
      {
        image: require('../../../../../assets/postre.jpg'),
        title: 'Necesitas un pastel para\ncelebrar una ocasión especial.',
        subtitle: 'Pastelería',
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
      <Image source={item.image} style={styles.carouselImage} resizeMode="cover" />
      <View style={styles.overlay}>
        <View style={styles.gradient} />
        <Text style={styles.overlayText}>{item.title}</Text>
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
          <Text style={styles.subtitleText}>{item.subtitle}</Text>
          <Image source={item.iconImage} style={styles.overlayIcon} resizeMode="contain" />
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
            autoplay
            loop
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
    transform: [{ rotate: '20deg' }],
    height: 500,
    width: 660,
    left: -140,
    top: -90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    overflow: 'hidden',
  },
  headerslide: {
    top: 30,
    left: 180,
    transform: [{ rotate: '-20deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    overflow: 'hidden',
  },
  carouselItem: {
    top: -5,
    height: 500,
    width: 500,
    justifyContent: 'center',
    alignItems: 'center',
    left: -70,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
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
    fontSize: 24,
    left: -16,
    top: 10,
    paddingHorizontal: 5,
    marginBottom: -20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    fontFamily: 'CaviarDreams_Bold',
  },
  subtitleText: {
    fontFamily: 'CaviarDreams_Bold',
    color: colors.black,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    height: 24,
    borderRadius: 16,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 10,
    top: 10,
    right: 150,
  },
  overlayIconContainer: {
    marginTop: 40,
  },
  overlayIcon: {
    left: 130,
    top: 120,
    width: 110,
    height: 110,
  },
});

export default SlideBig;
