import React from "react"
import LottieView from "lottie-react-native"

type LottieAnimationProps = {
  source: string
  boxSize?: number
  height?: number
  width?: number | string
}
const LottieAnimation = ({
  source,
  boxSize,
  height,
  width,
}: LottieAnimationProps) => {
  const [animation, setAnimation] = React.useState<any>()

  React.useEffect(() => {
    if (animation) {
      animation.play()
    }
  }, [animation])

  if (boxSize) {
    height = boxSize
    width = boxSize
  }
  return (
    <LottieView
      ref={(animation) => {
        setAnimation(animation)
      }}
      style={{
        width: width,
        height: height,
      }}
      source={source}
    />
  )
}

LottieAnimation.defaultProps = {
  source: "",
  height: 400,
  width: 400,
}
export default LottieAnimation
