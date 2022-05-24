import React, { useRef } from "react"
import { Animated, KeyboardAvoidingView } from "react-native"
import { theme } from "../../theme"

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
        backgroundColor: theme.colors.secondary[400],
        transform: [{ translateX: translateAnim }],
      }}
    >
      <KeyboardAvoidingView
        style={{
          width: "100%",
        }}
        behavior="padding"
      >
        {children}
      </KeyboardAvoidingView>
    </Animated.View>
  )
}

export default SlideRightView
