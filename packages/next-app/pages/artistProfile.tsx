import ThreeTierPricing from "../components/Tiers"
import React from "react";
import {
    Container
  } from '@chakra-ui/react';

const ArtistProfile = () => {
  return (
    <Container maxW={'5xl'} py={12}>
    <ThreeTierPricing />
    </Container>
  )
}

export default ArtistProfile

