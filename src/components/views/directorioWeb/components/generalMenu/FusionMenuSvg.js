import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Animated, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import colors from '../../../../../res/colors';
import BotonMenu from '../../../../generalComponent/BotonMenu';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
// Shape knobs – tweak these to change the cutout shape
const SHAPE = {
  BAR_HEIGHT: 50,          // altura de la barra inferior
  CORNER_RADIUS: 0,        // radio de las esquinas superiores (0 = sin redondeo)
  NOTCH_RX: 65,            // ancho del recorte (radio X)
  NOTCH_RY: 38,            // profundidad del recorte (radio Y)
  PADDING_X: 10,           // padding lateral del row de iconos
  CIRCLE_SIZE: 50,         // diámetro del círculo flotante
};
const BAR_HEIGHT = SHAPE.BAR_HEIGHT;
const CIRCLE_SIZE = SHAPE.CIRCLE_SIZE;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;
// Desplazamientos verticales específicos para iOS
const IOS_ICON_Y_OFFSET = 12;   // empuja los íconos hacia abajo
const IOS_CENTER_BOTTOM = 18;  // separa el botón central del borde inferior

class FusionMenuSvg extends Component {
  constructor(props) {
    super(props);
    const buttonsLength = (props.activeButtons || []).length || 3;
    const selectedIndex = Math.ceil(buttonsLength / 2) - 1;

    const circleX = new Animated.Value(this.calcCircleX(selectedIndex, buttonsLength));
    const merge = new Animated.Value(0);

    const initialCx = this.calcNotchCx(this.calcCircleX(selectedIndex, buttonsLength));
    this.state = {
      buttonsLength,
      selectedIndex,
      circleX,
      merge,
      pathD: this.buildPath(initialCx, CIRCLE_RADIUS),
      topStrokeD: this.buildTopStroke(initialCx),
    };
  }

  componentDidMount() {
    // Update the bar path when merge or circleX changes
    this.mergeListener = this.state.merge.addListener(({ value }) => {
      this.updatePath();
    });
    this.circleListener = this.state.circleX.addListener(({ value }) => {
      this.updatePath();
    });
  }

  componentWillUnmount() {
    if (this.mergeListener) this.state.merge.removeListener(this.mergeListener);
    if (this.circleListener) this.state.circleX.removeListener(this.circleListener);
  }

  calcSegmentWidth(index, total) {
    return (WINDOW_WIDTH - SHAPE.PADDING_X * 2) / total;
  }

  calcCircleX(index, total) {
    const seg = this.calcSegmentWidth(index, total);
    // Absolute left for circle container (account for row lateral padding)
    return seg * index + seg / 2 - CIRCLE_RADIUS + SHAPE.PADDING_X;
  }

  calcNotchCx(circleLeft) {
    // Path uses absolute pixels from left; circle center x
    return circleLeft + CIRCLE_RADIUS;
  }

  buildPath(cx, r) {
    // rNotch shrinks on merge, closing the cutout
    const merge = this.state ? this.state.merge.__getValue() : 0;
    const rx = Math.max(0, SHAPE.NOTCH_RX * (1 - merge)); // half-width of notch
    const ry = Math.max(0, SHAPE.NOTCH_RY * (1 - merge)); // depth of notch
    const w = WINDOW_WIDTH;
    const h = BAR_HEIGHT;
    const cr = SHAPE.CORNER_RADIUS; // top corner radius

    // Smooth U-shaped notch using cubic Bezier for rounded shoulders
    const leftShoulderX = cx - rx;
    const rightShoulderX = cx + rx;
    const s = 0.55; // shoulder smoothness factor (0.4–0.7)

    // Top outer path with optional corner radius on top-left and top-right
    const topLeft = cr > 0
      ? `L0,${cr} Q0,0 ${cr},0`
      : `L0,0 L0,0`;
    const topRight = cr > 0
      ? `L${w - cr},0 Q${w},0 ${w},${cr}`
      : `L${w},0`;

    // Build the full path: bottom-left -> up to top-left -> go to left shoulder,
    // draw smooth notch, continue to top-right, then down to bottom-right and close
    const path = [
      `M0,${h}`, // bottom-left
      topLeft,
      `L${leftShoulderX},0`,
      // first cubic: from left shoulder to bottom of notch (cx, ry)
      `C ${leftShoulderX + rx * s},0 ${cx - rx * s},${ry} ${cx},${ry}`,
      // second cubic: from bottom of notch back to right shoulder
      `C ${cx + rx * s},${ry} ${rightShoulderX - rx * s},0 ${rightShoulderX},0`,
      topRight,
      `L${w},${h} Z`,
    ].join(' ');

    return path;
  }

