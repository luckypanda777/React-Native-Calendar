import {
    /* previously imported modules here */
    TouchableOpacity,
    Text,
    View,
    Dimensions,
    Animated, // add this
    Easing, // add this
    ScrollView
} from "react-native";
import React, { useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo'

const { height, width } = Dimensions.get("window");

// export default class AnimatedModal extends React.Component {
export default class AnimatedModal extends React.Component {

    constructor(props) {
        super(props);
        this.yTranslate = new Animated.Value(0); // declare animated value for controlling the vertical position of the modal
    }

    componentDidMount = (prevProps, prevState) => {
      if (this.props.visible) {
        // animate the showing of the modal
        Animated.parallel([
          Animated.spring(this.yTranslate, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }).start(),
          Animated.timing(this.yTranslate, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear,
          }).start()
        ])
      } else {
        // animate the hiding of the modal
        this.yTranslate.setValue(1); // reset the animated value
        Animated.parallel([
          Animated.spring(this.yTranslate, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
          }).start(),
          Animated.timing(this.yTranslate, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear,
          }).start()
        ])
      }  
    }

    componentDidUpdate = (prevProps, prevState) => {
      if(this.props.update === true) {
        if (this.props.visible) {
          // animate the showing of the modal
          this.yTranslate.setValue(0); // reset the animated value
          Animated.parallel([
            Animated.spring(this.yTranslate, {
              toValue: 1,
              friction: 5,
              useNativeDriver: true,
            }).start(),
            Animated.timing(this.yTranslate, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
              easing: Easing.linear,
            }).start()
          ])
        } else {
          // animate the hiding of the modal
          this.yTranslate.setValue(1); // reset the animated value
          Animated.parallel([
            Animated.spring(this.yTranslate, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true,
            }).start(),
            Animated.timing(this.yTranslate, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
              easing: Easing.linear,
            }).start()
          ])
        }
      }
    }


    render() {
        // let bottomStyle = this.props.visible ? { bottom: 0 } : { bottom: -height }; // show or hide the component from view
        const { children, onClose } = this.props;

        let negativeHeight = 0;
        let modalMoveY = this.yTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [height, negativeHeight]
        });

        let translateStyle = { transform: [{ translateY: modalMoveY }] }; // translateY is the transform for moving objects vertically

        return (
            <Animated.View style={[this.props.style, translateStyle]}>
              <View style={{alignItems: 'center'}}>
                {
                  onClose ? 
                    <View 
                      style={{
                          width: width, 
                          height: 33, 
                          backgroundColor: '#36C15E',
                          color: 'white',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                      }}
                    >
                      <View style={{width: 10}} />
                      <Text style={{fontSize: 20, color: 'white'}}>{this.props.title}</Text>
                      <TouchableOpacity onPress={onClose} style={{paddingTop: 5, paddingRight: 5,}}>
                        <Icon name='squared-cross' size={20} color='white' />
                      </TouchableOpacity>
                    </View>
                  : 
                    <></>
                }
              </View>
              <ScrollView>
                {children}
              </ScrollView>
            </Animated.View>
        )
    }
}
