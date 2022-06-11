import { ReactNode, useEffect, useRef, useState } from 'react';
import { useWeb3React } from "@web3-react/core";

import { ContractFactory } from "@ethersproject/contracts";
import { 
  FormControl, 
  FormLabel, 
  Input, 
  Modal, 
  ModalBody,
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay
} from "@chakra-ui/react";
import { PaystackButton } from "react-paystack";

import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import tier1 from '../../contracts/UmculoTier1.json';
import tier2 from '../../contracts/UmculoTier2.json';
import tier3 from '../../contracts/UmculoTier3.json';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

export default function ThreeTierPricing() {
const { account, library } = useWeb3React();
const { isOpen, onOpen, onClose } = useDisclosure()
  
const initialRef = useRef(null)
const finalRef = useRef(null)
const publicKey = "pk_test_d24a6339f95ff54a95d575e9f02c795ddd5e9d4c";
const [email, setEmail] = useState('');
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [amount, setAmount] = useState(0);
const currency = 'ZAR';
const router = useRouter();

const componentProps = {
  email,
  amount,
  currency,
  custom_fields: {
    name,
    phone,
  },
  publicKey,
  text: "Pay Now",
  onSuccess: () => onClose(),
  onClose: () => console.log(amount),
}

const deployContract = async(tier)=>{
  // ABI description as JSON structure
  let abi;
  let bytecode;
  if(tier == 1){
   abi = tier1.abi;
   bytecode = tier1.bin;
  }else if (tier == 2){
   abi = tier2.abi;
   bytecode = tier2.bin;
  }else if (tier == 3){
   abi = tier3.abi;
   bytecode = tier3.bin;
  }

  // Smart contract EVM bytecode as hex
  // Create Contract proxy class
  let factory = await new ContractFactory(abi, bytecode, library.getSigner(account));
  const contract = await factory.deploy('SnoopDogg', 'SNOOP');
  console.log(contract.address)
  //store in db
}

const checkRoute = async () => {
  const path = router.pathname;
  if (path === '/') {
    await router.push('/login')
  }
}

  return (
    <Box py={12} padding={10}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Tiers that fit your pockets
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Purchase anytime
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        <PriceWrapper key={1}>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Tier 1
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                R
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                2000
              </Text>
            </HStack>
          </Box>
          <VStack
            bg="linear-gradient(180deg, #FB03F5 0%, #AA9CFF 100%);"
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                🎵 The Song of the Season;
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                👀 Exclusive audio
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                ⏰ Early Access and 
                Behind-the-Scenes
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button onClick={(e) => (checkRoute(), onOpen(), setAmount(200000))} w="full" colorScheme="red" variant="outline">
                Purchase
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper key={2}>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('red.300', 'red.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Tier 2
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  R
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  4000
                </Text>
              </HStack>
            </Box>
            <VStack
              bg="linear-gradient(180deg, #FB03F5 0%, #AA9CFF 100%);"
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  🗣 Your name on-screen in an Instagram shout-out
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  👕 Discounts on all Official Merchandise
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  🚪 Access to the Beastlings Lair on Discord
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  ☑️ Voting rights in upcoming projects
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  🎵 The Song of The Season and all the benefits of Bronze, too!
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button onClick={(e) => (checkRoute(), onOpen(), setAmount(400000))} w="full" colorScheme="red">
                  Purchase
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper key={3}>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Tier 3
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                R
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                6000
              </Text>
            </HStack>
          </Box>
          <VStack
            bg="linear-gradient(180deg, #FB03F5 0%, #AA9CFF 100%);"
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                🎟 Ticket into monthly Virtual Meet & Greets
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                📺 My complete archive of previous streams to watch
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                🎵 Song of The Season & benefits of Bronze & Silver
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button onClick={(e) => (checkRoute(), onOpen(), setAmount(600000))} w="full" colorScheme="red" variant="outline">
                Purchase
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>

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
    </Box>
  );
}