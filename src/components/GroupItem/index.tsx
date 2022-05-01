import { Checkbox, HStack, Icon, IconButton, Text } from "native-base"
import React, { useEffect } from "react"
import { Item, ItemStatus } from "../../generated/graphql"
import { Entypo } from "@expo/vector-icons"

interface Props {
  item: Item
  onChange: (d: Item) => void
  archive: (arg: string) => void
}
const GroupItem = ({ item, onChange, archive }: Props): JSX.Element => {
  const [complete, setComplete] = React.useState(
    item.status === ItemStatus.Done
  )
  const handleChange = () => {
    setComplete(!complete)
  }
  useEffect(() => {
    if (
      (item.status === ItemStatus.Done && !complete) ||
      (item.status === ItemStatus.Pending && complete)
    ) {
      onChange({
        ...item,
        status: complete ? ItemStatus.Done : ItemStatus.Pending,
      })
    }
  }, [complete])
  return (
    <HStack
      w="80%"
      justifyContent="space-between"
      alignItems="center"
      key={item.id}
    >
      <Checkbox
        isChecked={complete}
        onChange={handleChange}
        value={item.name}
        accessibilityLabel={complete ? "complete" : "incomplete"}
      />
      <Text
        width="100%"
        flexShrink={1}
        textAlign="left"
        mx="2"
        strikeThrough={complete}
        _light={{
          color: complete ? "gray.400" : "coolGray.800",
        }}
        _dark={{
          color: complete ? "gray.400" : "coolGray.50",
        }}
        onPress={handleChange}
      >
        {item.name} | {item.category.toUpperCase()}
      </Text>
      <IconButton
        size="sm"
        colorScheme="trueGray"
        icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />}
        onPress={() => archive(item.id)}
      />
    </HStack>
  )
}

export default GroupItem
