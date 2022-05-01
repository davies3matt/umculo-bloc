import {
  Input,
  Stack,
  Center,
  Heading,
  Icon,
  Button,
  Link,
  Image,
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { useAuthContext } from "../../contexts/AuthContext"
import { formatPhoneNumber } from "../../utils/helpers"
import SlideRightView from "../../components/SlideRightView"

export interface NavigationProps {
  navigation: any
}
interface LoginDetails {
  username: string
  password: string
}
const Login = ({ navigation }: NavigationProps): JSX.Element => {
  // context
  const { signIn } = useAuthContext()

  // states
  const [isLoading, setIsLoading] = React.useState(false)
  const [visibility, setVisibility] = React.useState(false)
  const [loginDetails, setLoginDetails] = React.useState<LoginDetails>({
    username: "",
    password: "",
  })

  // use effect that watches the isLoading state to trigger a loading state
  // while awaiting the cognito sign in request
  React.useEffect(() => {
    if (isLoading) {
      signIn({
        username: formatPhoneNumber(loginDetails.username),
        password: loginDetails.password,
      })
    }
  }, [isLoading])

  // screen
  return (
    <SlideRightView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Stack
          space={4}
          w={{
            base: "75%",
            md: "25%",
          }}
        >
          <Image
            width={500}
            height={100}
            source={require("../../../assets/Images/house-board.png")}
            alt="house-board-logo"
          />
          <Center>
            <Heading textAlign="center" mb="10">
              Login
            </Heading>
          </Center>
          <Input
            variant="rounded"
            size="2xl"
            placeholder="Mobile Number"
            onChangeText={(text) =>
              setLoginDetails({
                ...loginDetails,
                username: text,
              })
            }
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
          <Input
            variant="rounded"
            size="2xl"
            placeholder="Password"
            onChangeText={(text) =>
              setLoginDetails({
                ...loginDetails,
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
          <Button
            variant="subtle"
            onPress={() => setIsLoading(true)}
            isLoading={isLoading}
            isLoadingText="Submitting"
          >
            Login
          </Button>
        </Stack>
      </TouchableWithoutFeedback>
      <Link
        onPress={() => navigation.navigate("SignUp")}
        style={{ marginTop: "5%" }}
      >
        Create Account
      </Link>
      <Link
        onPress={() => navigation.navigate("VerifyCode")}
        style={{ marginTop: "5%" }}
      >
        Verify Account
      </Link>
    </SlideRightView>
  )
}

export default Login
