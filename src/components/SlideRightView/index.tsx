import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const SlideRightView: React.FC<any> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const translateAnim = useRef(new Animated.Value(-100)).current

  React.useEffect(() => {
    Animated.timing(
      translateAnim,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }
    ).start()
  }, [translateAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        // opacity: fadeAnim,         // Bind opacity to animated value
        transform: [{translateX: translateAnim}]
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default SlideRightView;