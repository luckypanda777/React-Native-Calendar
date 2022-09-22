import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import EventCalendar from '../../scheduler/EventCalendar';
let { width } = Dimensions.get('window');

export default class DailyScheduler extends React.Component {
    constructor(props) {
        super(props);
    }

    _eventTapped(event) {
        alert(JSON.stringify(event));
    }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.props.events}
          width={width}
          initDate={Date.now()}
          scrollToFirst
          upperCaseHeader
          uppercase
        />
      </View>
    )
  }
}