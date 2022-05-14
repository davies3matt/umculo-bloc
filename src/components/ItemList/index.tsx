import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Icon,
  IconButton,
  Row,
  Spinner,
} from "native-base"
import React, { useState } from "react"
import { Item } from "../../generated/graphql"
import GroupItem from "../GroupItem"
import { EvilIcons, FontAwesome } from "@expo/vector-icons"
import { NavigationProps } from "../../containers/Authentication/Login"

interface ItemListProps extends NavigationProps {
  groupId: string
  items: Item[]
  loading: Boolean
  syncItemList: () => void
  updateIsArchived: (t: any) => void
  updateItemstatus: (t: any, i: number) => void
}

const ItemList: React.FC<ItemListProps> = ({
  groupId,
  items,
  loading,
  syncItemList,
  updateIsArchived,
  updateItemstatus,
  navigation,
}) => {
  const [showItemList, setShowItemList] = useState(false)
  return (
    <Box padding={"20px"}>
      <Center>
        <Heading>Items</Heading>
        <Row space={5} marginTop={"10px"}>
          <Button
            leftIcon={
              <Icon
                as={FontAwesome}
                name={showItemList ? "angle-double-up" : "angle-double-down"}
                size="sm"
              />
            }
            onPress={() => setShowItemList((val) => !val)}
          >
            {`Show ${showItemList ? "less" : "More"}`}
          </Button>
          {!loading ? (
            <IconButton
              variant="solid"
              size="sm"
              _icon={{
                as: EvilIcons,
                name: "refresh",
              }}
              onPress={syncItemList}
            />
          ) : (
            <Spinner />
          )}
          <IconButton
            variant="solid"
            size="sm"
            _icon={{
              as: EvilIcons,
              name: "plus",
            }}
            onPress={() => navigation.navigate("AddItem", { groupId: groupId })}
          />
        </Row>
        <Divider my={2} />
      </Center>
      <Divider my={2} />
      {items.map(
        (item, index) =>
          item &&
          index < 4 && (
            <GroupItem
              item={item as Item}
              index={index}
              key={item.id}
              updateIsArchived={updateIsArchived}
              onChange={updateItemstatus}
            />
          )
      )}
      {showItemList ? (
        items.map(
          (item, index) =>
            item &&
            index > 4 && (
              <GroupItem
                item={item as Item}
                index={index}
                key={item.id}
                updateIsArchived={updateIsArchived}
                onChange={updateItemstatus}
              />
            )
        )
      ) : (
        <></>
      )}
    </Box>
  )
}

export default ItemList
