import {
  Container,
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';

function Stats() {
  return (
    <Container
      w="100%"
      maxWidth="unset"
      pb={12}
    >
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
          <Flex direction="column" height="100%" align="center">
            <Flex flex={1}/>
            <Flex flex={1} align="flex-start">
              <Heading as={'h2'}>How you have helped<br/> by using our platform</Heading>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem w="100%" color="white">
          <Flex direction="column" height="100%" justify="center">
            <Flex flex={1} align="flex-end">
              <Text fontSize={'4xl'} fontWeight={'bold'}>
                400 artists
              </Text>
            </Flex>
            <Flex flex={1} align="flex-start">
              <Box fontSize={'sm'}>
                from under-priveledged backgrounds
              </Box>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem w="100%" color="white">
          <Flex direction="column" height="100%" justify="center">
            <Flex flex={1} align="flex-end">
              <Text fontSize={'4xl'} fontWeight={'bold'}>
                R658k
              </Text>
            </Flex>
            <Flex flex={1} align="flex-start">
              <Box fontSize={'sm'}>
                injected into under-priveledged communities to encourage young artists to grow.
              </Box>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Stats;
