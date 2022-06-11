import { Flex, SimpleGrid } from "@chakra-ui/react"
import React, { Fragment, useState } from "react"
import ItemCard from "../components/ItemCard"
import Navbar from "../components/Navbar"
import { useListArtistsQuery } from "../src/generated/graphql"

const MarketPlace = () => {
  const [artistList, setArtistList] = useState([])
  const { data } = useListArtistsQuery({
    fetchPolicy: "network-only",
    onCompleted: (list) => setArtistList(list.listArtists.items),
    onError: (err) => console.log("ERROR 🙈 ", err),
  })

  React.useEffect(() => {
    console.log(artistList)
  }, [artistList])
  return (
    <>
      <Navbar />
      <Flex
        background={
          "linear-gradient(261.63deg,  #0B0B0D 4.87%, #FB03F5 87.02%)"
        }
        maxW="100vw"
        justifyContent={"center"}
        alignContent="center"
        alignItems={"center"}
      >
        <SimpleGrid columns={3} spacing={10} marginTop={20} marginBottom={20}>
          {artistList.map((item) => (
            <ItemCard item={item} />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  )
}

export default MarketPlace
