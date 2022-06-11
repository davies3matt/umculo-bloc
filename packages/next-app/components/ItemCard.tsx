import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { colors } from "../src/theme"
import Lottie from "lottie-react-web"

const ItemCard = ({ item }) => {
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
          {item.name}
        </Text>
      </Box>
      {/* <List spacing={3} paddingLeft={5} paddingTop={5} marginLeft={5}>
        {item?.perks?.map((perk) => {
          return (
            <ListItem fontWeight="bold" color={colors.blue}>
              <ListIcon as={CheckCircleIcon} color={colors.blue} />
              {perk.title}
            </ListItem>
          )
        })}
      </List> */}
      <SimpleGrid columns={3}>
        <Box textAlign={"center"} position="relative">
          <Lottie
            options={{
              animationData: item.tier1
                ? require("../public/assets/animations/check.json")
                : require("../public/assets/animations/x.json"),
              loop: false,
            }}
            width={item.tier1 ? "100%" : "35%"}
          />
          <Text
            position={"absolute"}
            left={"25%"}
            color={colors.white}
            fontWeight="bold"
            bottom={"20px"}
          >
            Standard
          </Text>
        </Box>
        <Box textAlign={"center"} position="relative">
          <Lottie
            options={{
              animationData: item.tier2
                ? require("../public/assets/animations/check.json")
                : require("../public/assets/animations/x.json"),
              loop: false,
            }}
          />
          <Text
            position={"absolute"}
            left={"36%"}
            color={colors.white}
            fontWeight="bold"
            bottom={"20px"}
          >
            Gold
          </Text>
        </Box>
        <Box textAlign={"center"} position="relative">
          <Lottie
            options={{
              animationData: item.tier3
                ? require("../public/assets/animations/check.json")
                : require("../public/assets/animations/x.json"),
              loop: false,
            }}
            width="35%"
          />
          <Text
            position={"absolute"}
            left={"26%"}
            color={colors.white}
            fontWeight="bold"
            bottom={"20px"}
          >
            Platinum
          </Text>
        </Box>
      </SimpleGrid>
      <Divider
        width={"80%"}
        marginLeft="auto"
        borderWidth={1}
        marginRight={"auto"}
        marginBottom={5}
        marginTop={5}
      />
      <Flex marginBottom={5} justifyContent="center" alignContent={"center"}>
        <Button backgroundColor={colors.blue} boxShadow="3px 3px #780EDC">
          Read More
        </Button>
      </Flex>
    </Box>
  )
}

export default ItemCard
