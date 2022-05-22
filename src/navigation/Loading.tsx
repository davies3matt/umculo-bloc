import LottieView from "lottie-react-native"
import React from "react"
import SlideRightView from "../components/SlideRightView"
import { animations } from "../theme"

const Loading = (): JSX.Element => {
  const [animation, setAnimation] = React.useState<any>()

  React.useEffect(() => {
    if (animation) {
      animation.play()
    }
  }, [animation])
  return (
    <SlideRightView>
      <LottieView
        ref={(animation) => {
          setAnimation(animation)
        }}
        style={{
          width: 400,
          height: 400,
        }}
        source={animations.paper_plane}
      />
    </SlideRightView>
  )
}

export default Loading
