import { Heading, Stack } from "native-base"
import React from "react"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import SlideRightView from "../../components/SlideRightView"

const Profile = () => {
  return (
    <SlideRightView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Stack>
          <Heading textAlign="center" mb="10" color="primary.200">
            Complete your profle
          </Heading>
        </Stack>
      </TouchableWithoutFeedback>
    </SlideRightView>
  )
}

export default Profile
