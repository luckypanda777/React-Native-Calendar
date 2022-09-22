import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import React, { useContext} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IconContainer from './IconContainer';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../auth/AuthProvider';

const Search = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
        <View style={styles.search}>
            <Icon name='search' size={25} color='white' />
            <Text style={styles.text}> Search for places </Text>
        </View>
      </TouchableOpacity>

      <View style={{left: 10}}>
        <TouchableOpacity onPress={() => logout()}> 
          <IconContainer 
            iconName={'shuffle'}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10
    },

    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'black',
        width: 250,
        height: 50,
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },

    text: {
        fontFamily: 'AlongSansSemiBold',
        fontSize: 16,
        left: 10,
        top: 2,
        color: 'white',
        alignSelf: 'center',
    }
})