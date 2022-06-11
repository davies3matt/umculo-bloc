import { useWeb3React } from "@web3-react/core";
import Head from "next/head";

import { Container } from "../components/Container";
import Footer from "../components/Landing/Footer";
import Hero from "../components/Landing/Hero";
import Feature  from "../components/Landing/Feature"
import { Main } from "../components/Main";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Head>
        <title>next-web3-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Navbar/>
      </header>

      <Container height="100vh"  background={'linear-gradient(261.63deg, #0B0B0D 4.87%, #FB03F5 87.02%)'}>
        <Hero />
        <Main>
          <Feature/>
        </Main>
        <Footer/>
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
  );
}

export default Home;
