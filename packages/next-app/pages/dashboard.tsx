import { Flex, SimpleGrid } from "@chakra-ui/react"
import React from "react"
import ItemCard from "../components/ItemCard"
import Navbar from "../components/Navbar"

const data = [
  {
    id: "1",
    tier: 1,
    image: "https://i.ytimg.com/vi/zQ0Avc7UPPM/hqdefault.jpg",
    artist: "Yndian Mynah",
    perks: [
      {
        title: "Pre-Release Tracks",
      },
      {
        title: "Album Artwork",
      },
    ],
  },
  {
    id: "2",
    tier: 3,
    image:
      "https://media.pitchfork.com/photos/5c92bae8f3672356b4df6e72/4:3/w_524,h_393,c_limit/Oh%20Sees-GettyImages-688811658.jpg",
    artist: "The Oh Sees",
    perks: [
      {
        title: "Exclusive Tracks",
      },
      {
        title: "Access To All Live Shows",
      },
      {
        title: "Album Artwork",
      },
      {
        title: "Personal Thank You Letter",
      },
    ],
  },
  {
    id: "3",
    tier: 2,
    image:
      "https://pbs.twimg.com/profile_images/735042085787734016/kpuHHHQE_400x400.jpg",
    artist: "Black Math",
    perks: [
      {
        title: "Pre-Release Tracks",
      },
      {
        title: "Access To All Live Shows",
      },
      {
        title: "Album Artwork",
      },
    ],
  },
  {
    id: "4",
    tier: 1,
    image:
      "https://pbs.twimg.com/profile_images/668710837528301568/eplgBIKH_400x400.jpg",
    artist: "AL Bairre",
    perks: [
      {
        title: "Exclusive Tracks",
      },
      {
        title: "Access To All Live Shows",
      },
      {
        title: "Album Artwork",
      },
      {
        title: "Personal Thank You Letter",
      },
    ],
  },
  {
    id: "5",
    tier: 1,
    image:
      "https://i.discogs.com/YkxUfEHglUUzqG26QL3c7DX5_Lb5_UcYR7UdVcDr3m0/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTM5NjQw/NDAtMTQ1NDc3MDg4/NS00MDY0LmpwZWc.jpeg",
    artist: "Christian Tiger School",
    perks: [
      {
        title: "Personal Thank You Letter",
      },
      {
        title: "Album Artwork",
      },
      {
        title: "Exclusive Tracks",
      },
    ],
  },
]

const Dashboard = () => {
  return (
    <>
      <Navbar/>
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
          {data.map((item) => (
            <ItemCard item={item}/>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  )
}

export default Dashboard
