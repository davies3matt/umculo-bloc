import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { IoArrowForward } from 'react-icons/io5';
import Stats from "./Stats";

export default function Hero() {
  return (
    <Flex direction="column" background={'linear-gradient(261.63deg,  #0B0B0D 4.87%, #FB03F5 87.02%)'}>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} pr={0} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Flex direction="column" mb={8}>
              <Flex color="white">
                <Flex flex={1} direction="column" justify="center">
                  <Flex flex={1} align="flex-end">
                    <Text fontSize={'4xl'} fontWeight={'bold'}>
                      400 artists
                    </Text>
                  </Flex>
                  <Flex flex={1} align="flex-start">
                    <Box fontSize={'sm'}>
                      from under-priveledged backgrounds have attended our 6 week music course.*
                    </Box>
                  </Flex>
                </Flex>
                <Flex flex={1} direction="column" height="100%" justify="center">
                  <Flex flex={1} align="flex-end">
                    <Text fontSize={'4xl'} fontWeight={'bold'}>
                      R658k
                    </Text>
                  </Flex>
                  <Flex flex={1} align="flex-start">
                    <Box fontSize={'sm'}>
                      injected into under-priveledged communities to encourage young artists to grow.*
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
              <Text mt={2} color="black" fontWeight={700} fontSize={16}>*This is how you have helped by purchasing on
                our
                platform.</Text>
            </Flex>
            <Flex direction="column" mt={8}>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <br/>{' '}
                <Text color={'white'} as={'span'}>
                  Empowering the African Music Scene
                </Text>{' '}
              </Heading>
              <Text mt={4} fontSize={{ base: 'md', lg: 'lg' }} color={'#FFFFFF'}>
                UmculoBloc's core focus is two-fold - put the power of music into the hands of emerging musicians and
                well-established musicians by creating a marketplace that is driven by Web3 technologies, and to build up the African music scene by giving back through upliftment plans that are funded through UmculoBloc.
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button>Discover More <Icon left={3} as={IoArrowForward} color={'black.500'} w={5} h={5}
                                            rounded={'full'}></Icon></Button>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
        <Flex flex={1} align="center">
          <Image
            alt={'Login Image'}
            // objectFit={'cover'}
            src={'/assets/hero.png'}
            height={'80%'}
          />
        </Flex>
      </Stack>
    </Flex>
  );
}
