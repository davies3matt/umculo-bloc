import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useGetUserQuery } from "../src/generated/graphql";

const Profile: React.FC = () => {
  const ISSERVER = typeof window === "undefined"; 
  let data = null;
  if(!ISSERVER) { 
   data = useGetUserQuery({
      variables: {
        id: localStorage ? localStorage.getItem('userId') : null
      }
    }).data

    React.useEffect(() => {
      console.log(data)
    }, [data])
  }
  return (
    <Center py={6}>
      <Box
        maxW={"1024px"}
        h={"600px"}
        w={"full"}
        mt="100px"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading
              fontSize={"4xl"}
              fontWeight={500}
              fontFamily={"body"}
              color={"white"}
            >
              {data?.getUser?.email}
            </Heading>
            <Text color={"white"} fontSize={"2xl"}>
              johndoe@umculobloc.co.za
            </Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text
                fontWeight={600}
                fontSize={"xl"}
                mt={8}
                px="50px"
                color={"white"}
              >
                The whole reason I started this blog is because I love music,
                but I realized the other day that I haven’t taken the time to
                share why I love music so much. I thought that since I have been
                blogging for over a year now it is probably about time that I
                shared some background behind why I love music. I was motivated
                to share my story when I heard about the DieHard “From The
                Start” competition. DieHard is sponsoring my story today, a
                story that I am really excited to share with you all!
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};
export default Profile;
