import { ReactNode, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { Contract } from "@ethersproject/contracts";
import { ContractFactory } from "@ethersproject/contracts"

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
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Input,
} from "@chakra-ui/react"
import tier1 from "../../contracts/UmculoTier1.json"
import tier2 from "../../contracts/UmculoTier2.json"
import tier3 from "../../contracts/UmculoTier3.json"
import { FaCheckCircle } from "react-icons/fa"
import {
  useGetArtistLazyQuery,
  useGetUserQuery,
  useListArtistsLazyQuery,
  useUpdateArtistMutation,
} from "../../src/generated/graphql"
import React from "react"
import { useAuthContext } from "../../src/context/AuthProvider"
import { Formik } from "formik"
import useEagerConnect from "../../hooks/useEagerConnect"
import Account from "../Account"
import { add } from "lodash"

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  )
}

const Tiers = ({artistUser}) => {
  console.log('userar',artistUser)
  const { account, library } = useWeb3React()
  const triedToEagerConnect = useEagerConnect()
  const isConnected = typeof account === "string" && !!library
  console.log("library", library)
  console.log(account)
  const { user } = useAuthContext()
  const [artist, setArtist] = useState<any>({})
  const [tier, setTier] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [getArtist, { data, loading }] = useListArtistsLazyQuery()
  
  const [tierOwnership, setTierOwnership] = useState({
    tier1:false,
    tier2:false,
    tier3:false
  })

  React.useEffect(() => {
    console.log('UseEffectAccount', account)
    console.log('UseEffectArtist', artist)
    const getBalances =async ()=>{
      let balance1 = 0
      let balance2 = 0
      let balance3 = 0
      if(artist.tier1){
         balance1 = await getBalance(artist.tier1,1)
         balance1 = Number(balance1)

      }
      if(artist.tier2){
         balance2 = await getBalance(artist.tier2,2)
         balance2 = Number(balance2)

      }
      if(artist.tier3){
         balance3 = await getBalance(artist.tier3,3)
         balance3 = Number(balance3)
      }
      setTierOwnership({
        tier1:balance1,
        tier2:balance2,
        tier3:balance3,
      })
    } 
    getBalances()
  }, [account, artist])


  React.useEffect(() => {
    if (data?.listArtists?.items?.length > 0) {
      setArtist(data.listArtists.items[0])
    }
  }, [data])
  const [updateArtist, { loading: updatingArtist }] = useUpdateArtistMutation({
    onError: (err) => {
      console.log("ERROR ☁ ", err)
    },
    onCompleted: (data) => setArtist(data.updateArtist),
  })
  React.useEffect(() => {
    console.log("USER", user)
    console.log("Artist", artist)

    if(artistUser && artistUser && artistUser.userId){
      console.log(artistUser)
      getArtist({
        variables: {
          filter: {
            userId: { eq: artistUser.userId },
          },
        },
      })
    }else   if (user?.username) {
      getArtist({
        variables: {
          filter: {
            userId: { eq: user.username },
          },
        },
      })
    }
  }, [user, artist,artistUser])
  const deployContract = async (tier, { collectionName, symbol }) => {
    // ABI description as JSON structure
    let abi
    let bytecode
    if (tier == 1) {
      abi = tier1.abi
      bytecode = tier1.bin
    } else if (tier == 2) {
      abi = tier2.abi
      bytecode = tier2.bin
    } else if (tier == 3) {
      abi = tier3.abi
      bytecode = tier3.bin
    }

    //expand hotel twenty dragon dumb sword spy such improve knife eye scale

    // Smart contract EVM bytecode as hex
    // Create Contract proxy class
    let factory = await new ContractFactory(
      abi,
      bytecode,
      library.getSigner(account)
    )
    const contract = await factory.deploy(collectionName, symbol)
    console.log("Contract ⬇ ", contract)
    try {
      let input: any = {
        id: artist.id,
      }
      if (tier === 1) {
        input = {
          ...input,
          tier1: contract.address,
        }
      }
      if (tier === 2) {
        input = {
          ...input,
          tier2: contract.address,
        }
      }
      if (tier === 3) {
        input = {
          ...input,
          tier3: contract.address,
        }
      }
      console.log("THIS IS THE INPUT", input)
      console.log(contract.address)
      await updateArtist({
        variables: {
          input: input,
        },
      })
    } catch (err) {
      console.log(err)
    }
    setIsOpen(false)
    //store in db
  }

  const buyNft = async (address,tier)=>{
    console.log(address)
    let abi;
    let value
    if(tier == 1){
      abi = tier1.abi;
      value =  "50000000000000000"
    }else if(tier == 2){
      abi = tier2.abi;
      value =  "100000000000000000"
    }else{
      abi = tier3.abi
      value =  "350000000000000000"
    }
    let contract =  new Contract(address, abi, library.getSigner(account));
    contract.safeMint(account,'ipfs://bafyreia3vtyh45uxw4mqms4hkxz4ws27tit7w6vzgsndqti62ggprhrjfm/metadata.json',{value: value});
  }
  // const checkRoute = async () => {
  //   const path = router.pathname;
  //   if (path === '/') {
  //     await router.push('/login')
  //   }
  // }
  const getBalance = async (add,tier)=>{
    let abi;
    if(tier == 1){
      abi = tier1.abi;
    }else if(tier == 2){
      abi = tier2.abi;
    }else{
      abi = tier3.abi
    }
    let contract =  new Contract(add, abi, library.getSigner(account));
  return contract.balanceOf(account).then((res)=>{
    return res
   })
  }
  console.log(tierOwnership)
  return (
    <Box py={12} padding={10}>
      <VStack spacing={2} textAlign="center">
        \
        <Heading as="h1" fontSize="4xl">
          <Account triedToEagerConnect={triedToEagerConnect} />
          {artist?.name}
        </Heading>
        <Heading as="h1" fontSize="4xl">
          Tiers that fit your fan's pocketses
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Purchase anytime
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
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
            borderBottomRadius={"xl"}
          >
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
                <ListIcon as={FaCheckCircle} color="green.500" />⏰ Early Access
                and Behind-the-Scenes
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
            {artist?.tier1 ? tierOwnership.tier1 ? 
                          <Button
                          w="full"
                          colorScheme="red"
                          variant="outline"
                          disabled
                        >
                          Already Owned
                        </Button> 
            :
              <Button
                w="full"
                colorScheme="red"
                variant="outline"
                isLoading={loading}
                onClick={() => {
                  buyNft(artist.tier1, 1)
                }}
              >
                Buy
              </Button> :             
               <Button
                w="full"
                colorScheme="red"
                variant="outline"
                isLoading={loading}
                onClick={() => {
                  setTier(1)
                  setIsOpen(true)
                }}
              >
                Enable
              </Button> }

            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper key={2}>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: "translate(-50%)" }}
            >
              <Text
                textTransform="uppercase"
                bg={useColorModeValue("red.300", "red.700")}
                px={3}
                py={1}
                color={useColorModeValue("gray.900", "gray.300")}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
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
              borderBottomRadius={"xl"}
            >
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
              {artist?.tier2 ?     tierOwnership.tier2 ? 
                          <Button
                          w="full"
                          colorScheme="red"
                          variant="outline"
                          disabled
                        >
                          Already Owned
                        </Button> 
            :        
              <Button
                w="full"
                colorScheme="red"
                variant="outline"
                isLoading={loading}
                onClick={() => {
                  buyNft(artist.tier2,2)
                }}
              >
                Buy
              </Button> :             
               <Button
                w="full"
                colorScheme="red"
                variant="outline"
                isLoading={loading}
                onClick={() => {
                  setTier(2)
                  setIsOpen(true)
                }}
              >
                Enable
              </Button> }
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
            borderBottomRadius={"xl"}
          >
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
            {artist?.tier3 ?    
            tierOwnership.tier3 ?
            <Button
            w="full"
            colorScheme="red"
            variant="outline"
            disabled
          >
            Already Owned
          </Button> 
:               
              <Button
                w="full"
                colorScheme="red"
                variant="outline"
                isLoading={loading}
                onClick={() => {
                  buyNft(artist.tier3,3)
                }}
              >
                Buy
              </Button> :             
               <Button
                w="full"
                colorScheme="red"
                variant="outline"
                isLoading={loading}
                onClick={() => {
                  setTier(3)
                  setIsOpen(true)
                }}
              >
                Enable
              </Button> }
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
      <Modal onClose={() => setIsOpen(!isOpen)} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          textAlign="center"
          alignItems="center"
          py="2rem"
          borderRadius="24px"
          width="90%"
          border="1px solid white"
        >
          <Formik
            initialValues={{
              collectionName: "",
              symbol: "",
            }}
            onSubmit={(vals) => deployContract(tier, { ...vals })}
          >
            {({ values, setFieldValue, isSubmitting, handleSubmit }) => (
              <Flex direction="column">
                <Text fontWeight={700} mb={4}>
                  Enter Collection Name
                </Text>
                <Input
                  type="text"
                  bgColor="white"
                  border="1px solid black"
                  value={values.collectionName}
                  onChange={(e) =>
                    setFieldValue("collectionName", e.target.value)
                  }
                  mb={4}
                />
                <Text fontWeight={700} mb={4}>
                  Enter Symbol Name
                </Text>
                <Input
                  type="text"
                  bgColor="white"
                  border="1px solid black"
                  value={values.symbol}
                  onChange={(e) => setFieldValue("symbol", e.target.value)}
                  mb={4}
                />
                <Button
                  w="100%"
                  mt={4}
                  type="submit"
                  bg="black"
                  onClick={() => handleSubmit()}
                  isLoading={isSubmitting}
                >
                  OK
                </Button>
              </Flex>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Tiers
