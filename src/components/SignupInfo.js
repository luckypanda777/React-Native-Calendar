import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import React from 'react';

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const SignupInfo = ({ infoTitle, placeholder, placeholderTextColor, autoComplete, value, ...rest }) => {
  return (
    <View >
      {/* <Text style={styles.text}> {infoTitle} </Text> */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.input}
        autoComplete={autoComplete}
        value={value}
        secureTextEntry={infoTitle === 'Password' ? true : false}
        autoCapitalize='none'
        {...rest}
      />
    </View>
  )
}

export default SignupInfo

const styles = StyleSheet.create({
    text: {
        fontFamily: 'AlongSansSemiBold',
        fontSize: 16,
        color: 'white',
    },

    input: {
        borderColor: 'grey',
        borderWidth: 1.5,
        width: SCREENWIDTH,
        padding: 10,
        color: 'white',
        fontFamily: 'AlongSansSemiBold',
        fontSize: 15,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    }
})