import {
    Button,
    Flex,
    Heading,
    Icon,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { IoArrowForward } from 'react-icons/io5';
  
  export default function Hero() {
    const [open, setOpen] = useState(false);
    return (
      <Stack background={'linear-gradient(261.63deg,  #0B0B0D 4.87%, #FB03F5 87.02%)'} minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={700}>
              <Text
                as={'span'}
                position={'relative'}
                color={'white'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  color:'white',
                  bg: 'blue.400',
                  zIndex: -1,
                }}>
                    Purchase NFT’s with various Options that have different benefits.
              </Text>
            </Heading>
            <Text fontSize={'20px'} fontWeight={600} color={'white'} as={'span'}>
                Your NFT, whether it might be a single song or Album can be traded on any platform that still maintains the continuation of revenue towards the artist.
            </Text>
            <Text fontSize={{ base: 'md', lg: 'lg' }} fontWeight={400} color={'#FFFFFF'}>
                UmculoBloc's core focus is to put the power of music into 
                the hands of emerging musicians and well-established musicians
                by creating a marketplace that is driven by Web3 technologies such as 
                Blockchain, Ethereum and upliftment plans that are funded through UmculoBloc.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button cursor='pointer'>Discover More <Icon left={3} as={IoArrowForward} color={'black.500'} w={5} h={5} rounded={'full'}></Icon></Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={'/assets/hero.png'}
            width={'99%'}
          />
        </Flex>
      </Stack>
    );
  }