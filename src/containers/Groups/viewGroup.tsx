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
  useToast,
} from "native-base"
import React, { useState } from "react"
import GroupItem from "../../components/GroupItem"
import {
  Item,
  ItemStatus,
  useGetGroupQuery,
  useSyncItemsMutation,
} from "../../generated/graphql"
import { NavigationProps } from "../Authentication/Login"
import { GroupRouteProps } from "./addItem"
import ItemList from "../../components/ItemList"
import moment from "moment"
import SlideRightView from "../../components/SlideRightView"

interface Props extends NavigationProps, GroupRouteProps {}

const ViewGroup = ({ navigation, route }: Props): JSX.Element => {
  const groupId = route.params.groupId
  const Toast = useToast()
  const [itemList, setItemList] = useState([])
  const [archiveList, setArchiveList] = useState([])

  // get group query
  const { data, loading, refetch } = useGetGroupQuery({
    variables: {
      id: groupId,
    },
    fetchPolicy: "network-only",
  })

  // watch query and set states
  React.useEffect(() => {
    if (data?.getGroup?.items?.items) {
      setItemList(
        data.getGroup.items.items
          .filter((item) => !item.isArchived)
          .sort((a, b) => {
            if (moment(a.createdAt).isAfter(b.createdAt)) {
              return 1
            } else return -1
          })
          .sort((a, b) => {
            if (a.status === ItemStatus.Done && b.status !== ItemStatus.Done) {
              return 1
            } else return -1
          })
      )
      setArchiveList(
        data.getGroup.items.items.filter((item) => item.isArchived)
      )
    }
  }, [data])

  useFocusEffect(
    React.useCallback(() => {
      refetch()
    }, [refetch])
  )

  // item mutation
  const [postSyncItems, { loading: updatingItem }] = useSyncItemsMutation({
    onError: (err) => console.log("ERROR UPDATING ITEM", err),
    onCompleted: () => {
      Toast.show({ title: "Items Synced!" })
      refetch()
    },
  })

  // this function will move the item to the arhived list locally
  // at the moment only once the SYNC button is pressed do we update the list in the database
  const updateIsArchived = (targetItem) => {
    if (targetItem.isArchived) {
      setArchiveList(archiveList.filter((item) => item.id !== targetItem.id))
      setItemList((list) => [
        ...list,
        {
          ...targetItem,
          isArchived: false,
        },
      ])
    } else {
      setItemList(itemList.filter((item) => item.id !== targetItem.id))
      setArchiveList((list) => [
        ...list,
        {
          ...targetItem,
          isArchived: true,
        },
      ])
    }
  }

  // this function will change the item's status locally
  // at the moment only once the SYNC button is pressed do we update the list in the database
  const updateItemStatus = (targetItem, index) => {
    if (!targetItem.isArchived) {
      setItemList((list) =>
        list.map((item) =>
          item.id === targetItem.id
            ? {
                ...targetItem,
              }
            : { ...item }
        )
      )
    } else {
      setArchiveList((list) =>
        list.map((item) =>
          item.id === targetItem.id
            ? {
                ...targetItem,
              }
            : { ...item }
        )
      )
    }
  }

  // TODO - implement a delayed mutation that will automatically sync
  const syncItemList = async () => {
    // compare local list with original list from the query
    let items = []
    const archivedIds = archiveList.map((item) => item.id)
    const activeIds = itemList.map((item) => item.id)
    data.getGroup.items.items.map((item) => {
      if (activeIds.includes(item.id)) {
        // get latest state of item
        const updatedItem = itemList.find((itm) => itm.id === item.id)
        if (item.isArchived) {
          // item has been marked active locally
          items.push(updatedItem)
        } else if (item.status !== updatedItem.status) {
          // item status has been changed locally
          items.push(updatedItem)
        }
      } else if (archivedIds.includes(item.id)) {
        // get latest state of item
        const updatedItem = archiveList.find((itm) => itm.id === item.id)
        if (!item.isArchived) {
          // item has been archived locally
          items.push(updatedItem)
        } else if (item.status !== updatedItem.status) {
          // item status has changed locally
          items.push(updatedItem)
        }
      }
    })
    // use sync items mutation
    await postSyncItems({
      variables: {
        items: items.map((item) => {
          return {
            id: item.id,
            status: item.status,
            isArchived: item.isArchived,
            completedById: item.isCompletedBy,
          }
        }),
        groupId: groupId,
      },
    })
  }

  return (
    <SlideRightView>
      <ScrollView>
        <Center>
          {!loading ? (
            <VStack>
              <Center>
                <Heading>{data?.getGroup?.name}</Heading>
                {/***************************** ITEM LIST **************************************/}
                <ItemList
                  groupId={data?.getGroup?.id}
                  items={itemList}
                  syncItemList={syncItemList}
                  updateIsArchived={updateIsArchived}
                  updateItemstatus={updateItemStatus}
                  loading={updatingItem}
                  navigation={navigation}
                />
                {/***************************** ARCHIVED ITEM LIST **************************************/}
                <Box padding={"20px"}>
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Heading>Archived Item List</Heading>
                  </Flex>
                  <Divider my={2} />
                  {archiveList.map(
                    (item, index) =>
                      item && (
                        <GroupItem
                          item={item as Item}
                          key={item.id}
                          index={index}
                          updateIsArchived={updateIsArchived}
                          onChange={updateItemStatus}
                        />
                      )
                  )}
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
                {/***************************** Group Logs **************************************/}
                <Heading marginTop={"50px"}>View Group Logs</Heading>
                <Button
                  onPress={() =>
                    navigation.navigate("GroupLogs", { groupId: groupId })
                  }
                >
                  View Logs
                </Button>
              </Center>
            </VStack>
          ) : (
            <Spinner />
          )}
        </Center>
      </ScrollView>
    </SlideRightView>
  )
}

export default ViewGroup
