import { ReactNode } from 'react';
import { useWeb3React } from "@web3-react/core";

import { ContractFactory } from "@ethersproject/contracts";

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
} from '@chakra-ui/react';
import tier1 from '../../contracts/UmculoTier1.json';
import tier2 from '../../contracts/UmculoTier2.json';
import tier3 from '../../contracts/UmculoTier3.json';
import { FaCheckCircle } from 'react-icons/fa';

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

  return (
    <Box py={12}>
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
        <PriceWrapper>
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
              <Button w="full" colorScheme="red" variant="outline">
                Purchase
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
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
                <Button w="full" colorScheme="red">
                  Purchase
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
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
              <Button w="full" colorScheme="red" variant="outline">
                Purchase
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}