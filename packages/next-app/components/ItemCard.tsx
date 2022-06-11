import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { colors } from "../src/theme"
import { useRouter } from "next/router"

const ItemCard = ({ item }) => {
  const router = useRouter();
  return (
    <Box
      backgroundColor={colors.grey}
      borderRadius={10}
      boxShadow={`5px 5px ${colors.purple}`}
      alignContent="center"
      justifyContent={"center"}
      position="relative"
    >
      <Box
        height="250px"
        w={"80%"}
        margin="auto"
        borderWidth={"5px"}
        borderRadius="5px"
        // boxShadow={`2px 2px ${colors.blue}`}
        borderColor={colors.grey}
        marginBottom={3}
        marginTop={3}
      >
        <Image src={item.image} w="100%" height="100%" />
      </Box>
      {/* <Divider
        marginTop={2}
        width={"80%"}
        marginLeft="auto"
        marginRight={"auto"}
        borderWidth={1}
        // marginTop={5}
      /> */}
      <Box
        // borderColor={colors.grey}
        borderRadius={4}
        // borderWidth="2px"
        width={"80%"}
        margin="auto"
        backgroundColor={colors.blue}
        boxShadow="3px 3px #780EDC"
      >
        <Text
          fontWeight={"bold"}
          fontSize={"3xl"}
          color={colors.grey}
          // padding={5}
          textAlign="center"
        >
          {item.artist}
        </Text>
      </Box>
      <List spacing={3} paddingLeft={5} paddingTop={5} marginLeft={5}>
        {item?.perks?.map((perk) => {
          return (
            <ListItem fontWeight="bold" color={colors.blue}>
              <ListIcon as={CheckCircleIcon} color={colors.blue} />
              {perk.title}
            </ListItem>
          )
        })}
      </List>
      <Divider
        width={"80%"}
        marginLeft="auto"
        borderWidth={1}
        marginRight={"auto"}
        marginBottom={5}
        marginTop={5}
      />
      <Flex marginBottom={5} justifyContent="center" alignContent={"center"}>
        <Button onClick={() => router.push(`/artists/${item.id}`)} backgroundColor={colors.blue} boxShadow="3px 3px #780EDC">
          Read More
        </Button>
      </Flex>
    </Box>
  )
}

export default ItemCard
