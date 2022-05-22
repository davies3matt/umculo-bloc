import {
  Input,
  Stack,
  Center,
  Heading,
  Icon,
  Button,
  Link,
  InputLeftAddon,
  InputGroup,
  Text,
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { TouchableWithoutFeedback, Keyboard } from "react-native"
import { Auth } from "aws-amplify"
// TODO: implement
// import { formatPhoneNumber } from "../../utils/helpers"
import { NavigationProps } from "./Login"
import SlideRightView from "../../components/SlideRightView"

interface SignUpProps {
  phoneNumber: string
  email: string
  password: string
}
const SignUp = ({ navigation }: NavigationProps): JSX.Element => {
  const handleSignUp = async (values: SignUpProps) => {
    const { phoneNumber, email, password } = values
    try {
      const user = await Auth.signUp({
        username: phoneNumber,
        password: password,
        attributes: {
          email: email,
          phone_number: phoneNumber,
        },
      })
      console.log(user)
      navigation.navigate("VerifyCode", { username: phoneNumber })
    } catch (err) {
      console.log(err)
    }
  }

  const [userDetails, setUserDetails] = React.useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })
  const [visibility, setVisibility] = React.useState(false)
  return (
    <SlideRightView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <Stack
            space={4}
            w={{
              base: "75%",
              md: "25%",
            }}
          >
            <Center>
              <Heading textAlign="center" mb="10" color="primary.200">
                Sign Up
              </Heading>
            </Center>
            <InputGroup>
              <InputLeftAddon
                children={<Text color="primary.700">🇿🇦 +27</Text>}
                backgroundColor="primary.200"
                color="white"
              />
              <Input
                w={{
                  base: "80%",
                  md: "100%",
                }}
                color="accent.200"
                size="2xl"
                placeholder="Mobile Number"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                onChangeText={(text) => {
                  setUserDetails({
                    ...userDetails,
                    phoneNumber: text.replace(/[1-9][^0-9+]/g, ""),
                  })
                }}
              />
            </InputGroup>
            <Input
              size="2xl"
              color="accent.200"
              placeholder="Email"
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(text) => {
                setUserDetails({
                  ...userDetails,
                  email: text,
                })
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="email" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
            <Input
              size="2xl"
              color="accent.200"
              placeholder="Password"
              textContentType="password"
              onChangeText={(text) =>
                setUserDetails({
                  ...userDetails,
                  password: text,
                })
              }
              type={visibility ? "" : "password"}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              InputRightElement={
                <Icon
                  style={{ marginRight: "5%" }}
                  onPress={() => setVisibility(!visibility)}
                  as={
                    <MaterialIcons
                      name={visibility ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />

            <Button variant="subtle" onPress={() => handleSignUp(userDetails)}>
              Sign Up
            </Button>
          </Stack>
          <Link
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: "5%" }}
          >
            Login
          </Link>
        </>
      </TouchableWithoutFeedback>
    </SlideRightView>
  )
}

export default SignUp
