import { ImageBackground, View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header'
import { blurImg, mainFont, mainBoldFont } from '../utils'

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const Messages = () => {

  const [searchInput, setSearchInput] = useState('')
  const [data, setData] = useState([])

  return (
    <View style={styles.container}>
      <Header title='Messages' search={searchInput} handleSearch={setSearchInput}/>
      <ImageBackground source={ require('../../assets/images/main_blur.jpg') } blurRadius={40} resizeMode="cover" style={styles.image}>
        {
          data.length ? 
          <>
          </> 
          : 
          <View style={styles.errMsg}>
            <Text style={styles.titleText}>
              No messages found
            </Text>
            <Text style={styles.bodyText}>
            There are no messages yet. You will be notified for new messages.{'\n'}Pull down to refresh.
            </Text>
          </View>
        }
      </ImageBackground>
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black',
      height: SCREENHEIGHT,
      width: SCREENWIDTH,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errMsg: {
    padding: 0,
    margin: 0,
    marginTop: -100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    fontFamily: mainFont,
    fontSize: 18,
    color: '#AAAAAA'
  },
  bodyText: {
    fontFamily: mainFont,
    fontSize: 12.5,
    color: '#9E9D9D',
    paddingTop: 20,
    textAlign: 'center',
  }
})