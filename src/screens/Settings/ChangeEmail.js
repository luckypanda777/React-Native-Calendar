import { TouchableOpacity, TextInput, ImageBackground, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react'

const { width, height } = Dimensions.get('window')

const ChangeEmail = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 50, color: 'white'}}> Hello World </Text>
        </View>
    )
}

export default ChangeEmail

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: 'black',
    }
})