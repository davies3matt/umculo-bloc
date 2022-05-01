import React, { useState } from "react"
import { Box, FormControl, Input, Select, Button, Center } from "native-base"
import {
  Category,
  useCreateItemMutation,
  useGetGroupQuery,
} from "../../generated/graphql"
import { NavigationProps } from "../Authentication/Login"

export interface GroupRouteProps {
  route: {
    params: {
      groupId: string
    }
  }
}

interface Props extends NavigationProps, GroupRouteProps {}

interface ItemDetails {
  name?: string
  category?: Category
  assignedTo?: String // <<---- userID
}
const AddItem = ({ navigation, route }: Props): JSX.Element => {
  const groupId = route.params.groupId
  // get group query
  const { data } = useGetGroupQuery({
    fetchPolicy: "network-only",
    variables: {
      id: groupId,
    },
    onError: (err) => console.log(err),
  })

  // mutation
  const [postItem, { loading: loadingCreateItem }] = useCreateItemMutation({
    onCompleted: () => navigation.navigate("EditGroup", { groupId: groupId }),
    onError: (err) => console.log(err),
  })
  // create item function
  const createItem = async (item: ItemDetails) => {
    console.log(item)
    // await postItem({
    //     variables: {
    //         input: {
    //             id: uuid.v4().toString(),
    //             itemGroupId: props.route.params.groupId,
    //             name: item.name,
    //             category: item.category,
    //         }
    //     }
    // })
  }

  const [item, setItem] = useState<ItemDetails>({})
  return (
    <Center>
      <Box marginTop={"20px"} backgroundColor="pink.100" w={"200px"}>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            placeholder="Milk"
            onChangeText={(val) => setItem({ ...item, name: val })}
            value={item?.name as string}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Category</FormControl.Label>
          <Select
            onValueChange={(val) =>
              setItem({ ...item, category: val as Category })
            }
            placeholder="Select Category"
          >
            {Object.values(Category).map((cat) => {
              return <Select.Item key={cat} value={cat} label={cat} />
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label>Assigned To</FormControl.Label>
          <Select
            onValueChange={(val) => setItem({ ...item, assignedTo: val })}
            placeholder="Select User"
          >
            {data?.getGroup?.users?.items?.map((user) => {
              return (
                <Select.Item
                  key={user.id}
                  value={user.id}
                  label={user.user.email}
                />
              )
            })}
          </Select>
        </FormControl>
        <Button isLoading={loadingCreateItem} onPress={() => createItem(item)}>
          Add Item
        </Button>
      </Box>
    </Center>
  )
}

export default AddItem
