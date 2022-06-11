import { useWeb3React } from "@web3-react/core"
import Head from "next/head"
import Link from "next/link"
import Account from "../components/Account"
import ETHBalance from "../components/ETHBalance"
import TokenBalance from "../components/TokenBalance"
import useEagerConnect from "../hooks/useEagerConnect"

import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons"
import {
  Code,
  Link as ChakraLink,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react"

import { Container } from "../components/Container"
import { CTA } from "../components/CTA"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import Footer from "../components/Landing/Footer"
import Hero from "../components/Landing/Hero"
import Feature from "../components/Landing/Feature"
import { Main } from "../components/Main"
import Navbar from "../components/Navbar"
import ArtistProfile from "./artistProfile"

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"

function Home() {
  const { account, library } = useWeb3React()

  const triedToEagerConnect = useEagerConnect()

  const isConnected = typeof account === "string" && !!library

  return (
    <div>
      <Head>
        <title>next-web3-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Navbar />
      </header>

      {/* <main>

        {isConnected && (
          <section>
            <ETHBalance />

            <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" />
          </section>
        )}
      </main> */}

      <Container
        height="100vh"
        background={"linear-gradient(261.63deg, #0B0B0D 4.87%, #FB03F5 87.02%)"}
      >
        <Hero />
        <Main>
          <Feature />
          <ArtistProfile />
        </Main>
        <Footer />
      </Container>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default Home
