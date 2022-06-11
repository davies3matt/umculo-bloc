import Tiers from "../components/Tiers"
import React from "react"
import { Container } from "@chakra-ui/react"
import Navbar from "../components/Navbar"

const ArtistProfile = () => {
  return (
    <>
      <Navbar />
      <Container maxW={"5xl"} py={12}>
        <Tiers artistUser={""} />
      </Container>
    </>
  )
}

export default ArtistProfile
