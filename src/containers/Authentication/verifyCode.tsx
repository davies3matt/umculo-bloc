import { Input, Stack, Center, Heading, Icon, Button, Link } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Auth } from "aws-amplify"
import { formatPhoneNumber } from "../../utils/helpers"
import { NavigationProps } from "./Login"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

interface Props extends NavigationProps {
  username?: string
}
const VerifyCode = ({ navigation, username }: Props): JSX.Element => {
  interface ConfirmDetails {
    username: string
    code: string
  }

  const handleConfirmCode = async (values: ConfirmDetails) => {
    try {
      await Auth.confirmSignUp(formatPhoneNumber(values.username), values.code)
      navigation.navigate("Login")
    } catch (error) {
      console.log(error)
    }
  }

  const [verifyDetails, setVerifyDetails] = React.useState({
    username: "",
    code: "",
  })
  return (
    <View style={styles.container}>
      <Stack
        space={4}
        w={{
          base: "75%",
          md: "25%",
        }}
      >
        <Center>
          <Heading textAlign="center" mb="10">
            Verification
          </Heading>
        </Center>
        <Input
          variant="rounded"
          size="2xl"
          placeholder="Mobile Number"
          value={username}
          onChangeText={(text) =>
            setVerifyDetails({
              ...verifyDetails,
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
          placeholder="Verification Code"
          onChangeText={(text) =>
            setVerifyDetails({
              ...verifyDetails,
              code: text,
            })
          }
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
        />
        <Button
          variant="subtle"
          onPress={() => handleConfirmCode(verifyDetails)}
        >
          Login
        </Button>
      </Stack>
      <Link
        onPress={() => navigation.navigate("SignUp")}
        style={{ marginTop: "5%" }}
      >
        Create Account
      </Link>
    </View>
  )
}

export default VerifyCode
