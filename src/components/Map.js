import { View, StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const HomeMap = () => {
  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true} 
        region={{
          latitude: 5.6584203,
          longitude: -0.1809616,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{ latitude: 5.6544203, longitude: -0.1869616 }}   
        />
      </MapView>
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  map: {
    height: SCREEN_HEIGHT-230,
    width: "100%"
  },
})