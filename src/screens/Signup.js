import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconContainer from '../components/IconContainer';
import SignupInfo from '../components/SignupInfo';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../auth/AuthProvider';

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { googleLogin } = useContext(AuthContext);

  const passData = () => {
    if (email && password) {
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
      } else {
      navigation.navigate('SetPhotoName', {
        email: email,
        password: password,
      });
    }
    } else if (email && !password) {
      alert('Please enter a valid password');
    } else if (!email && password) {
      alert('Please enter a valid email address');
    } else {
      alert('Please meet all requirements');
    };
  }

  return (
    <View>
      <View style={styles.upper}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <TouchableOpacity>
            <IconContainer iconName='arrow-left' />
          </TouchableOpacity>

          <Text style={styles.signupText}> Sign up</Text>
        </View>

        <View>
          <Text style={styles.infoText}> Sign up with the following option.</Text>
          <View>
            <TouchableOpacity style={styles.IconContainer} onPress={googleLogin}>
              <Icon name='logo-google' size={30} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.middle}>
        <SignupInfo 
          infoTitle='Email' 
          placeholder='Enter your email address' 
          autoComplete='email' 
          value={email}
          onChangeText={userEmail => setEmail(userEmail)}
        />
          
        
        <SignupInfo 
          infoTitle='Password' 
          placeholder='Enter your password' 
          autoComplete='password'
          value={password}
          onChangeText={userPassword => setPassword(userPassword)}
        />
      </View>

      <View style={styles.lower}>
        <TouchableOpacity style={styles.button} onPress={passData}>
          <Text style={styles.buttonText}> Next </Text>
          <Icon name='arrow-forward' size={30} color='black' />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={styles.loginText}> Already have an account? </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginText,  {
              fontFamily: 'AlongSansExtraBold',
            }]}> Log in </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  upper: {
    backgroundColor: 'black',
    height: SCREENHEIGHT / 3.5,
    width: SCREENWIDTH,
    padding: 20
  },

  middle: {
    backgroundColor: 'black',
    height: SCREENHEIGHT - (SCREENHEIGHT / 3.5) - (SCREENHEIGHT / 2.5),
    width: SCREENWIDTH,
    padding: 20,
  },

  lower: {
    backgroundColor: 'black',
    height: SCREENHEIGHT / 2.5,
    width: SCREENWIDTH,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  signupText: {
    fontFamily: 'AlongSansExtraBold',
    marginLeft: 10,
    fontSize: 30,
    color: 'white'
  },

  infoText: {
    fontFamily: 'AlongSansMedium',
    fontSize: 14,
    color: 'white',
    marginTop: 50,
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
    backgroundColor: 'white',
    width: 0.7 * SCREENWIDTH,
    height: 0.07 * SCREENHEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  },
  
  buttonText: {
    fontFamily: 'AlongSansExtraBold',
    fontSize: 18,
    color: 'black',
    alignSelf: 'center'
  },

  loginText: {
    fontFamily: 'AlongSansMedium',
    fontSize: 15,
    color: 'white',
    marginTop: 20,
  },
})