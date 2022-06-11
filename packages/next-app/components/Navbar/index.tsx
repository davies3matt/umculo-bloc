import { ReactNode } from "react"
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { colors } from "../../src/theme"
import { useRouter } from "next/router"
import React from "react"
import { useAuthContext } from "../../src/context/AuthProvider"

const NavLink = (props) => {
  const router = useRouter()
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      onClick={(e) => router.push(props.url)}
    >
      {props.name}
    </Link>
  )
}

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const { user } = useAuthContext()

  React.useEffect(() => {
    let profileLink = "profile"
    if (user?.username) {
      profileLink = "artistProfile"
    }
    const Links = [
      {
        name: "Marketplace",
        url: "/marketplace",
      },
      {
        name: "Profile",
        url: `/${profileLink}/`,
      },
    ]
    setLinks(Links)
  }, [user])

  const [links, setLinks] = React.useState([])

  return (
    <>
      <Box bg={colors.grey} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box
              color={colors.white}
              onClick={() => router.push("/")}
              cursor="pointer"
            >
              UmculoBloc
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              color={colors.white}
            >
              {links.map((link) => (
                <NavLink key={link.name} name={link.name} url={link.url}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {links.map((link) => (
                <NavLink name={link.name} url={link.url}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
