import { 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal, 
    ModalBody,
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    useDisclosure 
} from "@chakra-ui/react"
import React, { useState } from "react"
import { PaystackButton } from "react-paystack";

export default function InitialFocus(props) {
    const { isOpen, onOpen, onClose } = useDisclosure(props.open)
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const publicKey = "pk_test_d24a6339f95ff54a95d575e9f02c795ddd5e9d4c";
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState(props.amount);

    const componentProps = {
        email,
        amount,
        custom_fields: {
          name,
          phone,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () =>
          alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
      }
  
    return (
      <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}
    
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Pay Now</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input ref={initialRef} placeholder='Name' onChange={(e) => setName(e.currentTarget.value)} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input placeholder='test@example.com' onChange={(e) => setEmail(e.currentTarget.value)} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Phone</FormLabel>
                <Input placeholder='073 467 46787' onChange={(e) => setPhone(e.currentTarget.value)} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <PaystackButton {...componentProps} />
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }