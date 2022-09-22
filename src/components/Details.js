import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import IconContainer2 from './IconContainer2';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const Details = ({ img, locName }) => {
  return (
    <View style={{flex:1}}>
      <Image source={img} style={styles.image} />

      <View style={styles.top}>
          <TouchableOpacity>
            <IconContainer2 
              iconName={'arrow-left'}
            />
          </TouchableOpacity>

          <Text style={styles.text}>
            Region
            {'\n'}
            {locName}
          </Text>

          <TouchableOpacity>
            <IconContainer2 
              iconName={'info'}
            />
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
  },

  top: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    width: SCREENWIDTH,
  },

  text: {
    fontFamily: 'AlongSansSemiBold',
    fontSize: 15,
    color: 'black',
    top: 10
  },
})