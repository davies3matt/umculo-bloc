import React, { useState } from "react"
import LottieView from "lottie-react-native"
import { Button } from "native-base"
import SlideRightView from "../../components/SlideRightView"
import { useAuthContext } from "../../contexts/AuthContext"
import { animations } from "../../theme"

interface Props {
  navigation: any
}
const Dashboard = ({ navigation }: Props): JSX.Element => {
  const [animation, setAnimation] = useState<any>()
  const { signOut } = useAuthContext()

  React.useEffect(() => {
    if (animation) {
      animation.play()
    }
  }, [animation])
  return (
    <SlideRightView>
      <LottieView
        ref={(animation) => setAnimation(animation)}
        style={{
          width: 400,
          height: 400,
        }}
        source={animations.paper_plane}
      />

      <Button onPress={() => navigation.navigate("Groups")}>Groups</Button>
      {/* <Spacer /> */}
      <Button onPress={() => signOut()}>Logout</Button>
    </SlideRightView>
  )
}

export default Dashboard
