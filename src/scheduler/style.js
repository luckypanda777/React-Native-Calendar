// @flow
import { Platform, StyleSheet, Dimensions } from 'react-native';

// const eventPaddingLeft = 4
const leftMargin = 50 - 1;
const { width, height } = Dimensions.get('window');

export default function styleConstructor(theme = {}, calendarHeight) {
  let style = {
    container: {
      flex: 1,
      backgroundColor: '#222222',
      ...theme.container,
    },
    contentStyle: {
      color: 'white',
      height: calendarHeight + 10,
      ...theme.contentStyle,
    },
    header: {
      paddingHorizontal: 30,
      height: 50,
      borderTopWidth: 1,
      // borderBottomWidth: 1,
      borderColor: '#E6E8F0',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      ...theme.header,
    },
    headerTextContainer: {
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 16,
      color: 'white',
      ...theme.headerText,
    },
    arrow: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
    },
    arrowButton: {
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.arrowButton,
    },
    event: {
      position: 'absolute',
      // backgroundColor: '#F0F4FF',
      backgroundColor: '#36C15E',
      opacity: 0.7,
      // borderColor: '#DDE5FD',
      borderColor: '#7ADA97',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 6,
      minHeight: 25,
      flex: 1,
      paddingTop: 5,
      paddingBottom: 0,
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflow: 'hidden',
      ...theme.event,
    },
    eventTitle: {
      color: 'white',
      fontWeight: '600',
      minHeight: 15,
      ...theme.eventTitle,
    },
    eventSummary: {
      color: 'white',
      fontSize: 12,
      flexWrap: 'wrap',
      overflow: 'hidden',
      ...theme.eventSummary,
    },
    eventTimes: {
      marginTop: 3,
      fontSize: 10,
      fontWeight: 'bold',
      color: 'white',
      flexWrap: 'wrap',
      ...theme.eventTimes,
    },
    line: {
      height: 1,
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'rgb(216,216,216)',
      ...theme.line,
    },
    lineNow: {
      height: 1,
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'red',
      ...theme.lineNow,
    },
    timeLabel: {
      position: 'absolute',
      left: 10,
      color: 'rgb(170,170,170)',
      fontSize: 10,
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
      fontWeight: '500',
      ...theme.timeLabel,
    },
  };
  return StyleSheet.create(style);
}
