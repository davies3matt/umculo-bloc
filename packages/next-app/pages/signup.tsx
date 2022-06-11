import { FC, default as React, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Flex,
  useDisclosure,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  Image
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import { useAuthContext } from "../src/context/AuthProvider";
import ConnectedFormGroup from "../components/ConnectedFormGroup";
import ConnectedPasswordGroup from "../components/ConnectedPasswordGroup"
import theme from "../src/theme";

const validationSchema = yup.object({
  email: yup
    .string()
    .email('This is not a valid email address. Please use a valid email address.')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Invalid password. Please ensure password contains capital letters/ numbers and special characters'
    )
})

const Register: FC = () => {
  const router = useRouter()
  const { register, confirm } = useAuthContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [confirmationPin, setConfirmationPin] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  
  const handleConfirmPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmationPin(value)
  }
  
  const handleSubmitConfirmationPin = async () => {
    try {
      if (!!confirmationPin) {
        await confirm(userEmail, confirmationPin)
        onClose()
        await router.push('/login')
      }
    } catch (e) {
      console.log(e)
      onClose()
    }
  }
  
  return (
    <Flex
      width="100%"
      height="100vh"
      align="center"
      textAlign="center"
      fontSize="14px"
      pt={{ base: 0, md: 4 }}
      bg={theme.colors.purple}
      color="white"
      direction="column"
    >
      <Image src="/assets/images/umculo-bloc-logo.png"/>
      <Flex width={{ base: '90%', md: '40%' }}>
        <Formik
          enableReinitialize
          initialValues={
            {
              email: '',
              password: '',
            }
          }
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true)
              
              setUserEmail(values.email)
              
              await register(values.email, values.password)
              
              setSubmitting(false)
              
              onOpen()
            } catch (e) {
              setSubmitting(false)
              console.log(e)
            }
          }}
        >
          {(props): any => (
            <Form
              style={{ width: '100%' }}
              onSubmit={props.handleSubmit}
            >
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
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay/>
        <ModalContent
          textAlign="center"
          alignItems="center"
          py="2rem"
          borderRadius="24px"
          width="90%"
          border="1px solid white"
        >
          <Flex direction="column">
            <Text fontWeight={700} mb={4}>Enter Email Confirmation PIN</Text>
            <Input
              type="text"
              bgColor="white"
              border="1px solid black"
              value={confirmationPin}
              onChange={handleConfirmPinChange}
              mb={4}
            />
            <Button
              w="100%"
              mt={4}
              type="submit"
              bg="black"
              color={theme.colors.purple}
              onClick={handleSubmitConfirmationPin}
            >
              OK
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Register
