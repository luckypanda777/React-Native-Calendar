import { 
    View, 
    Text, 
    TouchableWithoutFeedback, 
    TouchableHighlight,
    TextInput, 
    Button, 
    Dimensions, 
    StyleSheet,
    ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker'

const SCREENWIDTH = Dimensions.get('window').width;
const SCREENHEIGHT = Dimensions.get('window').height;

const AddAppointment = (props) => {
    // console.log('=============================================')
    // props.start && props.end && console.log(`${props.title}${'\n'}${props.start.toLocaleDateString()}${'\n'}${props.end.toLocaleDateString()}`)
    // console.log('=============================================')
    const [title, setTitle] = useState(props.title || '')
    const [startDate, setStartDate] = useState(props.start ? props.start : new Date())
    const [endDate, setEndDate] = useState(props.end ? props.end : new Date())
    const [summary, setSummary] = useState(props.summary || '')

    const [startOpen, setStartOpen] = useState(false)
    const [endOpen, setEndOpen] = useState(false)

    const styles = props.theme === 'light' ? lightTheme : darkTheme

    return (
        <View style={[props.style, {padding: 10}]}>
            <ScrollView>
                <View style={styles.line}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTitle(text)}
                        value={title}
                        placeholder='Title'
                        placeholderTextColor='grey'
                    />
                </View>
                <View style={[styles.line, { justifyContent: 'space-evenly' }]}>
                    <TouchableWithoutFeedback 
                        onPress={() => setStartOpen(true)} 
                    >
                        <View style={styles.dateSelect}>
                            <Text style={styles.dateText}> {`${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()}`} </Text>
                            {/* <Text style={styles.dateText}> {`${startDate}`} </Text> */}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback 
                        onPress={() => setEndOpen(true)} 
                    >
                        <View style={styles.dateSelect}>
                            <Text style={styles.dateText}> {`${endDate.toLocaleDateString()} ${endDate.toLocaleTimeString()}`} </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.line}>
                    <TextInput 
                        style={[styles.input, { textAlignVertical: 'top' }]}
                        onChangeText={text => setSummary(text)}
                        value={summary}
                        multiline={true}
                        numberOfLines={5}
                        placeholder='Summary'
                        placeholderTextColor='grey'
                    />
                </View>

                <View style={[styles.line, { justifyContent: 'flex-end' }]}>
                    <TouchableHighlight
                        style={{marginRight: 10}}
                        onPress={() => props.onCancel(title, startDate, endDate)}
                    >
                        <View style={styles.dateSelect}>
                            <Text style={styles.dateText}> Cancel </Text>
                        </View>
                    </TouchableHighlight>
                    {
                        props.start ? 
                            <TouchableHighlight
                                style={{marginRight: 10}}
                                onPress={props.onRemove}
                            >
                                <View style={styles.dateSelect}>
                                    <Text style={styles.dateText}> Delete </Text>
                                </View>
                            </TouchableHighlight>
                        : <></>
                    }
                    <TouchableHighlight 
                        style={{marginRight: 10}}
                        onPress={() => props.onSubmit(title, startDate, endDate)}
                    >
                        <View style={styles.dateSelect}>
                            <Text style={styles.dateText}> Save </Text> 
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>

            <DatePicker
                modal
                title='Select Start Date'
                open={startOpen}
                date={startDate}
                onConfirm={(date) => {
                    setStartOpen(false)
                    setStartDate(date)
                }}
                onCancel={() => {
                    setStartOpen(false)
                }}
            />
            <DatePicker
                modal
                title='Select End Date'
                open={endOpen}
                date={endDate}
                onConfirm={(date) => {
                    setEndOpen(false)
                    setEndDate(date)
                }}
                onCancel={() => {
                    setEndOpen(false)
                }}
            />
        </View>
    )
}

export default AddAppointment

const lightTheme = StyleSheet.create({
    line: {
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    label: {
        color: 'black'
    },
    input: {
        paddingLeft: 10,
        paddingRight: 10,
        width: SCREENWIDTH - 20,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        color: 'black',
    },
    dateSelect: {
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10
    },
    dateText: {
        color: 'black'
    }
})

const darkTheme = StyleSheet.create({
    line: {
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',        
    },
    label: {
        color: 'white',
    },
    input: {
        paddingLeft: 10,
        paddingRight: 10,
        width: SCREENWIDTH - 20,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        color: 'white',
    },
    dateSelect: {
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10
    },
    dateText: {
        color: 'white'
    }
})