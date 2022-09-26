import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";

const Draggable = (props) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
        pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
        });
    },
    onPanResponderMove: Animated.event(
        [
        null,
        { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver: false}
    ),
    onPanResponderRelease: () => {
        pan.flattenOffset();
    }
    })
  ).current;

  return (
    <Animated.View
        style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
    >
        <View>
            <Text> Please drag me </Text> 
        </View>
    </Animated.View>
  );
}

export default Draggable

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});