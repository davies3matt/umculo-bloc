import React, { useRef } from "react"
import { Animated } from "react-native"

const SlideRightView: React.FC = ({ children }) => {
  const translateAnim = useRef(new Animated.Value(-100)).current

  React.useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [translateAnim])

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        transform: [{ translateX: translateAnim }],
      }}
    >
      {children}
    </Animated.View>
  )
}

export default SlideRightView
