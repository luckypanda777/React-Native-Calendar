import { TextInput, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather'

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const Header = (props) => {
    
    const [ searchCli, setSearchCli ] = useState(false)
    
    return (
        <View style={styles.container}>
            {
                !searchCli ?
                <>
                {
                    props.addEventButton === true ? 
                        <TouchableOpacity style={styles.button} onPress={props.showEventSetter}>
                            <Icon name='plus-circle' size={20} color='white' />
                        </TouchableOpacity>
                    :
                        <View style={styles.blank}></View>
                }
                    <Text style={styles.header}> {props.title} </Text>
                    <TouchableOpacity style={styles.button} onPress={() => setSearchCli(!searchCli)}>
                        <Icon name='search' size={20} color='white' />
                    </TouchableOpacity>
                </> :
                <>
                    <TextInput
                        style={styles.input}
                        onChangeText={props.handleSearch}
                        value={props.search}
                        placeholder="Search..."
                    />
                    <TouchableOpacity style={styles.button} onPress={() => setSearchCli(!searchCli)}>
                        <Icon name='x-circle' size={20} color='white' />
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#36C15E',
        width: SCREENWIDTH,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 60,
        padding: 10
    },
    header: {
        fontFamily: 'AlongSansMedium',
        color: 'white',
        fontSize: 20,
        alignSelf: 'center'
    },
    blank: {
        width: 10,
    },
    button: {
        paddingTop: 10
    },
    input: {
        padding: 5,
        paddingLeft: 10,
        height: 40,
        width: 0.9 * SCREENWIDTH,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
})