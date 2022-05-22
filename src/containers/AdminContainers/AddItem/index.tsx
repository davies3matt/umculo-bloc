import { Center, ScrollView } from "native-base"
import React, { useState } from "react"
import AdminItemBox from "../../../components/AdminItemBox"
import {
  Area,
  Category,
  useCreateStoreItemMutation,
} from "../../../generated/graphql"
import { NavigationProps } from "../../Authentication/Login"
import uuid from "react-native-uuid"

interface AddItemProps extends NavigationProps {}

interface ItemDetails {
  name: string
  categories: Category[]
  areas: Area[]
}

const AdminAddItem = ({ navigation }: AddItemProps): JSX.Element => {
  const [item, setItem] = useState<ItemDetails>({
    name: "",
    categories: [],
    areas: [],
  })
  React.useEffect(() => {
    console.log("Item", item)
  }, [item])
  const [addItem, { loading }] = useCreateStoreItemMutation()
  const createItem = (itm: ItemDetails) => {
    addItem({
      variables: {
        input: {
          id: uuid.v4().toString(),
          ...itm,
        },
      },
    })
  }
  return (
    <ScrollView>
      <Center marginTop={"20px"}>
        <AdminItemBox
          item={item}
          setItem={setItem}
          createItem={createItem}
          loading={loading}
        />
      </Center>
    </ScrollView>
  )
}

export default AdminAddItem
