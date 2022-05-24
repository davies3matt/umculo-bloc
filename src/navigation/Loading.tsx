import LottieView from "lottie-react-native"
import React, { useRef } from "react"
import { Animated } from "react-native"
import { useAuthContext } from "../contexts/AuthContext"
import { animations } from "../theme"
import { slideOut } from "../theme/animations"

const Loading = (): JSX.Element => {
  const [animation, setAnimation] = React.useState<any>()
  const { authData, updateIsAuthenticating } = useAuthContext()
  const translateAnim = useRef(new Animated.Value(-100)).current
  React.useEffect(() => {
    if (animation) {
      animation.play()
    }
  }, [animation])
  React.useEffect(() => {
    if (authData.token) {
      slideOut(translateAnim, () => updateIsAuthenticating(false))
    }
  }, [authData])
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
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateX: translateAnim }],
      }}
    >
      <LottieView
        ref={(animation) => {
          setAnimation(animation)
        }}
        style={{
          width: 400,
          height: 400,
          marginTop: 50,
        }}
        source={animations.paper_plane}
      />
    </Animated.View>
  )
}

export default Loading
