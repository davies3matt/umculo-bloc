import { useFocusEffect } from "@react-navigation/native"
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
  const { data, loading, refetch } = useGetGroupQuery({
    variables: {
      id: groupId,
    },
    fetchPolicy: "network-only",
  })

  useFocusEffect(
    React.useCallback(() => {
      refetch()
    }, [refetch])
  )

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
              <Button
                onPress={() =>
                  navigation.navigate("AddItem", { groupId: groupId })
                }
              >
                Add Item
              </Button>
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
