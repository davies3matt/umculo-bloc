import { Checkbox, HStack, Icon, IconButton, Text } from "native-base"
import React from "react"
import { Item, ItemStatus } from "../../generated/graphql"
import { Entypo } from "@expo/vector-icons"

interface Props {
  item: Item
  index: number
  onChange: (d: Item, i: number) => void
  updateIsArchived: (arg: Item) => void
}
const GroupItem = ({
  item,
  index,
  onChange,
  updateIsArchived,
}: Props): JSX.Element => {
  return (
    <HStack
      w="80%"
      justifyContent="space-between"
      alignItems="center"
      key={item.id}
    >
      <Checkbox
        isChecked={item.status === ItemStatus.Done}
        onChange={(val) => {
          return onChange(
            {
              ...item,
              status: val ? ItemStatus.Done : ItemStatus.Pending,
            },
            index
          )
        }}
        value={item.name}
        accessibilityLabel={
          item.status === ItemStatus.Done ? "complete" : "incomplete"
        }
      />
      <Text
        width="100%"
        flexShrink={1}
        textAlign="left"
        mx="2"
        strikeThrough={item.status === ItemStatus.Done}
        _light={{
          color: item.status === ItemStatus.Done ? "gray.400" : "coolGray.800",
        }}
        _dark={{
          color: item.status === ItemStatus.Done ? "gray.400" : "coolGray.50",
        }}
        // onPress={handleChange}
      >
        {item.name} | {item.area.toUpperCase()}
      </Text>
      <IconButton
        size="sm"
        colorScheme="trueGray"
        icon={
          <Icon
            as={Entypo}
            name={item.isArchived ? "plus" : "minus"}
            size="xs"
            color="trueGray.400"
          />
        }
        onPress={() => updateIsArchived(item)}
      />
    </HStack>
  )
}

export default GroupItem
