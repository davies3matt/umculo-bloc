import { Animated } from "react-native"

export const invalidShake = (translateAnim) => {
  Animated.sequence([
    Animated.timing(translateAnim, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(translateAnim, {
      toValue: -10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start()
}
export const gestureRight = (translateAnim) => {
  Animated.sequence([
    Animated.timing(translateAnim, {
      toValue: 20,
      duration: 350,
      useNativeDriver: true,
    }),
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }),
  ]).start()
}
