import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    Tag,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  
  const Logo = (props: any) => {
    return (
      <img width={'50px'} src='/assets/Umcolo.png'/>
    );
  };
  
  const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };
  
  export default function Footer() {
    return (
      <Box
        width={'100%'}
        bg={'#0B0B0D'}
        color={'white'}>
        <Container as={Stack} maxW={'100ch'} width={'100%'} py={10}>
            <Text fontWeight={'500'} fontSize={'40px'}>
            Shape the NFT Musi
            </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={'flex-start'}>
              <Link href={'https://www.facebook.com/Umculobloc-110125468393331'} target='_blank'>Facebook</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <Link href={'https://www.instagram.com/umculobloc/'}>Instagram</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <Link href={'https://twitter.com/UmculoBloc'}>Twitter</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <Link href={'#'}>Contact</Link>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}>
            <Logo />
          </Flex>
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © 2022 Umculo Bloc. All rights reserved
          </Text>
        </Box>

      <style jsx>{`
        .css-1umijpm {
          max-wdth: 120ch !important;
        }
      `}</style>
      </Box>
    );
  }