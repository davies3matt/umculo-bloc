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
import { Footer } from "../components/Footer"
import { Hero } from "../components/Hero"
import { Main } from "../components/Main"
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
        <nav>
          <Link href="/">
            <a>next-web3-boilerplate</a>
          </Link>
          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>
      <main>
        <h1>
          Welcome to{" "}
          <a href="https://github.com/mirshko/next-web3-boilerplate">
            next-web3-boilerplate
          </a>
        </h1>
        {isConnected && (
          <section>
            <ETHBalance />
            <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" />
          </section>
        )}
      </main>
      <Container height="100vh">
        <Hero />
        <Main>
          <Text color="text">
            Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code>{" "}
            + <Code>TypeScript</Code>.
          </Text>
          <List spacing={3} my={0} color="text">
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <ChakraLink
                isExternal
                href="https://chakra-ui.com"
                flexGrow={1}
                mr={2}
              >
                Chakra UI <LinkIcon />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <ChakraLink
                isExternal
                href="https://nextjs.org"
                flexGrow={1}
                mr={2}
              >
                Next.js <LinkIcon />
              </ChakraLink>
            </ListItem>
          </List>
        </Main>
        <DarkModeSwitch />
        <Footer>
          <Text>Next :heart: Chakra</Text>
        </Footer>
        <CTA />
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
