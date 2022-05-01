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
  Flex,
  IconButton,
} from "native-base"
import React, { useState } from "react"
import GroupItem from "../../components/GroupItem"
import { Item, useGetGroupQuery } from "../../generated/graphql"
import { NavigationProps } from "../Authentication/Login"
import { GroupRouteProps } from "./addItem"
import { EvilIcons } from "@expo/vector-icons"

interface Props extends NavigationProps, GroupRouteProps {}

const ViewGroup = ({ navigation, route }: Props): JSX.Element => {
  const groupId = route.params.groupId
  const [updatedItemList, setUpdatedItemList] = useState<Item[]>([])
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

  const archive = (id: string) => {
    console.log("item " + id + "was archived")
  }
  return (
    <ScrollView>
      <Center>
        {!loading ? (
          <VStack>
            <Center>
              <Heading>{data?.getGroup?.name}</Heading>
              {/***************************** ITEMS **************************************/}
              <Box padding={"20px"}>
                <Flex
                  alignItems="center"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Heading>Item List</Heading>
                  <IconButton
                    variant="solid"
                    size="sm"
                    _icon={{
                      as: EvilIcons,
                      name: "refresh",
                    }}
                  />
                </Flex>
                <Divider my={2} />
                {data?.getGroup?.items?.items.map(
                  (item) =>
                    item && (
                      <GroupItem
                        item={item as Item}
                        archive={archive}
                        onChange={(updatedItem) => {
                          if (
                            Object.values(updatedItem) === Object.values(item)
                          ) {
                            // do nothing
                          } else {
                            let tempList = updatedItemList.filter(
                              (item) => item.id !== updatedItem.id
                            )
                            tempList.push(updatedItem)
                            setUpdatedItemList(tempList)
                            console.log("Temp List", tempList)
                          }
                        }}
                      />
                    )
                )}
                <Button
                  onPress={() =>
                    navigation.navigate("AddItem", { groupId: groupId })
                  }
                >
                  Add Item
                </Button>
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

export default ViewGroup
