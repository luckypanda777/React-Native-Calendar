import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Card2 = ({ locName, rating, location, time }) => {
    const navigation = useNavigation();

    const [bookmark, setBookmark] = useState(false);
    
    const handleBookmark = () => {
        setBookmark(!bookmark);

        if (bookmark == true){
            alert(
                locName + ' has been added to your bookmarks!'
            );
            // navigation.navigate('Bookmarks', {
            //     locName: locName,
            //     location: location,
            //     rating: rating,
            // });
        }
        else {
            alert(
                locName + ' has been removed from your bookmarks!'
            )
        }
    };

    return (
      <View style={styles.container}>
        <View style={styles.align}>
            <Text style={styles.text}>
                {locName}
            </Text>

            <View style={styles.rating}>
                <Icon name={'star'} size={15} color='yellow' />
                <Text style={styles.ratingText}> {rating} </Text>
            </View>
        </View>

        <View style={[styles.align, {justifyContent: null, left: 40, top: 10}]}>
            <Icon name={'location-outline'} size={25} color='white' />
            <Text style={[styles.text, {
                fontSize: 15,
                padding: 0,
                left: 0,
                color: 'white',
            }]}> {location} </Text>
        </View>

        <View style={[styles.align, {justifyContent: null, left: 40, top: 30}]}>
            <Icon name={'time-outline'} size={25} color='white' />
            <Text style={[styles.text, {
                fontSize: 15,
                padding: 0,
                left: 0,
                color: 'white',
            }]}> {time} </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity style={styles.button}>
                <Text style={[styles.text, {
                    fontSize: 15,
                    left: 0,
                }]}>
                    See on the map
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleBookmark()} style={[styles.button, {
                width: '16%',
            }]}>
                <Icon name='bookmark' size={20} color='white' />
            </TouchableOpacity>
        </View>
      </View>
  )
}

export default Card2

const styles = StyleSheet.create({
    align: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    container: {
        backgroundColor: 'black',
        top: 530,
        opacity: 0.8,
        height: 200,
        width: '85%',
        alignSelf: 'center',
        borderRadius: 15
    },

    text: {
        fontFamily: 'AlongSansSemiBold',
        color: 'white',
        fontSize: 18,
        padding: 10,
        left: 40,
    },

    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        right: 40,
    },

    ratingText: {
        fontFamily: 'AlongSansSemiBold',
        color: 'white',
        fontSize: 12,
        top: 2,
        left: 2,
    },

    button: {
        backgroundColor: 'black',
        width: '50%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 2,
        borderColor: 'white',
        marginTop: 40,
        left: -5,
        backgroundColor: 'transparent',
    }
})