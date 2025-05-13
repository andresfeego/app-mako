import React, { Component } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native'
import { setNavigationRed } from '../../../res/localStore/Actions';
import { connect } from 'react-redux';


const windowHeight = Dimensions.get('window').height;

class Splash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scale: new Animated.Value(1),
            finishAnimated: false,
            opacity: new Animated.Value(0),
        };
    }

    componentDidMount() {

        this.iniciarAnimacion();
        this.props.setNavigationRed(this.props.navigation);
        setTimeout(() => {
            this.props.navigation.navigate("GeneralContainer")
            }, 1500);
    }

    componentWillMount

    pulse(num) {
        return new Promise((resolve, reject) => {

            if (num > 0) {

                Animated.timing(
                    this.state.scale,
                    {
                        toValue: 1.1,
                        duration: 500,
                        useNativeDriver: false
                    }
                ).start(() => {
                    Animated.timing(
                        this.state.scale,
                        {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: false
                        }
                    ).start();

                });

                setTimeout(() => {
                    this.pulse(num - 1).then(() => {
                        resolve()
                    })
                }, 1000);
            } else {
                resolve()
            }

        })
    }


    async iniciarAnimacion() {
        this.pulse(1).then(() => {
          Animated.timing(
            this.state.scale,
            {
              toValue: 1,
              duration: 200,
              useNativeDriver: false
            }
          ).start();
      
          this.setState({
            finishAnimated: false,
          });
      
          Animated.timing(
            this.state.opacity,
            {
              toValue: 0,
              duration: 500,
              useNativeDriver: false
            }
          ).start();
        });
      }
      


    render() {

        const chartConfig = {
            backgroundGradientFrom: "#1E29",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, 
            barPercentage: 0.5,
            useShadowColorFromDataset: false 
        };

        var displayForm = this.state.finishAnimated ? 'absolute' : 'none';
        var styleImage = this.state.finishAnimated ? [styles.ridLogoNoAni] : [styles.ridLogoAni, { top: this.state.top, transform: [{ scale: this.state.scale }] }];
        var stylesContainerImage = this.state.finishAnimated ? styles.containerImageNoAni : styles.containerImageAni;

        return (
            <View style={styles.container}>

                <View style={stylesContainerImage}>

                    <Animated.Image
                        style={styleImage} resizeMode='contain'
                        source={require('../..//../assets/logomako.png')}

                    />
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    ridLogoAni: {
        height: '35%',

    },
    ridLogoNoAni: {
        height: '35%'
    },
    containerImageAni: {
        height: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',

    },

   

})


const mapStateToProps = (state) => {
    return {
        navigationMako: state.navigationMako
    }
}


const mapDispatchToProps = {
    setNavigationRed
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);


