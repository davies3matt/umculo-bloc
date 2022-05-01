import {
  Button,
  Center,
  Heading,
  Spinner,
  VStack,
  Box,
  Divider,
  ScrollView,
} from "native-base"
import React from "react"
import { useGetGroupQuery } from "../../generated/graphql"
import { NavigationProps } from "../Authentication/Login"
import { GroupRouteProps } from "./addItem"

interface Props extends NavigationProps, GroupRouteProps {}

const EditGroup = ({ navigation, route }: Props): JSX.Element => {
  const groupId = route.params.groupId
  const { data, loading } = useGetGroupQuery({
    variables: {
      id: groupId,
    },
    fetchPolicy: "network-only",
  })

  return (
    <ScrollView>
      <Center>
        {!loading ? (
          <VStack>
            <Center>
              <Heading>{data?.getGroup?.name}</Heading>
              {/***************************** ITEMS **************************************/}
              <Box padding={"20px"}>
                <Heading>Item List</Heading>
                <Divider my={2} />
                {data?.getGroup?.items?.items.map((item) => {
                  return (
                    <Box key={item?.id}>
                      <Heading fontSize="xs">
                        {item?.name} - {item?.category}
                      </Heading>
                    </Box>
                  )
                })}
              </Box>
              {/***************************** ADD ITEM **************************************/}
              <Box marginTop={"20px"} backgroundColor="pink.100" w={"200px"}>
                <Button
                  onPress={() =>
                    navigation.navigate("AddItem", { groupId: groupId })
                  }
                >
                  Add Item
                </Button>
              </Box>
              {/***************************** USERS **************************************/}
              <Heading marginTop={"50px"}>User List</Heading>
              <Divider my={2} />
              <Box>
                {data?.getGroup?.users?.items?.map((user) => {
                  return (
                    <Box marginTop={"10px"} key={user.id}>
                      <Center>
                        <Heading fontSize="xs">{user.user.email}</Heading>
                      </Center>
                    </Box>
                  )
                })}
              </Box>
              {/***************************** INVITE USER **************************************/}
              <Heading marginTop={"50px"}>Invite a User</Heading>
              <Button
                onPress={() =>
                  navigation.navigate("AddUser", { groupId: groupId })
                }
              >
                Add User
              </Button>
            </Center>
          </VStack>
        ) : (
          <Spinner />
        )}
      </Center>
    </ScrollView>
  )
}

export default EditGroup
