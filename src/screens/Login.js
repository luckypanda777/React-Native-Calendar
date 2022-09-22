import { 
  Image, ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity,
} from 'react-native';
import { BlurView } from "@react-native-community/blur";
import React, { useState, useContext} from 'react';
import SignupInfo from '../components/SignupInfo';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../auth/AuthProvider';
import { welcomeImg, logoImg } from './utils'
import AnimatedModal from '../components/AnimatedModal';

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleLogin } = useContext(AuthContext);

  const [switchCase, setSwitchCase] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/splash.png')} resizeMode="cover" style={styles.image}> 
        <View style={styles.logoView}> 
          <Image
            source={require('../assets/images/itattoo_2x.png')}
            style={styles.tinyLogo}
          />
          <Text style={styles.logoText}> Artist </Text> 
        </View>
        <BlurView
          style={{width: SCREENWIDTH, height: 1}}
          blurType="dark"
          blurAmount={10}
        />
        <AnimatedModal visible={true} update={false}>
          <View style={styles.lower}>
            <BlurView
              style={styles.lowerback}
              blurType="dark"
              blurAmount={10}
            />
            <View style={styles.authBar}>
              <Text style={styles.infoText}> 
                {
                  !switchCase ? 'AUTHORIZE WITH YOUR ACCOUNT' : 'REQUEST NEW PASSWORD'
                }
              </Text>
            </View>
            <SignupInfo 
                infoTitle='Email' 
                placeholder='Enter address' 
                placeholderTextColor="#cfcfcf"
                autoComplete='email' 
                value={email}
                onChangeText={userEmail => setEmail(userEmail)}
            />
            {
              !switchCase ?
                <>
                  <SignupInfo 
                    infoTitle='Password' 
                    placeholder='Password' 
                    placeholderTextColor="#cfcfcf"
                    autoComplete='password'
                    value={password}
                    onChangeText={userPassword => setPassword(userPassword)}
                  />
                </> : <></>
            }
            <TouchableOpacity style={styles.noBackButton} onPress={() => setSwitchCase(!switchCase)} >
              <Text style={styles.noBackButtonText}> 
                {
                  !switchCase ? 'Reset Password' : 'Back to Login'
                }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => login(email, password)} >
              <Text style={styles.buttonText}> 
                {
                  !switchCase ? 'LOGIN' : 'RESET'
                } 
              </Text>
            </TouchableOpacity>
          </View>
        </AnimatedModal>
      </ImageBackground>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  input: {
    width: SCREENWIDTH,
    margin: 0,
    padding: 10,
    // height: 30,
  },
  image: {
    flex: 1,
    height: SCREENHEIGHT,
    width: SCREENWIDTH,
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  logoView: {
    position: 'absolute',
    width: SCREENWIDTH,
    top: SCREENHEIGHT / 5.5,
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 10,
  },
  logoText: {
    zIndex: 5,
    opacity: 0.7,
    paddingTop: 10,
    color: 'white',
    alignSelf: 'center'
  },
  tinyLogo: {
    zIndex: 888,
    opacity: 1,
    width: SCREENWIDTH / 3,
    height: SCREENWIDTH * 28 / 310 - 0.5,
    alignSelf:'center',
  },
  lower: {
    width: SCREENWIDTH,
    margin: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 20,
  },
  lowerback: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  authBar: {
    backgroundColor: '#222222',
    zIndex: 2,
    justifyContent: 'center',
    padding: 7,
  },
  titleText: {
    fontFamily: 'AlongSansExtraBold',
    marginLeft: 10,
    fontSize: 30,
    color: 'white'
  },
  infoText: {
    fontFamily: 'AlongSansMedium',
    fontSize: 14,
    color: 'white',
    padding: 5,
    alignSelf: 'center'
  },

  IconContainer: {
    backgroundColor: 'black',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'gray',
  },
  
  button: {
    backgroundColor: '#40D370',
    width: SCREENWIDTH,
    // height: 0.07 * SCREENHEIGHT,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 0
  },
  buttonText: {
    fontFamily: 'AlongSansExtraBold',
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  noBackButton: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    width: 145,
    alignSelf: 'flex-end'
  },
  noBackButtonText: {
    color: '#36CC69',
  },
  loginText: {
    fontFamily: 'AlongSansMedium',
    fontSize: 15,
    color: 'white',
    marginTop: 20,
  },
})