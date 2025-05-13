import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Animated } from 'react-native';
import colors from '../../../../../res/colors';
import BotonMenu, { type } from '../../../../generalComponent/BotonMenu';
import { connect } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

class GeneralMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButtons: this.props.activeButtons,
      selectedButton: Math.ceil(this.props.activeButtons.length / 2),
      buttonsLength: this.props.activeButtons.length,
      offSetLeftBar: new Animated.Value(0),
      offSetCenterBar: new Animated.Value(0),
      offSetRightBar: new Animated.Value(0),
      borderRadius: new Animated.Value(50),
      bottomIcon: new Animated.Value(20),
      elevationCenter: new Animated.Value(6)
    };
  }

  componentDidMount() {
    if (!this.state.buttonsLength || this.state.buttonsLength === 0) return;
  
    this.setState({
      offSetLeftBar: new Animated.Value(this.calcularPositionLeft(-28)),
      offSetCenterBar: new Animated.Value(this.calcularPositionCenter(0)),
      offSetRightBar: new Animated.Value(this.calcularPositionRight(-26)),
    });
  }
  

  calcularPositionLeft(offSet) {
    return (((windowWidth - 20) / this.state.buttonsLength) / 2) +
      (((windowWidth - 20) / this.state.buttonsLength) * (this.state.selectedButton - 1)) +
      10 + offSet;
  }

  calcularPositionCenter(offSet) {
    return (((windowWidth - 20) / this.state.buttonsLength) / 2) +
      (((windowWidth - 20) / this.state.buttonsLength) * (this.state.selectedButton - 1)) -
      14 + offSet;
  }

  calcularPositionRight(offSet) {
    return windowWidth -
      (((windowWidth - 20) / this.state.buttonsLength) / 2 +
        ((windowWidth - 20) / this.state.buttonsLength) * (this.state.selectedButton - 1) +
        14) + offSet;
  }


  cambiaMenu(idMenu, index) {
  if (this.state.selectedButton !== index) {
    const esInicio = idMenu === 2;
    const esBotonCentral = index === Math.ceil(this.state.buttonsLength / 2);


    Animated.timing(this.state.bottomIcon, { toValue: 0, duration: 250, useNativeDriver: false }).start();
    Animated.timing(this.state.elevationCenter, { toValue: 1, duration: 250, useNativeDriver: false }).start();
    Animated.timing(this.state.offSetLeftBar, { toValue: this.calcularPositionLeft(0), duration: 250, useNativeDriver: false }).start();
    Animated.timing(this.state.offSetRightBar, { toValue: this.calcularPositionRight(0), duration: 250, useNativeDriver: false }).start();
    Animated.timing(this.state.borderRadius, { toValue: 0, duration: 250, useNativeDriver: false }).start(() => {
      this.setState({ selectedButton: index }, () => {

        Animated.parallel([
          Animated.timing(this.state.offSetLeftBar, { toValue: this.calcularPositionLeft(0), duration: 250, useNativeDriver: false }),
          Animated.timing(this.state.offSetCenterBar, { toValue: this.calcularPositionCenter(0), duration: 250, useNativeDriver: false }),
          Animated.timing(this.state.offSetRightBar, { toValue: this.calcularPositionRight(0), duration: 250, useNativeDriver: false }),
        ]).start(() => {
          Animated.parallel([
            Animated.timing(this.state.bottomIcon, { toValue: 20, duration: 250, useNativeDriver: false }),
            Animated.timing(this.state.elevationCenter, { toValue: 6, duration: 250, useNativeDriver: false }),
            Animated.timing(this.state.offSetLeftBar, { toValue: this.calcularPositionLeft(-28), duration: 250, useNativeDriver: false }),
            Animated.timing(this.state.offSetRightBar, { toValue: this.calcularPositionRight(-26), duration: 250, useNativeDriver: false }),
            Animated.timing(this.state.borderRadius, { toValue: 50, duration: 250, useNativeDriver: false }),
          ]).start(() => {
            this.props.onChangeTab(idMenu);

          });
        });
      });
    });
  }
}

  

  renderIcon(buttonItem, index) {
    return (
      <Pressable onPress={() => this.cambiaMenu(buttonItem.idMenu, index + 1)} style={styles.iconContStyle} key={'button' + index}>
        <Animated.View style={[styles.iconStyle, { bottom: this.state.selectedButton === index + 1 ? this.state.bottomIcon : 0 }]}>
          <BotonMenu type={buttonItem.type} icon={buttonItem.icon} size={24} color={this.state.selectedButton === index + 1 ? colors.primary : colors.black} />
        </Animated.View>
      </Pressable>
    );
  }

  renderIcons() {
    if (!this.state.activeButtons || this.state.activeButtons.length === 0) return null;
    return (
      <View style={styles.containerIcons}>
        {this.state.activeButtons.map((buttonItem, index) => this.renderIcon(buttonItem, index))}
      </View>
    );
  }
  
  render() {
    if (!this.state.activeButtons || this.state.activeButtons.length === 0) return null;
  
    return (
      <View style={styles.container}>
        {this.renderIcons()}
        <Animated.View style={[styles.leftBar, {
          width: this.state.offSetLeftBar,
          borderBottomRightRadius: this.state.borderRadius,
          borderTopRightRadius: this.state.borderRadius
        }]} />
        <Animated.View style={[styles.centerBar, {
          elevation: this.state.elevationCenter,
          left: this.state.offSetCenterBar,
          bottom: this.state.bottomIcon
        }]} />
        <Animated.View style={[styles.rightBar, {
          width: this.state.offSetRightBar,
          borderBottomLeftRadius: this.state.borderRadius,
          borderTopLeftRadius: this.state.borderRadius
        }]} />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: windowWidth,
    bottom: 0,
    height: 50,
    display: 'flex',
    zIndex: 100000
  },
  containerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth - 20,
    height: '100%',
    zIndex: 1000
  },
  rightBar: {
    backgroundColor: colors.secondary,
    height: '100%',
    width: windowWidth,
    position: 'absolute',
    zIndex: 10,
    right: 0,
    elevation: 2
  },
  leftBar: {
    backgroundColor: colors.secondary,
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    left: 0,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000',
    elevation: 2
  },
  centerBar: {
    height: 50,
    width: 50,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: colors.secondary,
    borderRadius: 50
  },
  iconContStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -24
  }
});

const mapStateToProps = (state) => ({
  usuario: state.usuario
});

export default connect(mapStateToProps)(GeneralMenu);
