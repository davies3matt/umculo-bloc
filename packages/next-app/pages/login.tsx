import { FC, default as React } from "react"
import { useRouter } from "next/router"
import { Flex, Button, Image } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import * as yup from "yup"

import { useAuthContext } from "../src/context/AuthProvider"
import ConnectedFormGroup from "../components/ConnectedFormGroup"
import ConnectedPasswordGroup from "../components/ConnectedPasswordGroup"
import theme from "../src/theme"

const validationSchema = yup.object({
  email: yup
    .string()
    .email(
      "This is not a valid email address. Please use a valid email address."
    )
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Invalid password. Please ensure password contains capital letters/ numbers and special characters"
    ),
})

const Login: FC = () => {
  const { login } = useAuthContext()
  const router = useRouter()

  return (
    <Flex
      width="100%"
      minHeight="100vh"
      align="center"
      textAlign="center"
      fontSize="14px"
      pt={{ base: 0, md: 4 }}
      bg={theme.colors.purple}
      color="white"
      direction="column"
    >
      <Image src="/assets/images/umculo-bloc-logo.png" />
      <Flex width={{ base: "90%", md: "40%" }}>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true)

              await login(values.email, values.password)

              await router.push("/dashboard")

              /**
               * Redirect to relevant page
               */

              setSubmitting(false)
            } catch (e) {
              setSubmitting(false)
              console.log(e)
            }
          }}
        >
          {(props): any => (
            <Form style={{ width: "100%" }} onSubmit={props.handleSubmit}>
              <ConnectedFormGroup
                name="email"
                placeholder="Enter your Email address"
                label="Email"
                bg="transparent"
                mb={4}
              />
              <ConnectedPasswordGroup
                name="password"
                label="Password"
                placeholder="Enter your Password"
                bg="transparent"
              />
              <Button
                w="100%"
                mt={4}
                type="submit"
                isLoading={props.isSubmitting}
                bg="black"
                color={theme.colors.purple}
                marginBottom={100}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  )
}

export default Login