  buildTopStroke(cx) {
    const merge = this.state ? this.state.merge.__getValue() : 0;
    const rx = Math.max(0, SHAPE.NOTCH_RX * (1 - merge));
    const ry = Math.max(0, SHAPE.NOTCH_RY * (1 - merge));
    const w = WINDOW_WIDTH;
    const cr = SHAPE.CORNER_RADIUS;
    const s = 0.55;

    const leftShoulderX = cx - rx;
    const rightShoulderX = cx + rx;

    const start = cr > 0 ? `M0,${cr} Q0,0 ${cr},0` : `M0,0`;
    const end = cr > 0 ? `L${w - cr},0 Q${w},0 ${w},${cr}` : `L${w},0`;

    const path = [
      start,
      `L${leftShoulderX},0`,
      `C ${leftShoulderX + rx * s},0 ${cx - rx * s},${ry} ${cx},${ry}`,
      `C ${cx + rx * s},${ry} ${rightShoulderX - rx * s},0 ${rightShoulderX},0`,
      end,
    ].join(' ');

    return path;
  }

  updatePath() {
    const cx = this.calcNotchCx(this.state.circleX.__getValue());
    const d = this.buildPath(cx, CIRCLE_RADIUS + 2);
    const ts = this.buildTopStroke(cx);
    this.setState({ pathD: d, topStrokeD: ts });
  }

  handlePress = (button, index) => {
    const total = this.state.buttonsLength;
    if (index === this.state.selectedIndex || this.state.animating) return;

    // 1) Navegación primero
    this.props.onChangeTab && this.props.onChangeTab(button.idMenu);

    // 2) Luego animación (defer para permitir el render de la nueva vista)
    this.setState({ animating: true }, () => {
      setTimeout(() => {
        Animated.timing(this.state.merge, { toValue: 1, duration: 180, useNativeDriver: false }).start(() => {
          Animated.timing(this.state.circleX, {
            toValue: this.calcCircleX(index, total),
            duration: 220,
            useNativeDriver: false,
          }).start(() => {
            this.setState({ selectedIndex: index }, () => {
              Animated.timing(this.state.merge, { toValue: 0, duration: 220, useNativeDriver: false }).start(() => {
                this.setState({ animating: false });
              });
            });
          });
        });
      }, 50);
    });
  };

  renderIcon(button, idx) {
    const isSelected = this.state.selectedIndex === idx;
    return (
      <Pressable onPress={() => this.handlePress(button, idx)} style={styles.iconSlot} key={`btn-${idx}`}>
        <View style={isSelected ? styles.hiddenIcon : null}>
          <BotonMenu type={button.type} icon={button.icon} size={22} color={colors.gray1} />
        </View>
      </Pressable>
    );
  }

  render() {
    const { activeButtons = [] } = this.props;
    if (!activeButtons.length) return null;

    const translateY = this.state.merge.interpolate({
      inputRange: [0, 1],
      outputRange: [Platform.OS === 'ios' ? IOS_CENTER_BOTTOM : 20, 0],
    });
    const left = this.state.circleX;

    return (
      <View style={styles.container}>
        <Svg width={WINDOW_WIDTH} height={BAR_HEIGHT} style={StyleSheet.absoluteFill}>
          <Path d={this.state.pathD} fill={colors.white} fillRule="evenodd" />
          {this.state.topStrokeD ? (
            <Path d={this.state.topStrokeD} fill="none" stroke={colors.gray7} strokeOpacity={0.9} strokeWidth={1.5} strokeLinecap="round" />
          ) : null}
        </Svg>

        <View style={styles.iconsRow}>
          {activeButtons.map((b, i) => this.renderIcon(b, i))}
        </View>

        <Animated.View style={[styles.centerCircle, { left, bottom: translateY }]}>
          <View style={styles.centerIcon}>
            <BotonMenu
              type={activeButtons[this.state.selectedIndex].type}
              icon={activeButtons[this.state.selectedIndex].icon}
              size={24}
              color={colors.gray2}
            />
          </View>
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
    height: BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  iconsRow: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 0,
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.select({ ios: IOS_ICON_Y_OFFSET, android: 0 }),
  },
  iconSlot: {
    flex: 1,
    alignItems: 'center',
  },
  hiddenIcon: {
    opacity: 0,
  },
  centerCircle: {
    position: 'absolute',
    bottom: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_RADIUS,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  centerIcon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.select({ ios: IOS_ICON_Y_OFFSET, android: 0 }),
  },
});

export default FusionMenuSvg;
