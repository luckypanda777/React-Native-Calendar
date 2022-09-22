import { TouchableOpacity, TextInput, ImageBackground, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
// import SettingsCard from '../../components/SettingsCard';
import { mainFont, mainBoldFont } from '../utils';
import AnimatedModal from '../../components/AnimatedModal';
import ChangeEmail from './ChangeEmail';
import { ScrollView } from 'react-native-gesture-handler';

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const topImg = {
  width: SCREENWIDTH,
  height: 150,
}

const avatarSize = {
  width: 140,
  height: 140,
}

const avatarPosition = {
  left: (SCREENWIDTH - avatarSize.width) / 2,
  top: topImg.height - avatarSize.height / 2, 
}

const UserProfile = () => {

  const [bio, setBio] = useState('')
  const [emailOption, setEmailOption] = useState(false)
  const [mobileOption, setMobileOption] = useState(false)

  return (
    <View style={styles.container}>    
      <ImageBackground source={ require('../../assets/images/main_blur.jpg') } blurRadius={20} resizeMode="cover" style={styles.image}>
        <View style={styles.upper}>
          <ImageBackground source={ require('../../assets/images/profile_top.png') } resizeMode="cover" style={styles.image} >
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 0.05 * SCREENHEIGHT}}>
              <Text style={styles.textName}>
                  Nana Kofi Mantey
              </Text>
              <Text style={styles.textGroup}>
                  iTattoo
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="camera" size={50} color='white' />
        </View>
        <ScrollView>
          <View style={styles.lower}>
            <View style={styles.titleBar}><Text style={styles.titleText}>PROFILE</Text></View>
            <TouchableOpacity onPress={ () => { setEmailOption(!emailOption) } }>
              <View style={styles.button}>
                <Text style={{color: 'grey'}}>Email</Text>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                  <Text style={{color: 'white'}}> Test@gmail.com </Text> 
                  <Icon name="angle-right" size={23} color='white' style={styles.arrowStyle} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => { setMobileOption(!mobileOption) } }>
              <View style={styles.button}>
                <Text style={{color: 'grey'}}> Mobile </Text>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                  <Text style={{color: 'white'}}> Add </Text> 
                  <Icon name="angle-right" size={23} color='white' style={styles.arrowStyle} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.mt30}>
              <View style={styles.titleBar}><Text style={styles.titleText}>INFORMATION</Text></View>
              <TextInput 
                multiline
                onChangeText={text => setBio(text)}
                numberOfLines={5}
                value={bio}
                style={styles.bio}
                editable
                placeholder='Bio'
                placeholderTextColor="grey" 
              />
            </View>
          </View>
          
          <View style={styles.mt30}>
            <TouchableOpacity onPress={ () => alert('logout') }>
              <Text style={styles.logoutBtn}> LOGOUT </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.privacyView, styles.mt30, {marginBottom: 30}]}>
            <TouchableOpacity onPress={ () => alert('privacy terms') }>
              <Text style={styles.privacyBtn}> Privacy Terms </Text>
            </TouchableOpacity>              
          </View>
        </ScrollView>
        {
          emailOption && 
            <AnimatedModal 
              style={styles.modalView} 
              visible={emailOption} 
              update={true}
              title='Change Email'
              onClose={ () => setEmailOption(!emailOption) }
            >
              <ChangeEmail />
            </AnimatedModal>
        }
        {
          mobileOption && 
            <AnimatedModal 
              style={styles.modalView} 
              visible={mobileOption}
              update={true}
              title='Change Phone Number'
              onClose={ () => setMobileOption(!mobileOption) }
            >
              <ChangeEmail />
            </AnimatedModal>
        }

      </ImageBackground>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    height: SCREENHEIGHT - 63,
  },

  modalView: {
    height: SCREENHEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },

  mt30: {
    marginTop: 30,
  },

  textName: {
    fontSize: 15,
    fontFamily: mainFont,
    color: 'white',
    alignSelf: 'center',
  },

  textGroup: {
    fontSize: 10,
    fontFamily: mainFont,
    color: 'white',
    alignSelf: 'center',
  },

  upper: {
    height: topImg.height,
  },

  button: {
    padding: 20,
    alignContent: 'space-between',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },

  logoutBtn: {
    backgroundColor: '#FB4B46',
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    fontSize: 18,
    fontFamily: mainBoldFont,
    textAlign: 'center',
    color: 'white',
  },

  privacyBtn: {
    color: 'green',
    justifyContent: 'center',
  },

  privacyView: {
    alignItems: 'center',
  },

  bio: {
    padding: 10,
    margin: 0,
    color: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    textAlignVertical: 'top',

  },

  iconContainer: {
    position: 'absolute',
    left: avatarPosition.left,
    top: avatarPosition.top,
    height: avatarSize.height,
    width: avatarSize.width,
    borderRadius: avatarSize.width / 2,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#313431',
    zIndex: 9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    zIndex: 1,
  },

  lower: {
    marginTop: 100,
  },

  titleBar: {
    height: 30,
    width: SCREENWIDTH,
    backgroundColor: '#211B14',
    justifyContent: 'center',
    alignItems: 'center'
  },

  titleText: {
    fontFamily: mainFont,
    fontSize: 15,
    color: 'grey'
  },

  arrowStyle: {
    paddingLeft: 5
  }
})