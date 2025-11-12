import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Animated } from 'react-native';
import colors from '../../../../../res/colors';
import BotonMenu from '../../../../generalComponent/BotonMenu';

const windowWidth = Dimensions.get('window').width;

class FusionMenu extends Component {
  constructor(props) {
    super(props);
    const buttonsLength = (props.activeButtons || []).length || 3;
    const selectedIndex = Math.ceil(buttonsLength / 2) - 1;

    this.state = {
      buttonsLength,
      selectedIndex,
      circleX: new Animated.Value(this.calcCircleX(selectedIndex, buttonsLength)),
      merge: new Animated.Value(0), // 0 = flotando, 1 = fusionado
      leftWidth: new Animated.Value(this.calcLeftWidth(selectedIndex, buttonsLength, -28)),
      rightWidth: new Animated.Value(this.calcRightWidth(selectedIndex, buttonsLength, -26)),
    };
  }

  calcSegmentWidth(index, total) {
    return (windowWidth - 20) / total;
  }

  calcCircleX(index, total) {
    const seg = this.calcSegmentWidth(index, total);
    return seg * index + seg / 2 - 25; // 50 circle width
  }

  calcLeftWidth(index, total, offset = 0) {
    const seg = this.calcSegmentWidth(index, total);
    return seg * index + seg / 2 + 10 + offset;
  }

  calcRightWidth(index, total, offset = 0) {
    const seg = this.calcSegmentWidth(index, total);
    const center = seg * index + seg / 2 + 14;
    return windowWidth - center + offset;
  }

  handlePress = (button, index) => {
    const total = this.state.buttonsLength;
    if (index === this.state.selectedIndex) return;

    // Funde círculo con barra, mueve, y vuelve a flotar
    Animated.timing(this.state.merge, { toValue: 1, duration: 180, useNativeDriver: false }).start(() => {
      Animated.parallel([
        Animated.timing(this.state.circleX, { toValue: this.calcCircleX(index, total), duration: 220, useNativeDriver: false }),
        Animated.timing(this.state.leftWidth, { toValue: this.calcLeftWidth(index, total, -28), duration: 220, useNativeDriver: false }),
        Animated.timing(this.state.rightWidth, { toValue: this.calcRightWidth(index, total, -26), duration: 220, useNativeDriver: false }),
      ]).start(() => {
        this.setState({ selectedIndex: index }, () => {
          Animated.timing(this.state.merge, { toValue: 0, duration: 220, useNativeDriver: false }).start(() => {
            this.props.onChangeTab && this.props.onChangeTab(button.idMenu);
          });
        });
      });
    });
  };

  renderIcon(button, idx) {
    const isSelected = this.state.selectedIndex === idx;
    return (
      <Pressable onPress={() => this.handlePress(button, idx)} style={styles.iconSlot} key={`btn-${idx}`}>
        <BotonMenu type={button.type} icon={button.icon} size={24} color={isSelected ? colors.primary : colors.black} />
      </Pressable>
    );
  }

  render() {
    const { activeButtons = [] } = this.props;
    if (!activeButtons.length) return null;

    const translateY = this.state.merge.interpolate({ inputRange: [0, 1], outputRange: [20, 0] });
    const circleElevation = this.state.merge.interpolate({ inputRange: [0, 1], outputRange: [6, 1] });

    return (
      <View style={styles.container}>
        <View style={styles.iconsRow}>
          {activeButtons.map((b, i) => this.renderIcon(b, i))}
        </View>

        <Animated.View style={[styles.leftBar, { width: this.state.leftWidth }]} />
        <Animated.View style={[styles.rightBar, { width: this.state.rightWidth }]} />

        <Animated.View
          style={[
            styles.centerCircle,
            { left: this.state.circleX, bottom: translateY, elevation: circleElevation },
          ]}
        >
          <BotonMenu
            type={activeButtons[this.state.selectedIndex].type}
            icon={activeButtons[this.state.selectedIndex].icon}
            size={24}
            color={colors.gray2}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsRow: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  iconSlot: {
    flex: 1,
    alignItems: 'center',
  },
  leftBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    backgroundColor: colors.white,
    borderTopRightRadius: 50,
    elevation: 2,
  },
  rightBar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 50,
    elevation: 2,
  },
  centerCircle: {
    position: 'absolute',
    bottom: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    zIndex: 30,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});

export default FusionMenu;
